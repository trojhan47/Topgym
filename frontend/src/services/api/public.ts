import apiClient from "../axios";

export default function contactUs(data: {
  name: string;
  email: string;
  telephone: string;
  message: string;
}) {
  return apiClient
    .post("/contactUs", data)
    .then((res) => Promise.resolve(res.data))
    .catch((e) => Promise.reject(e));
}
