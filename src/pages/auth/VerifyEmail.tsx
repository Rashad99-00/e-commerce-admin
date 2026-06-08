import {
  KeyOutlined,
} from "@ant-design/icons";

import {
  Button,
  Form,
  Input,
  message,
} from "antd";

import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import api from "../../services/api";
import { PENDING_VERIFICATION_EMAIL_KEY } from "../../constants/api";
import { getApiErrorMessage } from "../../utils/apiError";

import AuthShell from "./AuthShell";

type VerifyValues = {
  code: string;
};

function VerifyEmail() {
  const navigate = useNavigate();
  const email =
    sessionStorage.getItem(PENDING_VERIFICATION_EMAIL_KEY);

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const handleVerify = async (
    values: VerifyValues
  ) => {
    try {
      await api.post("/auth/verify-email", {
        email,
        code: values.code.trim(),
      });

      sessionStorage.removeItem(PENDING_VERIFICATION_EMAIL_KEY);
      message.success("E-poçt ünvanınız təsdiqləndi. İndi daxil ola bilərsiniz.");
      navigate("/login", { replace: true });
    } catch (error) {
      message.error(getApiErrorMessage(error, "Təsdiq kodu yanlışdır"));
    }
  };

  const handleResendCode = async () => {
    try {
      await api.post("/auth/resend-verification-code", {
        email,
      });
      message.success("Yeni təsdiq kodu göndərildi");
    } catch (error) {
      message.error(
        getApiErrorMessage(error, "Kodu yenidən göndərmək mümkün olmadı")
      );
    }
  };

  return (
    <AuthShell
      badge="E-poçt təsdiqi"
      title="Təsdiq kodunu daxil edin"
      subtitle="E-poçt ünvanınıza göndərilən 6 rəqəmli kodu daxil edin."
    >
      <Form
        className="auth-form"
        layout="vertical"
        requiredMark={false}
        onFinish={(values: VerifyValues) => void handleVerify(values)}
      >
        <Form.Item
          label="Təsdiq kodu"
          name="code"
          rules={[
            { required: true, message: "Təsdiq kodunu daxil edin" },
            { len: 6, message: "Kod 6 rəqəmdən ibarət olmalıdır" },
            { pattern: /^\d{6}$/, message: "Yalnız rəqəm daxil edin" },
          ]}
        >
          <Input
            className="auth-code-input"
            maxLength={6}
            prefix={<KeyOutlined />}
            placeholder="000000"
            inputMode="numeric"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Təsdiq et
        </Button>

        <Button
          className="auth-secondary-button"
          block
          onClick={() => void handleResendCode()}
        >
          Kodu yenidən göndər
        </Button>

        <p className="auth-footnote">
          Hesabınıza qayıtmaq istəyirsiniz?
          <Link to="/login">Daxil olun</Link>
        </p>
      </Form>
    </AuthShell>
  );
}

export default VerifyEmail;
