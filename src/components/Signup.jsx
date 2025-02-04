import { useState } from "react";
import { Button, Form, Input, message, Switch, Space, Select } from "antd";
import { signupUser } from "../services/api";
import "../styles/signup.css";

const roleList = [
  { role: "Vendor", values: "vendor" },
  { role: "Customer", values: "customer" },
];
const { Option } = Select;
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await signupUser(values);
      message.success("User registration successful.");
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
          maxWidth: "100%",
          minWidth: 350,
          maxHeight: "30em",
          marginTop: 40,
          marginBottom: 20,
          paddingRight: 50,
          overflow: "auto",
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
          label="Are you vendor or customer:"
          name={"role"}
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select Option"
            style={{ width: "100%" }}
            value={selectedRole}
            defaultValue={"customer"}
            onChange={(value) => {
              setSelectedRole(value);
            }}
            allowClear
            options={roleList.map((data) => ({
              value: data.values,
              label: data.role,
            }))}
          />
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
