from pathlib import Path
import os
import environ

BASE_DIR = Path(__file__).resolve().parent.parent

# ------------------------
#  VARIABLES DE ENTORNO
# ------------------------
env = environ.Env()
environ.Env.read_env(BASE_DIR / ".env")  # lee las variables del archivo .env

SECRET_KEY = "django-insecure-rd)57!zivhb$a2vauyc&9)a#v_hb5!wtq1#j*ir^$rtk+2b$%k"
DEBUG = True

ALLOWED_HOSTS = ["*"]  # en desarrollo, para no tener problemas


# ------------------------
#  APLICACIONES
# ------------------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # librerías extra
    "rest_framework",     # Django REST Framework
    "corsheaders",        # Para permitir llamadas desde React

    # tu app personalizada
    "api",
              # la app donde harás endpoints
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # debe ir antes de CommonMiddleware
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",

]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# ------------------------
#  BASE DE DATOS
# ------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# ------------------------
#  VALIDACIÓN DE PASSWORD
# ------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# ------------------------
#  INTERNACIONALIZACIÓN
# ------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


# ------------------------
#  ARCHIVOS ESTÁTICOS
# ------------------------
STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ------------------------
#  CORS (para conectar React)
# ------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # React Vite
    "http://127.0.0.1:5173",
]


# (solo en desarrollo, opcional)
# CORS_ALLOW_ALL_ORIGINS = True


# ------------------------
#  VARIABLES PERSONALIZADAS (GoHighLevel API)
# ------------------------
GHL_BASE_URL = "https://services.leadconnectorhq.com"
GHL_PRIVATE_TOKEN = env("GHL_PRIVATE_TOKEN")  # desde .env
GHL_LOCATION_ID = env("GHL_LOCATION_ID")      # desde .env
