import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 打印请求日志（生产环境会被 esbuild 自动移除）
    console.log(
      `%c[Request] ${config.method?.toUpperCase()} ${config.url}`,
      'color: #1890ff; font-weight: bold',
      {
        params: config.params,
        data: config.data,
      }
    )

    return config
  },
  (error) => {
    console.error('[Request Error]', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, config } = response

    // 打印响应日志（生产环境会被 esbuild 自动移除）
    console.log(
      `%c[Response] ${config.method?.toUpperCase()} ${config.url}`,
      'color: #52c41a; font-weight: bold',
      data
    )

    // 业务错误处理
    if (data.code !== 0) {
      message.error(data.message || '请求失败')
      return Promise.reject(data)
    }

    return data
  },
  (error) => {
    // HTTP 错误处理
    if (error.response) {
      const { status, config } = error.response

      console.error(
        `%c[Response Error] ${config.method?.toUpperCase()} ${config.url}`,
        'color: #ff4d4f; font-weight: bold',
        {
          status,
          data: error.response.data,
        }
      )

      switch (status) {
        case 401:
          message.error('未授权，请重新登录')
          localStorage.removeItem('token')
          // 延迟跳转，避免多次弹窗
          setTimeout(() => {
            window.location.href = '/login'
          }, 1000)
          break
        case 403:
          message.error('拒绝访问')
          break
        case 404:
          message.error('请求资源不存在')
          break
        case 500:
          message.error('服务器错误')
          break
        case 502:
          message.error('网关错误')
          break
        case 503:
          message.error('服务不可用')
          break
        default:
          message.error(error.response.data?.message || '请求失败')
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      message.error('网络错误，请检查网络连接')
      console.error('[Network Error]', error.request)
    } else {
      // 请求配置出错
      message.error('请求配置错误')
      console.error('[Request Config Error]', error.message)
    }

    return Promise.reject(error)
  }
)

/**
 * 通用请求方法
 * @param config axios 请求配置
 * @returns Promise
 */
export const request = <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  return instance.request(config)
}

export default instance