import axios from "axios";
import store from "store";
import { notification } from "antd";

// instance of a class
const apiClient = axios.create({
  baseURL: "/api",
});

// middleware
apiClient.interceptors.request.use((request: any) => {
  const accessToken = store.get("accessToken");

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
    request.headers.accessToken = accessToken;
  }
  return request;
});

apiClient.interceptors.response.use(undefined, (error) => {
  // errors handling
  const { response } = error;
  const { data } = response;

  if (data && !window.location.pathname.startsWith("/auth")) {
    notification.warning({
      message: data.message ? data.message : JSON.stringify(data),
    });
  }

  //   if (
  //     response.status === 401 &&
  //     !window.location.pathname.startsWith("/auth")
  //   ) {
  //     history.pushState({
  //       pathname: "/auth/login",
  //       state: { page: window.location.pathname },
  //     });
  //   }
});

export default apiClient;
