import express from "express";
import { getAllJobs, getSingleJob, postJob, getMyJobs, updateJob, deleteJob } from "../controllers/jobController.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();


router.get("/getall", isAuthenticated, getAllJobs);
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.get("/:id", isAuthenticated, getSingleJob);
router.post("/post", isAuthenticated, postJob);
router.put("/update/:id", isAuthenticated, updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);
export default router;