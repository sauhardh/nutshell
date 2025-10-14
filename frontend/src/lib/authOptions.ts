import { NextAuthOptions } from "next-auth"
import GithubProvider, { GithubProfile } from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const githubProfile = profile as GithubProfile;
                token.username = githubProfile.login;
                token.access_token = account.access_token;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.username = token.username;
            return session;
        }
    }
}