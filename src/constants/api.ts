const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("VITE_API_BASE_URL is missing in .env");
}

export const API_BASE_URL = apiBaseUrl.replace(/\/$/, "");
export const API_ORIGIN = new URL(API_BASE_URL).origin;

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const PENDING_VERIFICATION_EMAIL_KEY = "pendingVerificationEmail";
