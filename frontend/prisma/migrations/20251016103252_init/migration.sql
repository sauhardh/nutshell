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
    "latestCommit" TEXT,
    "latestCommitTime" TEXT,
    "githubBranch" TEXT NOT NULL DEFAULT 'main',
    "status" TEXT NOT NULL DEFAULT 'queued',
    "domainId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_projectName_key" ON "Post"("projectName");

-- CreateIndex
CREATE UNIQUE INDEX "Post_projectUrl_key" ON "Post"("projectUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Post_projectName_projectUrl_userId_key" ON "Post"("projectName", "projectUrl", "userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
