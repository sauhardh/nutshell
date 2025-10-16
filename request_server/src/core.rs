use actix_web::HttpRequest;
use actix_web::HttpResponse;
use actix_web::Responder;
use actix_web::get;
use actix_web::web;

use aws_sdk_s3::Client;
use log::{info, warn};
use serde_json::json;

use std::env;
use std::path::Path;

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
