import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../assets/logo.png";

const { Title, Text } = Typography;

export default function Config() {
  const navigate = useNavigate();
  const { actions } = useAuth();

  const handleSubmit = ({ key }) => {
    const length = key.trim().length;
    if (length < 100 || length > 1000) {
      message.error("Key must be between 100 and 1000 characters.");
      return;
    }
    actions.saveConfigKey(key.trim());
    message.success("Public key verified successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="config-container">
      {/* LEFT SIDE - Background image */}
      <div className="config-left" />

      {/* RIGHT SIDE */}
      <div className="config-right">
        <div className="auth-header">
          <img src={Logo} alt="Stackguard" className="auth-logo" />
          <Title level={2}>Verify your public key</Title>
          <Text
            style={{
              fontSize: "18px",
              color: "#333",
              fontWeight: 500,
            }}
          >
            To get started provide your public key for verification
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit} className="auth-form">
          <Form.Item
            name="key"
            rules={[{ required: true, message: "Public key required" }]}
          >
            <Input.TextArea
              rows={6}
              placeholder="Enter your public key"
              style={{
                backgroundColor: "#f5f5f5",
                border: "none",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "15px",
                resize: "none",
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{
              backgroundColor: "#4B0082",
              borderColor: "#4B0082",
              height: "48px",
              fontSize: "16px",
              borderRadius: "6px",
            }}
          >
            Verify
          </Button>
        </Form>

        <Text
          style={{
            marginTop: "16px",
            display: "block",
            textAlign: "center",
            fontSize: "14px",
            color: "#444",
          }}
        >
          Don’t have a public key? Contact your administrator
        </Text>
      </div>
    </div>
  );
}
