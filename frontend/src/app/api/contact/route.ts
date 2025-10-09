import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const { email, message } = await req.json();

        if (!email || !message) {
            return NextResponse.json({ type: "failed", message: "Missing field" }, { status: 400 })
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env?.TEAM_GMAIL,
                pass: process.env?.TEAM_GMAIL_PASS
            },
        });

        await transporter.sendMail({
            from: `Nutshell Contact <${process.env?.TEAM_GMAIL}>`,
            to: process.env?.TEAM_GMAIL,
            replyTo: email,
            subject: `Nutshell message from ${email}`,
            html: `
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        `
        });

        return NextResponse.json({ type: "success", message: "Message Sent Successfully" }, { status: 200 });
    } catch (e) {
        console.error("Email Sending failed");
        return NextResponse.json({ type: "failed", message: "Something went wrong while sending email" }, { status: 500 });
    }
}