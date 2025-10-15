import { PrismaClient, Prisma } from "@/generated/prisma";

const prisma = new PrismaClient();

const data: Prisma.UserCreateInput[] = [
    {
        id: "84185378",
        posts: {
            create: [
                {
                    id: "84185378_post1",
                    projectName: "nutshell_itself",
                    projectUrl: "https://www.sauhardhakafle.com.np",
                    githubUserName: "sauhardh",
                    githubRepoName: "nutshell",
                    latestCommit: "commit",
                    latestCommitTime: "9:37 PM",
                    githubBranch: "main",
                }
            ]
        }
    }
];

export async function main() {
    for (const user of data) {
        await prisma.user.create({ data: user })
    }
}

main();