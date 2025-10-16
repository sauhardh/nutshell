## Nutshell

**Whats in .env?**
*to facilitate contact section in home page*
- TEAM_GMAIL= <email-address>
- TEAM_GMAIL_PASS= <email-app-password>

*to facilitate oauth login*
- GITHUB_ID= <...>
- GITHUB_SECRET= <...>
 *Generated randomly using `openssl rand -base64 32`*
- NEXTAUTH_SECRET= <...>
- NEXTAUTH_URL= <http://...>

*to facilitate projects storage*
- DATABASE_URL= <postgresql://postgres...>

*TO CALL AN SERVER API.*
* UPLOAD_SERVER_API="http://localhost:3000/api/v1/deploy"
