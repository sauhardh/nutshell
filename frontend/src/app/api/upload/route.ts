import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function dbPostUpload(projectName: string, username: string, branch: string, userId: any): Promise<string> {
    let _postData: any = {
        projectName,
        projectUrl: "",
        githubUserName: username,
        githubRepoName: projectName,
        latestCommit: "",
        latestCommitTime: "",
        githubBranch: branch,
        status: "queued",
        domainId: "",
    };

    const post = await prisma.user.upsert({
        where: { id: userId },
        update: {
            posts: {
                create: [_postData]
            }
        },
        create: {
            id: userId,
            posts: {
                create: [_postData]
            }
        },
        include: { posts: true }
    });

    return post.posts[0].id
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ type: "failed", message: "Unauthorized access" }, { status: 401 });
        }
        const { username, id: userId } = session.user;
        const { repoUrl, bucketName, projectName, branch } = await req.json();

        const postId: string = await dbPostUpload(projectName, username, branch, userId);

        const response = await fetch(`${process.env.UPLOAD_SERVER_API}`, {
            method: "POST",
            body: JSON.stringify({
                repoUrl,
                bucketName,
                userId,
                postId
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return NextResponse.json(response, { status: response.status });
        }
        const res = await response.json();
        return NextResponse.json(res);
    } catch (error) {
        console.error("Error ocurred on server upload api", error);
        return NextResponse.json({ type: "failed", message: (error as Error).message }, { status: 500 })
    }
}