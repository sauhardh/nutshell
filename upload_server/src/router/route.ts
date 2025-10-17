import express from "express";
const router = express.Router();

import { downloadAndUploadRepo, deleteBucket, deleteObjects } from "../controller";

// User will send the repo's url as input.
// And this function will download the repo, and upload it the s3 cloud
router.post("/deploy", downloadAndUploadRepo)

// To delete the specific bucket
router.post("/deleteBucket", deleteBucket)

// To delete Objects from specific prefix
router.post("/deleteObjects", deleteObjects);

export { router };