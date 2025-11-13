import { lazy, Suspense, type JSX } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import BasicLayout from '@/layouts/BasicLayout'
import Loading from '@/components/Loading'

// 懒加载页面组件
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// 包装 Suspense 的高阶组件
const withSuspense = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: withSuspense(Home),
      },
      {
        path: 'about',
        element: withSuspense(About),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(NotFound),
  },
])