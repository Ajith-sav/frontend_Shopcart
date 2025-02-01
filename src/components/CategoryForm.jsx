import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { createCategory } from "../services/api";

const CategoryForm = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await createCategory(values);
      message.success("Category created successfully!");
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error("Failed to create category.");
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Category
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
