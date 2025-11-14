/**
 * API 接口示例文件
 *
 * 使用说明：
 * 1. 所有接口统一使用 request 方法发起请求
 * 2. 接口返回类型使用 ApiResponse<T> 包裹
 * 3. 在组件中配合 ahooks 的 useRequest 使用
 *
 * 示例：
 * ```tsx
 * import { useRequest } from 'ahooks'
 * import { getUserInfo } from '@/services/api'
 *
 * const { data, loading, error } = useRequest(getUserInfo)
 * ```
 */

import request from './request'
import type {
  ApiResponse,
  LoginParams,
  LoginData,
  UserInfo,
  PageParams,
  PageData,
} from '@/types/api'

/**
 * 用户登录
 */
export const login = (params: LoginParams) => {
  return request<ApiResponse<LoginData>>({
    url: '/auth/login',
    method: 'POST',
    data: params,
  })
}

/**
 * 用户登出
 */
export const logout = () => {
  return request<ApiResponse<null>>({
    url: '/auth/logout',
    method: 'POST',
  })
}

/**
 * 获取当前用户信息
 */
export const getUserInfo = () => {
  return request<ApiResponse<UserInfo>>({
    url: '/user/info',
    method: 'GET',
  })
}

/**
 * 更新用户信息
 */
export const updateUserInfo = (data: Partial<UserInfo>) => {
  return request<ApiResponse<UserInfo>>({
    url: '/user/info',
    method: 'PUT',
    data,
  })
}

/**
 * 获取用户列表（分页）
 */
export const getUserList = (params: PageParams) => {
  return request<ApiResponse<PageData<UserInfo>>>({
    url: '/user/list',
    method: 'GET',
    params,
  })
}

/**
 * 示例：文件上传
 */
export const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return request<ApiResponse<{ url: string }>>({
    url: '/upload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/**
 * 示例：下载文件
 */
export const downloadFile = (fileId: string) => {
  return request({
    url: `/file/download/${fileId}`,
    method: 'GET',
    responseType: 'blob',
  })
}
