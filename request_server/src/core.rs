use actix_web::{HttpRequest, HttpResponse, Responder, get, web};
use aws_sdk_s3::Client;
use log::{info, warn};
use serde_json::json;
use std::{env, path::Path};

#[get("/{tail:.*}")]
pub async fn load_webpage(
    req: HttpRequest,
    client: web::Data<Client>,
    path: web::Path<String>,
) -> impl Responder {
    let conn_info = req.connection_info();
    let id = conn_info.host().split(".").collect::<Vec<&str>>()[0].to_string();

    let bucket_name =
        env::var("BUCKET_BUILD_NAME").unwrap_or_else(|_| "nutshell_build".to_string());

    let mut file = path.to_string();
    if file.is_empty() {
        file = "index.html".to_string();
    }

    info!("id {id}, bucket_name {bucket_name}, file: {file}");

    let id = "jaDlMY";
    match client
        .get_object()
        .bucket(bucket_name)
        .key(format!("{id}/build/{file}"))
        .send()
        .await
    {
        Err(e) => {
            warn!("Error <SdkError>: {e:#?}");
            return HttpResponse::BadRequest().json(json!({
                "type": "failed",
                "message":format!("Bad Request. Failed to get objects from bucket")
            }));
        }

        Ok(obj) => {
            // let content_type = {
            // let fallback = obj.content_type().map(|s| s.to_string());
            // match Path::new(&file).extension().and_then(|e| e.to_str()) {
            //     Some("html") => "text/html",
            //     Some("css") => "text/css",
            //     Some("js") => "application/javascript",
            //     Some("ico") => "image/x-icon",
            //     Some("png") => "image/png",
            //     Some("svg") => "image/svg+xml",
            //     _ => &fallback.unwrap_or("application/octet-stream".to_string()),
            // }
            // };

            let content_type = mime_guess::from_path(Path::new(&file)).first_or_octet_stream();

            if let Ok(body) = obj.body.collect().await {
                return HttpResponse::Ok()
                    .content_type(content_type)
                    .body(body.into_bytes());
            }
        }
    }

    HttpResponse::BadGateway().json(json!({
        "type":"failed",
        "message":"Bad Request, Could not get what you are looking for!"
    }))
}
