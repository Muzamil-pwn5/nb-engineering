from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "NB Engineering & Services"
    app_env: str = "development"

    database_url: str

    admin_username: str
    admin_password: str

    jwt_secret: str
    jwt_expire_minutes: int = 480

    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str
    smtp_password: str

    inquiry_notification_email: str = "nbengineerings@gmail.com"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


settings = Settings()
