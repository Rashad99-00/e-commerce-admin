import {
  Button,
  Form,
  Input,
  Card,
  Typography,
  message,
} from "antd";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const { Title } = Typography;

function Register() {

  const navigate = useNavigate();

  const handleRegister = async (
    values: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      password: string;
    }
  ) => {

    try {

      await api.post(
        "/auth/register",
        values
      );

      message.success(
        "Register successful"
      );

      navigate("/verify-email");

    } catch (error) {

  console.log(error);

  message.error(

    "Register failed"

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
          Qeydiyyatdan kec
        </Title>

        <Form
          layout="vertical"
          onFinish={handleRegister}
        >

          <Form.Item
            label="Ad"
            name="firstName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Soyad"
            name="lastName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

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
            label="Telefon nomresi"
            name="phoneNumber"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Parol"
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
            Qeydiyyat
          </Button>

        </Form>

      </Card>

    </div>
  );
}

export default Register;