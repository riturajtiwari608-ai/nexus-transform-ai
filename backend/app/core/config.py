import os
from pydantic import BaseModel


class Settings(BaseModel):
    APP_NAME: str = "NexusTransform AI"
    APP_VERSION: str = "2.0.0"
    API_PREFIX: str = "/api"
    DEBUG: bool = True
    CORS_ORIGINS: list = ["*"]
    DEFAULT_INDUSTRY: str = "banking_claims"


settings = Settings()
