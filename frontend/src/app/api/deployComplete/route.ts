import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId, postId, domainId } = await req.json();

        if (!userId || !postId || !domainId) {
            return NextResponse.json({ type: "failed", message: "Missing fields" }, { status: 400 })
        }

        await prisma.post.updateMany({
            where: { id: postId, userId: userId },
            data: {
                status: "deployed",
                domainId,
            }
        });

        return NextResponse.json({
            type: "success",
            message: "Post Updated successfully"
        });

    } catch (error) {
        console.error("Error ocurred on receiving deploy completed info from server");
        return NextResponse.json({ type: "failed", message: (error as Error).message }, { status: 500 });
    }

}