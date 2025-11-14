import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { createStyles } from "antd-style";
import notFoundSvg from "@/assets/svg/404.svg";

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: ${token.paddingLG}px;
  `,
}));

export default function NotFound() {
  const navigate = useNavigate();
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Empty
        styles={{ image: { width: 300, height: 300 } }}
        image={notFoundSvg}
        description="抱歉，您访问的页面不存在"
      >
        <Button type="primary" onClick={() => navigate("/")}>
          返回首页
        </Button>
      </Empty>
    </div>
  );
}