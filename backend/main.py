from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urlparse
import os
import re

app = FastAPI(title="CyberShield API")

cors_raw = os.getenv("CORS_ORIGINS", "*").strip()
if cors_raw == "*":
    allow_origins = ["*"]
    allow_credentials = False
else:
    allow_origins = [origin.strip() for origin in cors_raw.split(",") if origin.strip()]
    allow_credentials = True

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)


class URLRequest(BaseModel):
    url: str


class MessageRequest(BaseModel):
    message: str


class PasswordRequest(BaseModel):
    password: str


@app.get("/")
def home():
    return {
        "message": "CyberShield Backend is Working! 🛡️"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "success",
        "message": "CyberShield API is healthy!"
    }


@app.post("/api/scan-url")
def scan_url(data: URLRequest):

    url = data.url.strip()
    reasons = []
    risk_score = 0

    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    parsed = urlparse(url)
    domain = parsed.netloc.lower()

    # HTTPS check
    if parsed.scheme != "https":
        reasons.append("Website does not use HTTPS.")
        risk_score += 20

    # IP address check
    if re.match(r"^\d{1,3}(\.\d{1,3}){3}$", domain):
        reasons.append("URL uses an IP address instead of a normal domain.")
        risk_score += 30

    # Suspicious URL characters
    if "@" in url:
        reasons.append("URL contains '@', which can hide the real destination.")
        risk_score += 25

    # Suspicious keywords
    suspicious_words = [
        "login", "verify", "account", "password",
        "update", "secure", "bank", "confirm"
    ]

    found_words = [
        word for word in suspicious_words
        if word in url.lower()
    ]

    if len(found_words) >= 2:
        reasons.append(
            "URL contains multiple security-sensitive keywords."
        )
        risk_score += 20

    # Long URL
    if len(url) > 100:
        reasons.append("URL is unusually long.")
        risk_score += 10

    risk_score = min(risk_score, 100)

    if risk_score >= 60:
        risk_level = "HIGH"
    elif risk_score >= 30:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    if not reasons:
        reasons.append("No obvious suspicious URL patterns detected.")

    return {
        "url": url,
        "risk_level": risk_level,
        "risk_score": risk_score,
        "reasons": reasons
    }


@app.post("/api/analyze-message")
def analyze_message(data: MessageRequest):

    message = data.message.lower()
    reasons = []
    risk_score = 0

    urgency_words = [
        "urgent", "immediately", "act now",
        "within 24 hours", "as soon as possible"
    ]

    threat_words = [
        "blocked", "suspended", "closed",
        "legal action", "account will be"
    ]

    sensitive_words = [
        "password", "otp", "pin",
        "credit card", "bank account"
    ]

    for word in urgency_words:
        if word in message:
            reasons.append("Urgent or pressure-based language detected.")
            risk_score += 20
            break

    for word in threat_words:
        if word in message:
            reasons.append("Threatening or account-warning language detected.")
            risk_score += 25
            break

    for word in sensitive_words:
        if word in message:
            reasons.append("Message requests or mentions sensitive information.")
            risk_score += 30
            break

    if "http://" in message or "https://" in message:
        reasons.append("Message contains a link.")
        risk_score += 20

    risk_score = min(risk_score, 100)

    if risk_score >= 60:
        risk_level = "HIGH"
    elif risk_score >= 30:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    if not reasons:
        reasons.append("No obvious phishing indicators detected.")

    return {
        "risk_level": risk_level,
        "risk_score": risk_score,
        "reasons": reasons
    }


@app.post("/api/check-password")
def check_password(data: PasswordRequest):

    password = data.password
    score = 0
    suggestions = []

    if len(password) >= 8:
        score += 20
    else:
        suggestions.append("Use at least 8 characters.")

    if len(password) >= 12:
        score += 20

    if re.search(r"[A-Z]", password):
        score += 15
    else:
        suggestions.append("Add uppercase letters.")

    if re.search(r"[a-z]", password):
        score += 15
    else:
        suggestions.append("Add lowercase letters.")

    if re.search(r"\d", password):
        score += 15
    else:
        suggestions.append("Add numbers.")

    if re.search(r"[^A-Za-z0-9]", password):
        score += 15
    else:
        suggestions.append("Add special characters.")

    score = min(score, 100)

    if score >= 80:
        strength = "STRONG"
    elif score >= 50:
        strength = "MEDIUM"
    else:
        strength = "WEAK"

    return {
        "strength": strength,
        "score": score,
        "suggestions": suggestions
    }
