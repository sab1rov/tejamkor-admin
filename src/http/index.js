import axios from "axios";
import { domain } from "../utils/urls";

export const $authHost = axios.create({
  baseURL: `${domain}`,
});

$authHost.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

$authHost.interceptors.response.use((response) => {
  const originalRequest = response.config;
  let refreshToken = localStorage.getItem("refreshToken");
  let id = localStorage.getItem("id");

  if (
    refreshToken &&
    response.data.code === 400 &&
    response.data.error === "JWT_EXPIRED" &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    return $authHost
      .post(`/admin/refresh`, {
        refreshToken,
        id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
          console.log("Access token refreshed!");
          return $authHost(originalRequest);
        }
      });
  }
  return response;
});
