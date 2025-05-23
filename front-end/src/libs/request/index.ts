import JWZRequest from "./request";
import { localStorageCache } from "@/utils/settleCache";
import type { MyAxiosRequestConfig } from "./types/axiosType";

const TIMEOUT = 1000 * 60 * 10;
let baseURL = "";

if (import.meta.env.VITE_API_DEV_URL) {
  baseURL = import.meta.env.VITE_API_DEV_URL.toString();
}

const request = new JWZRequest({
  baseURL,
  timeout: TIMEOUT,
  withCredentials: true,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localStorageCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    responseSuccessFn: (res) => {
      return res;
    },
    responseFailFn: (err) => {
      return err;
    },
    requestFailFn: (err) => {
      return err;
    }
  }
} as MyAxiosRequestConfig)

export default request;
