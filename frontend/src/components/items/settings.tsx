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
import { Settings as SettingLogo, Moon, Home, LogOut, Sun, LaptopMinimalCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Settings() {
    const { setTheme } = useTheme();
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <SettingLogo className="w-full p-0 m-0 h-full" />
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
                        <p className="font-medium">Sauhardha</p>
                        <p className="font-extralight">sauhardhakafle@gmail.com</p>
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
                    onClick={() => router.push("/")}
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
                    <div className="flex justify-between w-full">
                        Log Out
                        <LogOut className="w-4 h-4" />
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}
