import {
  Button,
  Form,
  Input,
  Card,
  Typography,
  message,
} from "antd";

import {
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import api from "../../services/api";

const { Title } = Typography;

function VerifyEmail() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const handleVerify = async (
    values: {
      email: string;
      code: string;
    }
  ) => {

    try {

      const res = await api.post(
        "/auth/verify-email",
        values
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
        "Email verified"
      );

      navigate("/dashboard");

    } catch {

      message.error(
        "Verification failed"
      );

    }
  };

  const handleResendCode =
    async () => {

      try {

        await api.post(
          "/auth/resend-verification-code",
          {
            email,
          }
        );

        message.success(
          "Code sent again"
        );

      } catch {

        message.error(
          "Failed to resend code"
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
          Email tesdiq et
        </Title>

        <Form
          layout="vertical"
          onFinish={handleVerify}
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
            <Input
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />
          </Form.Item>

          <Form.Item
            label="Tesdiq kodu"
            name="code"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
          >
            Tesdiq et
          </Button>

          <Button
            block
            style={{
              marginTop: 10,
            }}
            onClick={
              handleResendCode
            }
          >
            Kodu tekrar gonder
          </Button>

        </Form>

      </Card>

    </div>
  );
}

export default VerifyEmail;