const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiOrigin = import.meta.env.VITE_API_ORIGIN;

if (!apiBaseUrl) {
  throw new Error("VITE_API_BASE_URL is missing in .env");
}

if (!apiOrigin) {
  throw new Error("VITE_API_ORIGIN is missing in .env");
}

export const API_BASE_URL = apiBaseUrl.replace(/\/$/, "");
export const API_ORIGIN = apiOrigin.replace(/\/$/, "");

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const PENDING_VERIFICATION_EMAIL_KEY = "pendingVerificationEmail";
