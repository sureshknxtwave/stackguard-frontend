import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../assets/logo.png";

const { Title, Text } = Typography;

export default function Auth() {
  const navigate = useNavigate();
  const { actions } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (isSignUp) {
        await actions.signUp(values.email, values.password);
        message.success("Account created successfully");
      } else {
        await actions.signIn(values.email, values.password);
        message.success("Signed in successfully");
      }
      navigate("/config");
    } catch {
      message.error("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT SIDE - Full background image */}
      <div className="auth-left" />

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="auth-header">
          <img src={Logo} alt="Stackguard" className="auth-logo" />
          <Title level={2}>Welcome {isSignUp ? "to" : "back to"} Stackguard</Title>
          <Text style={{ fontSize: "18px", color: "#333", fontWeight: 500 }}>
            Secure your codebase with advanced secret scanning security best practices
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="name-fields">
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "First name required" }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Last name required" }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </div>
          )}

          <Form.Item
            name="email"
            rules={[
              { required: true, type: "email", message: "Valid email required" },
            ]}
          >
            <Input placeholder="Enter email ID" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password required" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          {isSignUp && (
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value)
                      return Promise.resolve();
                    return Promise.reject("Passwords do not match");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
          )}

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            style={{
              backgroundColor: "#4B0082",
              borderColor: "#4B0082",
              height: "48px",
              fontSize: "16px",
              borderRadius: "6px",
            }}
          >
            {isSignUp ? "Create account" : "Sign in"}
          </Button>

          <Text className="auth-terms">
            By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>
          </Text>

          <div className="auth-toggle">
            {isSignUp ? (
              <Text>
                Already have an account?{" "}
                <a onClick={() => setIsSignUp(false)}>Sign in</a>
              </Text>
            ) : (
              <Text>
                Don’t have an account?{" "}
                <a onClick={() => setIsSignUp(true)}>Sign up</a>
              </Text>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
