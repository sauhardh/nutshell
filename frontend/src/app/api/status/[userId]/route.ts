import { authOptions } from "@/lib/authOptions";
import redis from "@/lib/redis";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await props.params;
        if (!userId) {
            return NextResponse.json({ type: "failed", message: "userId missing in query" }, { status: 400 })
        }

        const session = await getServerSession(authOptions);
        if (session?.user.id != userId) {
            return NextResponse.json({ type: "failed", message: "unauthorized access" }, { status: 400 });
        }

        const subscriber = redis.duplicate();
        await subscriber.connect();

        const stream = new ReadableStream({
            start(controller) {
                subscriber.subscribe(userId, (msg) => {
                    controller.enqueue(`data: ${msg}\n\n`);
                });

                const keepAlive = setInterval(() => controller.enqueue(":\n\n"), 20000);

                req.signal.addEventListener("abort", async () => {
                    clearInterval(keepAlive);
                    await subscriber.unsubscribe(userId);
                    await subscriber.quit();
                    controller.close();
                });
            }
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            }
        });

    } catch (error: any) {
        console.error("Error occured in handler of redis subscriber.", error);
        return NextResponse.json({ type: "failed", message: error.message }, { status: 500 });
    }
}