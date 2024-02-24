import expressAsyncHandler from "express-async-handler"
import { User } from "../models/user.js"
import { Job } from "../models/jobModel.js"

export const getAllJobs = expressAsyncHandler(async (req, res) => {
    const jobs = await Job.find({ expired: false });

    res.status(200).json({
        success: true,
        jobs,
    })
});

export const getSingleJob = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            // error handling
            res.status(500);
            throw new Error("OOPS! Job not found.");
        }
        res.status(200).json({
            success: true,
            job,
        });
    } catch {
        res.status(500);
        throw new Error("OOPS! Job not found.");
    }
});

export const postJob = expressAsyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        res.status(500);
        throw new Error("Your are not elligible");
    }
    const {
        title,
        description,
        category,
        country,
        city,
        location,
        salary,
    } = req.body;

    if (!title || !description || !category || !country || !city || !location || !salary) {
        res.status(500);
        throw new Error("Enter your details carefully");
    }

    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        salary,
        postedBy,
    });
    res.status(200).json({
        success: true,
        message: "Job Posted Successfully!",
        job,
    });

});

export const getMyJobs = expressAsyncHandler(async (req, res) => {
    const { role } = req.user;
    console.log(role);
    if (role === "job seeker") {
        res.status(500);
        throw new Error("Job Seeker not allowed to access this resource.");
    }
    const myJobs = await Job.find({ postedBy: req.user._id });

    res.status(200).json({
        success: true,
        myJobs,
    })
});

export const updateJob = expressAsyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        // error handling
        res.status(500);
        throw new Error("Job Seeker not allowed to access this resource.");
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        // error handling
        res.status(500);
        throw new Error("OOPS! Job not found.");
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Job Updated!",
    });
});

export const deleteJob = expressAsyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        // error handling
        res.status(500);
        throw new Error("Job Seeker not allowed to access this resource.");
    }
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        // error handling
        res.status(500);
        throw new Error("OOPS! Job not found.");
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job Deleted!",
    });
});