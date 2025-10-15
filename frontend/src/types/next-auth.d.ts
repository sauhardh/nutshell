import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            username: string;
            email?: string | null;
            image?: string | null;
            id: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        username?: string | null;
        access_token?: string;
    }
}