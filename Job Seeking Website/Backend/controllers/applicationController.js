import expressAsyncHandler from "express-async-handler";
import cloudinary from "cloudinary";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobModel.js";

export const postApplication = expressAsyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role === "for hiring") {
        // error handling
        res.status(500);
        throw new Error("Employer not allowed to access this resource.");
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(500);
        throw new Error("Resume File Required!");
    }
    const { resume } = req.files;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
        res.status(500);
        throw new Error("Invalid file type. Please upload a PNG file.");
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        res.status(500);
        throw new Error("Failed to upload Resume to Cloudinary");
    }
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID = {
        user: req.user._id,
        role: "job seeker",
    };
    if (!jobId) {
        res.status(500);
        throw new Error("Job not found!");
    }
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        res.status(500);
        throw new Error("Job not found!");
    }

    const employerID = {
        user: jobDetails.postedBy,
        role: "for hiring",
    };
    console.log(employerID);
    if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
    ) {
        res.status(500);
        throw new Error("Please fill all fields.");
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
    });
});

export const employerGetAllApplications = expressAsyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role === "job seeker") {
        res.status(500);
        throw new Error("Job Seeker not allowed to access this resource.");
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
        success: true,
        applications,
    });
});
export const jobseekerGetAllApplications = expressAsyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role === "for hiring") {
        res.status(500);
        throw new Error("Employer not allowed to access this resource.");
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
        success: true,
        applications,
    });
});

export const jobseekerDeleteApplication = expressAsyncHandler(
    async (req, res, next) => {
        const { role } = req.user;
        if (role === "Employer") {
            res.status(500);
            throw new Error("Employer not allowed to access this resource.");
        }
        const { id } = req.params;
        const application = await Application.findById(id);
        if (!application) {
            res.status(500);
            throw new Error("Application not found!");
        }
        await application.deleteOne();
        res.status(200).json({
            success: true,
            message: "Application Deleted!",
        });
    }
);