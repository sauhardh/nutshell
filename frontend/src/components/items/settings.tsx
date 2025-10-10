"use client";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Moon, Home, LogOut, Sun, LaptopMinimalCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Settings() {
    const { data: session } = useSession();
    const { setTheme } = useTheme();
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative w-10 h-10 overflow-hidden rounded-full border-3 border-border hover:scale-97">
                    <Image
                        alt="avatar"
                        src={session?.user?.image || "/placeholder.png"}
                        fill
                        priority
                        sizes="40px"
                        className="object-cover"
                    />
                    <span className="sr-only">Settings</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-full font-roboto  rounded-xl shadow-lg p-3 flex flex-col gap-2
                border border-border
                bg-popover text-less-primary"
            >
                <DropdownMenuLabel className="text-sm font-medium text-muted-foreground">
                    <div className="flex-col">
                        <p className="font-medium">{session?.user?.name || "user"}</p>
                        <p className="font-extralight">{session?.user?.email || "...@gmail.com"}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-border border-1 my-2" />

                <DropdownMenuItem className="flex items-center gap-2 px-3 mx-0 py-2 rounded-lg cursor-pointer focus:outline-none"
                    onSelect={(event) => event.preventDefault()}>
                    <div className="flex justify-between w-full items-center">
                        Theme
                        <div className="flex gap-2 border-1 border-transparent p-0.5 rounded-xl
                            hover:bg-border focus:bg-sidebar transition-all duration-150">
                            {/* change color  */}
                            <Sun
                                className="w-4 h-4 hover:scale-90 hover:text-popover-foreground focus:text-popover-foreground focus:scale-90"
                                onClick={() => setTheme("light")}
                            />
                            <Moon
                                className="w-4 h-4 hover:scale-90 hover:text-popover-foreground focus:text-popover-foreground focus:scale-90"
                                onClick={() => setTheme("dark")}
                            />
                            <LaptopMinimalCheck
                                className="w-4 h-4 hover:scale-90 hover:text-popover-foreground focus:text-popover-foreground focus:scale-90"
                                onClick={() => setTheme("system")}
                            />
                        </div>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-border hover:text-popover-foreground focus:outline-none"
                    onClick={() => router.push("/home")}
                    onSelect={(event) => event.preventDefault()}
                >
                    <div className="flex justify-between w-full">
                        Home Page
                        <Home className="w-4 h-4" />
                    </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="border-border border-1 py-0" />
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 pt-1 rounded-lg cursor-pointer 
                                    hover:bg-border hover:text-popover-foreground focus:outline-none"
                    onSelect={(event) => event.preventDefault()}>

                    <div
                        className="flex justify-between w-full"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        Log Out
                        <LogOut className="w-4 h-4" />
                    </div>

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}
