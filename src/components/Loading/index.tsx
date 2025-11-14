import { Spin } from 'antd'
import { createStyles } from 'antd-style'

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    min-height: 200px;
  `,
  tip: css`
    color: ${token.colorTextSecondary};
    font-size: 14px;
  `,
}))

/**
 * 全局 Loading 组件
 * 支持主题切换，会自动跟随当前主题色
 */
const Loading: React.FC = () => {
  const { styles } = useStyles()

  return (
    <div className={styles.container}>
      <Spin />
      <div className={styles.tip}>加载中...</div>
    </div>
  )
}

export default Loading
