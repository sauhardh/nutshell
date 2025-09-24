import { Request, Response } from "express";
import simpleGit from "simple-git";

import path from "path";
import { _deleteBucket, generateRandom, listAllFilesFromPath, _uploadObject, _listAllObjects, _deleteObjects } from "./utils";

/**
 * To download Github repo and upload it to `cloudflare` 
 * 
 * Note: Pass Github repo url on request body as `repoUrl`
 */
export async function downloadAndUploadRepo(req: Request, res: Response): Promise<void> {
    const _id: string = generateRandom();
    const localRepoPath: string = path.join(__dirname, `repos/${_id}`);

    try {
        const repoUrl: string = req.body.repoUrl;
        await simpleGit().clone(repoUrl, localRepoPath);
        let allFiles: string[] = listAllFilesFromPath(localRepoPath);

        for (let file of allFiles) {
            await _uploadObject(file);
        }
        res.status(200).json({ type: "success", message: "url received." });
    } catch (error) {
        console.warn("Failed while downloading repo -> finding local path to download repo -> uploading files to the s3 cloud\n\n", error);
        res.status(404).json({ type: "failed", message: "Could not clone the github url link." });
    }
}


/**
 * To delete bucket itself from `cloudflare`
 * 
 * Note: Pass Bucket's Name on request body as `bucketName`  
 */
export async function deleteBucket(req: Request, res: Response) {
    try {
        const bucketName: string = req.body?.bucketName;
        if (!bucketName) {
            console.warn("Failed to get bucketName from request body");
            res.status(400).json({ type: "failed", message: "Failed to get bucketName from request body" });
        }

        const listOfObjects = await _listAllObjects(bucketName);

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
