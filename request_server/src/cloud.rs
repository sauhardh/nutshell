use aws_config::Region;
use aws_config::meta::region::RegionProviderChain;
use aws_sdk_s3::{self as s3, Client};
use s3::config::Builder;
use s3::config::Credentials;

pub async fn setup_cloudflare(endpoint: String, access_key: String, secret_key: String) -> Client {
    let region_provider = RegionProviderChain::first_try(Region::new("auto"));

    let shared_config = aws_config::from_env()
        .region(region_provider.region().await)
        .credentials_provider(Credentials::new(
            access_key, secret_key, None, None, "custom",
        ))
        .load()
        .await;
    let config = Builder::from(&shared_config).endpoint_url(endpoint).build();

    s3::Client::from_conf(config)
}
