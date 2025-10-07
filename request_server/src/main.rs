use actix_cors::Cors;
use actix_web::{App, HttpServer, middleware, web};
use dotenv::from_path;

use std::env;
use std::path::Path;

mod cloud;
mod core;
use cloud::setup_cloudflare;
use core::load_webpage;

#[actix_web::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    from_path(Path::new("../.env")).ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let endpoint = env::var("CLOUD_STORAGE_ENDPOINT")?;
    let access_key = env::var("CLOUD_ACCESS_KEY_ID")?;
    let secret_key = env::var("CLOUD_SECRET_ACCESS_KEY")?;

    let client = setup_cloudflare(endpoint, access_key, secret_key).await;

    HttpServer::new(move || {
        let client_data = web::Data::new(client.clone());
        let cors = Cors::permissive();

        App::new()
            .wrap(cors)
            .app_data(client_data)
            .service(load_webpage)
            .wrap(middleware::NormalizePath::trim())
            .wrap(middleware::Logger::default())
    })
    .workers(2)
    .bind(("127.0.0.1", 7878))?
    .run()
    .await
    .map_err(|e| Box::new(e) as Box<dyn std::error::Error>)
}