import {
    S3Client, PutObjectCommand, DeleteBucketCommand,
    DeleteObjectsCommand, ListObjectsCommandOutput, DeleteObjectsCommandOutput, DeleteBucketCommandOutput,
    HeadBucketCommand,
    CreateBucketCommand,
    ListObjectsV2Command,
    ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";
import { BUCKET_NAME } from "../constansts";

import fs from "fs";
import path from "path";
import crypto from "crypto";

// INITIALIZATION OF S3 CLIENT.
export const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUD_STORAGE_ENDPOINT!,
    credentials: {
        accessKeyId: process.env.CLOUD_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUD_SECRET_ACCESS_KEY!,
    },
});

/**
 * Generates random string using `crypto`
 * @returns - string of length `6`
 */
export function generateRandom(): string {
    const length = 6;

    return crypto.randomBytes(length)
        .toString("base64")
        .replace(/[^a-zA-Z0-9]/g, "")
        .substring(0, length);
};

/**
 * lists all the files (recursively) from the given absolute path. 
 * 
 * @param absPath - The absolute path of a directory to search.
 * @returns Array of absolute file path as string.
 */
export function listAllFilesFromPath(absPath: string = path.join(__dirname, "repos/jd106o100c106j100d48o100")): string[] {
    let allFiles = fs.readdirSync(absPath, { recursive: true });

    let dirs: string[] = [];
    allFiles.forEach(file => {
        const filePath = path.join(absPath, file.toString());
        if (!fs.statSync(filePath).isDirectory()) {
            dirs.push(filePath);
        }
    });

    return dirs;
};

/**
 * Uploads every single file to the `s3` bucket on the cloud.
 * 
 * @param absfilePath - A absolute file path within a directory.
 * This parameter expects a absolute path to a file on the directory that was downloaded from the `github`
 */
export async function _uploadObject(absfilePath: string): Promise<void> {
    let relFilePath = path.normalize(path.relative(__dirname, absfilePath));

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Body: fs.readFileSync(absfilePath),
        Key: relFilePath
    });

    await s3.send(command);
};

/**
 * List all objects from bucket
 * @param bucketName - Name of the bucket
 * @returns type `ListObjectV2CommandOutput`
 */
export async function _listObjects(bucketName: string, prefix?: string): Promise<ListObjectsV2CommandOutput> {
    const command = new ListObjectsV2Command({
        Bucket: bucketName,
        ...(prefix && { Prefix: prefix })
    });

    return await s3.send(command);
};

/**
 * List all objects from bucket
 * @param bucketName - Name of the bucket
 * @param listOfObjects - type `ListObjectsCommandOutput`, response from `ListObjectsCommand`
 * @returns type `DeleteObjectsCommandOutput` or `null` as parameter `listOfObjects` can have no objects.
 */
export async function _deleteObjects(bucketName: string, listOfObjects: ListObjectsCommandOutput): Promise<DeleteObjectsCommandOutput | null> {
    if (!listOfObjects.Contents || listOfObjects.Contents?.length === 0) {
        console.warn("'No Contents Found'. There was no objects on the bucket")
        return null
    }

    const input = {
        Bucket: bucketName,
        Delete: {
            Objects: listOfObjects.Contents.map(obj => ({ Key: obj.Key! })),
            Quiet: false,
        }
    };
    const command = new DeleteObjectsCommand(input);
    return await s3.send(command);
};

/**
 * Delete Objects from bucket.
 * @param bucketName - Name of the bucket
 */
export async function _deleteBucket(bucketName: string): Promise<DeleteBucketCommandOutput> {
    const command = new DeleteBucketCommand({
        Bucket: bucketName,
    });

    return await s3.send(command);
};

/**
 * Checks if bucket exist
 * @param bucketName - Name of the bucket
 */
export async function _bucketExists(bucketName: string = BUCKET_NAME): Promise<boolean> {
    try {
        const command = new HeadBucketCommand({ Bucket: bucketName });
        await s3.send(command);
        return true;
    } catch (error: any) {
        console.log("Error occured while checking if bucket exist.", error);
        if (error?.$metadata?.httpStatusCode === 404) {
            return false;
        }
        throw error;
    }
};

/**
 * Creates a bucket
 * @param bucketName - Name of the bucket
 */
export async function _createBucket(bucketName: string = BUCKET_NAME): Promise<boolean> {
    const input = { Bucket: bucketName };

    try {
        const command = new CreateBucketCommand(input);
        await s3.send(command);
        return true;
    } catch (error) {
        console.warn("Error occured while creating bucket. Bucket Name:", bucketName, error);
        return false;
    }
};