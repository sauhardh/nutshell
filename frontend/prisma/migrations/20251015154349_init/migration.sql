-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectUrl" TEXT NOT NULL,
    "githubUserName" TEXT NOT NULL,
    "githubRepoName" TEXT NOT NULL,
    "latestCommit" TEXT NOT NULL,
    "latestCommitTime" TEXT NOT NULL,
    "githubBranch" TEXT NOT NULL DEFAULT 'main',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_projectUrl_key" ON "Post"("projectUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Post_userId_githubRepoName_key" ON "Post"("userId", "githubRepoName");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
