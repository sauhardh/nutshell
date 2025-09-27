import express from "express";
const router = express.Router();

import { downloadAndUploadRepo, deleteBucket, JobStatus, deleteObjects } from "../controller";

// User will send the repo's url as input.
// And this function will download the repo, and upload it the s3 cloud
router.post("/deploy", downloadAndUploadRepo)

// To delete the specific bucket
router.post("/deleteBucket", deleteBucket)

// To get status of job
router.get("/status/:_id", JobStatus);

// To delete Objects from specific prefix
router.post("/deleteObjects", deleteObjects);

export { router };