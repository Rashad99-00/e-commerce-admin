import {
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";

import {
  Button,
  Form,
  Input,
  message,
} from "antd";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import api from "../../services/api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../constants/api";
import { getApiErrorMessage } from "../../utils/apiError";

import {
  setUser,
} from "../../store/slices/authSlice";

import AuthShell from "./AuthShell";

type LoginValues = {
  email: string;
  password: string;
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (
    values: LoginValues
  ) => {
    try {
      const res = await api.post("/auth/login", values);
      const data = res.data.data;

      dispatch(setUser(data.user));
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      message.success("Xoş gəldiniz!");
      navigate("/dashboard");
    } catch (error) {
      message.error(getApiErrorMessage(error, "Daxil olmaq mümkün olmadı"));
    }
  };

  return (
    <AuthShell
      badge="Admin girişi"
      title="Hesabınıza daxil olun"
      subtitle="Mağazanızı idarə etmək üçün giriş məlumatlarınızı daxil edin."
      showBack={false}
    >
      <Form
        className="auth-form"
        layout="vertical"
        requiredMark={false}
        onFinish={(values: LoginValues) => void handleLogin(values)}
      >
        <Form.Item
          label="E-poçt ünvanı"
          name="email"
          rules={[
            { required: true, message: "E-poçt ünvanını daxil edin" },
            { type: "email", message: "Düzgün e-poçt ünvanı daxil edin" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="name@example.com"
          />
        </Form.Item>

        <Form.Item
          label="Parol"
          name="password"
          rules={[
            { required: true, message: "Parolu daxil edin" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Parolunuz"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Daxil ol
        </Button>

        <p className="auth-footnote">
          Hesabınız yoxdur?
          <Link to="/register">Qeydiyyatdan keçin</Link>
        </p>
      </Form>
    </AuthShell>
  );
}

export default Login;
