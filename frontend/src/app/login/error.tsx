"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex items-center justify-center h-screen">
            <div
                className="flex flex-col items-center justify-center bg-border border text-primary p-10 rounded-xl gap-8 w-full max-w-md shadow-lg"
            >
                <div className="flex flex-col w-full items-center text-center">
                    <LoaderPinwheel className="animate-spin text-primary mb-2 self-start" size={32} />
                    <h2 className="my-2 text-2xl font-bold text-red-500">
                        Something went wrong
                    </h2>
                    <Button
                        className="mt-4 p-4 rounded-xl w-full font-medium"
                        onClick={() => reset()}
                    >
                        Try again
                    </Button>
                </div>

                <div className="bg-muted/40 border border-border rounded-xl w-full p-4 text-left space-y-1 text-sm text-muted-foreground font-mono">
                    <p className="font-semibold text-foreground">{error.name}</p>
                    <p className="text-muted-foreground break-words">{error.message}</p>
                </div>

                <div className="flex flex-col justify-center items-center gap-3 w-full">
                    <p className="text-sm text-muted-foreground">or go back</p>
                    <Link href="/" className="w-full">
                        <Button variant="outline" className="w-full font-medium">
                            Home
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
