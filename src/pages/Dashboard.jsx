import React from "react";
import { Typography, Button, Card } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const { Title, Text } = Typography;

export default function Dashboard() {
  const { actions, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.signOut();
    navigate("/auth");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f9f9fb",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "500px",
          textAlign: "center",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          backgroundColor: "#fff",
        }}
      >
        <img
          src={Logo}
          alt="Stackguard"
          style={{ height: "60px", marginBottom: "20px" }}
        />
        <Title
          level={2}
          style={{
            marginBottom: "10px",
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          Hello {user?.email ? user.email.split("@")[0] : "User"} 👋
        </Title>
        <Text style={{ fontSize: "16px", color: "#555" }}>
          How are you doing today?
        </Text>

        <Button
          type="primary"
          size="large"
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            backgroundColor: "#4B0082",
            borderColor: "#4B0082",
            borderRadius: "6px",
            fontSize: "16px",
            height: "45px",
            width: "100%",
          }}
        >
          Log out
        </Button>
      </Card>
    </div>
  );
}
