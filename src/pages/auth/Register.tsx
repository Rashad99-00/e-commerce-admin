import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
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

import api from "../../services/api";
import { PENDING_VERIFICATION_EMAIL_KEY } from "../../constants/api";
import { getApiErrorMessage } from "../../utils/apiError";

import AuthShell from "./AuthShell";

type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
};

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (
    values: RegisterValues
  ) => {
    try {
      await api.post("/auth/register", values);
      sessionStorage.setItem(
        PENDING_VERIFICATION_EMAIL_KEY,
        values.email.trim()
      );
      message.success("Təsdiq kodu e-poçt ünvanınıza göndərildi");
      navigate("/verify-email");
    } catch (error) {
      message.error(getApiErrorMessage(error, "Qeydiyyat uğursuz oldu"));
    }
  };

  return (
    <AuthShell
      badge="Yeni hesab"
      title="Qeydiyyatdan keçin"
      subtitle="Admin hesabınızı yaradın və e-poçt təsdiqindən sonra sistemə daxil olun."
    >
      <Form
        className="auth-form"
        layout="vertical"
        requiredMark={false}
        onFinish={(values: RegisterValues) => void handleRegister(values)}
      >
        <div className="auth-form-grid">
          <Form.Item
            label="Ad"
            name="firstName"
            rules={[
              { required: true, message: "Adınızı daxil edin" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Ad" />
          </Form.Item>
          <Form.Item
            label="Soyad"
            name="lastName"
            rules={[
              { required: true, message: "Soyadınızı daxil edin" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Soyad" />
          </Form.Item>
        </div>

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
          label="Telefon nömrəsi"
          name="phoneNumber"
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="+994 50 000 00 00"
          />
        </Form.Item>

        <Form.Item
          label="Parol"
          name="password"
          rules={[
            { required: true, message: "Parol yaradın" },
            { min: 6, message: "Parol ən azı 6 simvoldan ibarət olmalıdır" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Ən azı 6 simvol"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Hesab yarat
        </Button>

        <p className="auth-footnote">
          Artıq hesabınız var?
          <Link to="/login">Daxil olun</Link>
        </p>
      </Form>
    </AuthShell>
  );
}

export default Register;
