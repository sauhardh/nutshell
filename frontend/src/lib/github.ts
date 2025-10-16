"use client"
import { GithubAllReposType } from "@/app/api/github/[user]/repos/route";

export class GithubRepos {
    public username: string;
    private repos: GithubAllReposType[] | null = null;

    constructor(username: string) {
        this.username = username;
    }

    private async _githubAllRepos(): Promise<GithubAllReposType[] | null> {
        try {
            const response = await fetch(`/api/github/${this.username}/repos`);
            if (!response.ok) {
                console.error("Failed to get response from server while requesting all repos");
                return null;
            }

            return (await response.json()).message as GithubAllReposType[];
        } catch (error) {
            console.error("Error occured while requesting repos from github");
            return null;
        }
    }

    public async GithubRepos(offset: number = 0, limit: number = 6): Promise<GithubAllReposType[] | null> {
        const cached = sessionStorage.getItem(`${this.username}_repos`);
        if (cached) {
            let data: GithubAllReposType[] = JSON.parse(cached);
            return data.slice(offset, offset + limit);
        };

        const response = await this._githubAllRepos();
        if (!response) return null;

        console.log("response", response)

        sessionStorage.setItem(`${this.username}_repos`, JSON.stringify(response));
        return response.slice(offset, offset + limit);
    }
}