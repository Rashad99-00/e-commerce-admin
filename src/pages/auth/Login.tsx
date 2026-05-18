import {
  Button,
  Form,
  Input,
  Card,
  Typography,
  message,
} from "antd";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../../services/api";
import { useDispatch,}from "react-redux";
import { setUser }from "../../store/slices/authSlice";

const { Title } = Typography;

function Login() {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (
    values: {
      email: string;
      password: string;
    }
  ) => {

    try {

      const res = await api.post(
        "/auth/login",
        values
      );
      console.log(res.data);

dispatch(
  setUser(
    res.data.data.user
  )
);

localStorage.setItem(
  "accessToken",
  res.data.data.accessToken
);

      localStorage.setItem(
        "refreshToken",
        res.data.data.refreshToken
      );

      message.success(
        "Login successful"
      );

      navigate("/dashboard");

    } catch {

      message.error(
        "Login failed"
      );

    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >

      <Card
        style={{
          width: 450,
          borderRadius: 20,
        }}
      >

        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Giris
        </Title>

        <Form
          layout="vertical"
          onFinish={handleLogin}
        >

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
          >
            Daxil ol
          </Button>

          <p
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Hesabin yoxdur?

            <Link to="/register">
              {" "}
              Qeydiyyatdan kec
            </Link>

          </p>

        </Form>

      </Card>

    </div>
  );
}

export default Login;