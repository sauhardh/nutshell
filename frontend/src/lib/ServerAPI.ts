export async function UploadServer(repoUrl: string, projectName: string, branch: string, bucketName: string = "nutshell") {
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

        const data = await response.json();
        console.log("data", data);
        if (!response.ok) throw new Error(`${data.message} Upload failed: ${response.status}`)
        return data;

    } catch (error) {
        throw new Error(`Failed while requesting upload server. ${error}`)
    }
}