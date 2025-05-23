import axios, { AxiosHeaders } from 'axios'
import { localStorageCache } from '@/utils/settleCache'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { MyAxiosRequestConfig } from '@/libs/request/types/axiosType'

class JWZRequest {
  instance: AxiosInstance

  // constructor init baseURL and timeout
  constructor(config: MyAxiosRequestConfig) {
    this.instance = axios.create(config)

    // all request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        let token = ''
        if (localStorageCache.hasCache("token")) {
          token = localStorageCache.getCache('token')
        }
        const headers = new AxiosHeaders(config.headers)
        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json')
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        if (error.response) {
          return this.#handleResponseError(error)
        } else {
          return Promise.reject(error)
        }
      }
    )

    // observer config isHas interceptor
    if (config.interceptors) {
      // request interceptor
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailFn
      )
      // response interceptor
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailFn
      )
    }
  }

  #handleResponseError(error: any) {
    const status = error.response.status;
    return Promise.reject({
      code: status,
      message: error.response.data.message,
      data: error.response.data.data,
    });
  }

  // request method
  request<T = any>(config: MyAxiosRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(
        config as InternalAxiosRequestConfig
      )
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          if (config.interceptors?.responseFailFn) {
            err = config.interceptors.responseFailFn(err)
          }
          reject(err)
        })
    })
  }

  // get method
  get<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  // post method
  post<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  // delete method
  delete<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  // patch method
  patch<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  // put method
  put<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  // head method
  head<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'HEAD' })
  }

  // options method
  options<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'OPTIONS' })
  }

  // trace method
  trace<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'TRACE' })
  }

  // connect method
  connect<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'CONNECT' })
  }
}

export default JWZRequest