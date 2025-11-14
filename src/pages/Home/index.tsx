import { Card, Space, Spin, Typography } from "antd";
import { useAtom } from "jotai";
import { themeAtom, PRESET_COLORS } from "@/store/theme";
import { createStyles } from "antd-style";

const { Title, Paragraph } = Typography;

const useStyles = createStyles(({ css }) => ({
  colorButton: css`
    width: 60px;
    height: 60px;
    border-radius: 8px;
    border: 3px solid transparent;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &.active {
      border-color: #000;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000;
    }
  `,
  colorGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 16px;
    margin-top: 16px;
  `,
}));

const colorNames = {
  [PRESET_COLORS.daybreak]: "拂晓蓝",
  [PRESET_COLORS.dust]: "薄暮",
  [PRESET_COLORS.volcano]: "火山",
  [PRESET_COLORS.sunset]: "日暮",
  [PRESET_COLORS.calendula]: "金盏花",
  [PRESET_COLORS.sunrise]: "极光绿",
  [PRESET_COLORS.cyan]: "明青",
  [PRESET_COLORS.geekblue]: "极客蓝",
  [PRESET_COLORS.purple]: "酱紫",
  [PRESET_COLORS.magenta]: "洋红",
};

export default function Home() {
  const [themeColor, setThemeColor] = useAtom(themeAtom);
  const { styles, cx } = useStyles();

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <Title level={2}>欢迎使用 React + Vite 开发模板</Title>
        <Paragraph>
          这是一个基于 React 18 + Vite + TypeScript + Ant Design
          的现代化开发模板
        </Paragraph>
        <Spin></Spin>
      </Card>

      <Card title="技术栈">
        <ul>
          <li>⚛️ React 18 - 稳定的 React 版本</li>
          <li>⚡ Vite - 极速的开发体验</li>
          <li>🎨 Ant Design - 企业级 UI 组件库</li>
          <li>🎭 antd-style - CSS-in-JS 解决方案</li>
          <li>🗂️ React Router - 路由管理</li>
          <li>📡 Axios + ahooks - 数据请求</li>
          <li>💾 Jotai - 原子化状态管理</li>
          <li>📘 TypeScript - 类型安全</li>
        </ul>
      </Card>

      <Card title="主题色切换">
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            当前主题色: <strong>{colorNames[themeColor]}</strong> ({themeColor})
          </div>
          <div className={styles.colorGrid}>
            {Object.entries(PRESET_COLORS).map(([key, color]) => (
              <button
                key={key}
                className={cx(
                  styles.colorButton,
                  themeColor === color && "active"
                )}
                style={{ backgroundColor: color }}
                onClick={() => setThemeColor(color)}
                title={colorNames[color]}
              >
                {themeColor === color && "✓"}
              </button>
            ))}
          </div>
          <Paragraph type="secondary" style={{ marginTop: 8 }}>
            点击上方颜色块即可切换主题色，所有 Ant Design
            组件都会自动应用新的主题色
          </Paragraph>
        </Space>
      </Card>
    </Space>
  );
}
