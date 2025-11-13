/**
 * API 响应基础类型
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

/**
 * 分页请求参数
 */
export interface PageParams {
  page: number
  pageSize: number
}

/**
 * 分页响应数据
 */
export interface PageData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * 用户信息
 */
export interface UserInfo {
  id: number
  username: string
  email: string
  avatar?: string
  role: string
  createdAt: string
}

/**
 * 登录请求参数
 */
export interface LoginParams {
  username: string
  password: string
}

/**
 * 登录响应数据
 */
export interface LoginData {
  token: string
  userInfo: UserInfo
}
