import { Request, Response } from "express";
import simpleGit from "simple-git";

import path from "path";
import { _deleteBucket, generateRandom, listAllFilesFromPath, _uploadObject, _listObjects, _deleteObjects, _bucketExists, _createBucket } from "./utils";
import { redisClient } from "../redis";

/**
 * **`POST /deploy`**
 * 
 * To download Github repo and upload it to `cloudflare` 
 * 
 * Note: Pass Github repo url on *request body* as `repoUrl`
 */
export async function downloadAndUploadRepo(req: Request, res: Response): Promise<void> {
    const _id: string = generateRandom();
    const localRepoPath: string = path.join(__dirname, `repos/${_id}`);

    try {
        const repoUrl: string = req.body.repoUrl;
        /// UPDATE LOGGING
        await redisClient.lPush("jobQueue", _id);
        await redisClient.hSet("status", _id, "uploading");

        await simpleGit().clone(repoUrl, localRepoPath);
        let allFiles: string[] = listAllFilesFromPath(localRepoPath);

        /// IF BUCKET DOES NOT EXIST, IT CREATES A NEW ONE. BUCKET NAME IS DEFAULT HERE i.e. nutshell
        if (!await _bucketExists()) await _createBucket();

        for (let file of allFiles) {
            await _uploadObject(file);
        }
        /// UPDATE LOGGING
        await redisClient.hSet("status", _id, "download completed");
        res.status(200).json({ type: "success", message: "url received." });
    } catch (error) {
        console.warn("Failed while downloading repo -> finding local path to download repo -> uploading files to the s3 cloud\n\n", error);
        /// UPDATE LOGGING
        await redisClient.hSet("status", _id, "Failed to download");
        res.status(404).json({ type: "failed", message: "Could not clone the github url link." });
    }
}


/**
 * **`POST /deleteBucket`**
 * 
 * To delete bucket itself from `cloudflare`
 * 
 * Note: Pass Bucket's Name on *request body* as `bucketName`  
 */
export async function deleteBucket(req: Request, res: Response) {
    try {
        const bucketName: string = req.body?.bucketName;
        if (!bucketName) {
            console.warn("Failed to get bucketName from request body");
            res.status(400).json({ type: "failed", message: "Failed to get bucketName from request body" });
        }

        const listOfObjects = await _listObjects(bucketName);

        const response = await _deleteObjects(bucketName, listOfObjects);
        if (!response || response.Errors) {
            console.warn("Failed to delete Objects from bucket of your request", bucketName, response?.Errors);
            res.status(500).json({ type: "failed", message: `Failed to delete Objects from bucket of your request. So cannot move further to delete Bucket. Bucket Name: ${bucketName}. Undeleted Objects: ${response?.Errors}` });
        }

        await _deleteBucket(bucketName);
        res.status(200).json({ type: "success", message: `successfully delete bucket of your request ${bucketName}` });
    } catch (error) {
        console.warn("Error on performing action on deleteBucket", error);
        res.status(500).json({ type: "failed", message: `Error occured on trying to delete bucket of your request. Error: ${error}` });
    }
}


/**
 * **`POST /deleteObjects`**
 * 
 * To delete Objects from the bucket of `cloudflare`
 * 
 * Note: Pass Bucket's Name on *request body* as `bucketName`  
 * Note: Pass Prefix on *request body* as `prefix`  
 */
export async function deleteObjects(req: Request, res: Response) {
    try {
        const bucketName: string = req.body?.bucketName;
        const prefix: string = req.body?.prefix;
        if (!bucketName || !prefix) {
            console.warn("Failed to get bucketName or prefix from request body");
            res.status(400).json({ type: "failed", message: "Failed to get bucketName or prefix from request body" });
        }

        const listOfObjects = await _listObjects(bucketName, prefix);

        const response = await _deleteObjects(bucketName, listOfObjects);
        if (!response || response.Errors) {
            console.warn("Failed to delete Objects from bucket of your request", "Bucket_Name: ", bucketName, `Prefix: ${prefix ? prefix : "*"}`, response?.Errors);
            res.status(500).json({ type: "failed", message: `Failed to delete Objects from bucket of your request. Bucket_Name: ${bucketName}, Prefix: ${prefix ? prefix : "*"}. Undeleted Objects: ${response?.Errors}` });
        }

        res.status(200).json({ type: "success", message: `successfully deleted Objects of your request from ${bucketName}. Prefix: ${prefix}` });
    } catch (error) {
        console.warn("Error on performing action on deleteBucket", error);
        res.status(500).json({ type: "failed", message: `Error occured on trying to delete Objects from bucket of your request. Error: ${error}` });
    }
}

/** 
 * **`GET /status/:_id`**
 * 
 * To get status about the job/process that is happening
 * 
 * id of job must be passed as *query* `_id` 
 */
export async function JobStatus(req: Request, res: Response) {
    try {
        const _id = req.query._id;
        const status = await redisClient.hGet("status", _id as string);

        res.status(200).json({ type: "success", message: status });
    } catch (error) {
        console.warn("Could not get status info from redis", error);
        res.status(400).json({ type: "Failed", message: "Could not get status info from redis" });
    }
}