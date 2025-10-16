export default async function UploadServer(repoUrl: string, projectName: string, branch: string, bucketName: string = "nutshell") {
    try {
        const response = await fetch(`/api/upload`, {
            method: "POST",
            body: JSON.stringify({
                repoUrl,
                bucketName,
                projectName,
                branch
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error(`${response.status} Upload failed: ${response.statusText}`)
        const res = await response.json();
        return res;
    } catch (error) {
        throw new Error(`Failed while requesting upload server. ${error}`)
    }
}