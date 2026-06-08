import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError(error)) {
    return fallback;
  }

  return error.response?.data?.message ?? fallback;
}
