import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
export default function SignupNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-6">
            <div className="flex gap-2 items-center">
                <TriangleAlert className="w-6 h-6 text-orange-400" />
                <h1 className="text-3xl font-bold text-primary">
                    Not implemented
                </h1>
            </div>
            <p className="text-muted-foreground">
                We encourage you to login via github
            </p>

            <Link href="/login">
            <Button className="mt-2 px-6 py-4 rounded-xl">Back to Login</Button>
            </Link>
        </div>
    );
}
