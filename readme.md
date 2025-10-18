# nutshell

A developer cloud to build and deploy web application.
This is a clone app of `vercel`

![nutshell](git-images/nutshell)

## How it works--_in a nutshell_.

![Server-Design](git-images/nutshell-design.svg)

**Upload server**
- Downloads the repository from `github`
- Uploads it to cloud--`cloudflare R2 stroage` is used to store the code. 
- Written in `expressJS`

**Deploy server**
- Continously listens for new object prefix in cloud storage(pushed by upload server) via a `redis` queue, pops them, process the job.
- Downloads the code from Cloudflare R2 storage.
- Builds the code in `Docker` container
- Uploads the built code back to R2 storage.
- Written in `python`

**Request server**
- Serves requests from browser using the deployed builds stored in the cloud.
- Written in `Rust` using `actix-web`.

**Frontend**
- Built with `Next.js`.
- Integrates `GitHub OAuth` for authentication and uses `Prisma + Supabase (PostgreSQL)` for the database.


# `.env`

*All servers share a common .env file.*
<br>
*Create the .env file in the root of this repository (i.e., nutshell/.env, outside all subfolders).*

**.env in root**

```
# cloudflare R2 stroage
CLOUD_STORAGE_ENDPOINT=https://***.r2.cloudflarestorage.com
CLOUD_ACCESS_KEY_ID=cf********5
CLOUD_SECRET_ACCESS_KEY=4*********2
CLOUD_TOKEN_VALUE=r********v

CONVENTIONAL_PREFIX = "repos"
BUCKET_NAME = "nutshell"
BUCKET_BUILD_NAME = "nutshell-build"

# deploy server informs the frontend about completion of deployment
DEPLOY_COMPLETE = "http://localhost:3000/api/deployComplete"
```

**.env inside frontend**
```
# to support contact section in home page
TEAM_GMAIL="r**@gmail.com"
TEAM_GMAIL_PASS="h****c"

# to support OAuth
GITHUB_ID=O******G
GITHUB_SECRET=8*****d

# Generated randomly using `openssl rand -base64 32`
NEXTAUTH_SECRET="r****k="
NEXTAUTH_URL=http://localhost:3000/

# for database
DATABASE_URL="postgresql://postgres:****postgres"

# upload server endpoint
UPLOAD_SERVER_API="http://localhost:3005/api/v1/deploy"
```

## Get started

**Start redis locally**<br>
you can use docker container.
```
redis://localhost:6379
```

**Start frontend**
<br>
*inside `frontend`*
```
pnpm install && pnpm run dev
```

**Start upload server**
<br>
*inside `upload_server`*
```
npm install && npm run dev
```

**Start deploy server**
<br>
*inside `deploy_server`*
<br>
*activate virtual environment*
```
source .venv/bin/activate
```
```
poetry install
```
```
py -m core
```


**Start request server**
<br>
*inside `request_server`*
```
cargo install
```
```
cargo run
```

### todo
[ ] make a common env file

[ ] fix bugs and nit

[ ] place redis uri in .env