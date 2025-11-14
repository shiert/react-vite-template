import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { message } from 'antd'

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 打印请求日志
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
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, config } = response
    // 打印响应日志
    console.log(
      `%c[Response] ${config.method?.toUpperCase()} ${config.url}`,
      'color: #52c41a; font-weight: bold',
      data
    )
    // 业务错误处理
    if (data.status !== 200) {
      message.error(data.data?.message || data.message || '请求失败')
      return Promise.reject(data)
    }
    return data
  },
  (error) => {
    // HTTP 错误处理
    if (error.response) {
      const { status, data, config } = error.response
      console.error(
        `%c[Response Error] ${config.method?.toUpperCase()} ${config.url}`,
        'color: #ff4d4f; font-weight: bold',
        { status, data }
      )
      if(error.response.status === 401) {
        // 处理未授权错误
        message.error('未授权，请重新登录')
      }else {
        // 处理其他错误
        message.error(data?.message || error.message || '请求失败')
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


export default request