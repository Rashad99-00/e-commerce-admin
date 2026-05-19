import axios from "axios";

const api = axios.create({
  baseURL:
    "http://161.97.154.119/intern-api/api",
});

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;
  }
);

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    if (

      error.response?.status ===
        401 &&

      !originalRequest._retry

    ) {

      originalRequest._retry =
        true;

      try {

        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );

        const res =
          await axios.post(
            "http://161.97.154.119/intern-api/api/auth/refresh",
            {
              refreshToken,
            }
          );

        const newAccessToken =
          res.data.data
            .accessToken;

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(
          originalRequest
        );

      } catch {

        localStorage.clear();

        window.location.href =
          "/";

      }
    }

    return Promise.reject(
      error
    );
  }
);

export default api;