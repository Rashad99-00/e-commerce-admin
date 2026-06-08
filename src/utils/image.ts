import { API_ORIGIN } from "../constants/api";

export function getImageSrc(url?: string | null) {
  if (!url) {
    return "";
  }

  return /^https?:\/\//.test(url)
    ? url.replace(API_ORIGIN, "")
    : url;
}

export function getBackendImageUrl(url?: string | null) {
  if (!url) {
    return "";
  }

  return /^https?:\/\//.test(url) ? url : `${API_ORIGIN}${url}`;
}
