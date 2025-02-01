import React, { useState } from "react";
import { Button, Form, Input, message, Typography, Flex } from "antd";
import { signinUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;
const Signin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const boxStyle = {
    width: "100%",
    height: 120,
    borderRadius: 6,
  };
  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await signinUser(values);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      navigate("/");
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((key) => {
          // console.log(errors);
          message.error(`${key}: ${errors[key]}`);
        });
      } else {
        message.error("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        layout={"vertical"}
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          minWidth: 350,
          marginTop: 120,
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
        <Flex style={boxStyle} justify={"center"} align={"flex-start"}>
          <Text style={{ paddingRight: 3 }}>Welcome to </Text>
          <Link>Shop cart</Link>
        </Flex>
      </Form>
    </>
  );
};

export default Signin;
