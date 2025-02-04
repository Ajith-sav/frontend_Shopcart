import React, { useState } from "react";
import { Button, Form, Input, message, Typography, Flex } from "antd";
import { signinUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const { Text, Link } = Typography;

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const { fetchUserData } = useUser();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await signinUser(values);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      if (response.status == "200") {
        const token = localStorage.getItem("access");
        fetchUserData(token);
        navigate("/home", { replace: true });
      }
    } catch (error) {
      const errors = error?.response?.data || { error: "Invalid credentials" };
      Object.keys(errors).forEach((key) => {
        message.error(`${key}: ${errors[key]}`);
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        minWidth: 350,
        marginTop: 130,
        paddingRight: 50,
      }}
    >
      <Form.Item
        label="Email:"
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Invalid email format!" },
        ]}
      >
        <Input placeholder="example@email.com" />
      </Form.Item>
      <Form.Item
        label="Password:"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Sign in
        </Button>
      </Form.Item>
      <Flex justify="center" align="flex-start">
        <Text style={{ paddingRight: 3 }}>Welcome to</Text>
        <Link>Shop Cart</Link>
      </Flex>
    </Form>
  );
};

export default Signin;
