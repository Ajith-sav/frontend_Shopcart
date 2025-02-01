import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { signupUser } from "../services/api";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await signupUser(values);
      message.success("User registration successful.");
      // console.log("Response Data : ", response);
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((key) => {
          message.error(`${key}: ${errors[key].join(", ")}`);
        });
      } else {
        message.error("Signup failed. Please try later.");
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
          marginTop: 20,
          paddingRight: 50,
        }}
      >
        <Form.Item
          label="Username:"
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="@username" />
        </Form.Item>
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
          label="Phone number:"
          name="phone_number"
          rules={[
            { required: true, message: "Please enter your phone number!" },
          ]}
        >
          <Input placeholder="9087654321" />
        </Form.Item>
        <Form.Item
          label="Password:"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item
          label="Confirm password:"
          name="password2"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Re-enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Signup;
