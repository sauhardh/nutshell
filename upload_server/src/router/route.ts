import express from "express";
const router = express.Router();

import { downloadAndUploadRepo, deleteBucket } from "../controller";

// User will send the repo url as input.
// And this function will download the repo, and upload it the s3 cloud
router.post("/deploy", downloadAndUploadRepo)

// To delete the specific bucket
router.post("/deleteBucket", deleteBucket)

export { router };