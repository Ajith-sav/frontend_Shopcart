import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategory, createProduct } from "../services/api";
import { PlusOutlined } from "@ant-design/icons";

import {
  message,
  Button,
  Form,
  Input,
  Divider,
  InputNumber,
  Switch,
  Upload,
  Select,
  Space,
  Spin,
} from "antd";
import Title from "antd/es/typography/Title";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Product = () => {
  const [form] = Form.useForm();
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const inputRef = useRef(null);

  const getCategories = async () => {
    try {
      const response = await fetchCategory();
      setCategoriesList(response.data.map((cat) => cat.name));
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to get categories."
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setCategoriesList([
      ...categoriesList,
      categoryName || `New item ${index++}`,
    ]);
    setCategoryName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSubmit = async (values) => {
    if (fileList.length == 0) {
      message.warning("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("brand_name", values.brand_name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    formData.append("available", values.available);
    formData.append("image", fileList[0].originFileObj);
    values.categories.forEach((category) =>
      formData.append("categories", category)
    );

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value, "------");
    // }

    try {
      setLoading(true);
      await createProduct(formData);
      message.success("Product updated successfully!");
      form.resetFields();
    } catch (error) {
      // console.error(error);

      const errorMessage = error.message || "Failed to update the product.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div>
        <Spin />
      </div>
    );

  return (
    <>
      <Title style={{ backgroundColor: "blue", color: "white" }}>
        Add New Product
      </Title>
      <Form
        onFinish={handleSubmit}
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="horizontal"
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item label="Name" name={"name"}>
          <Input />
        </Form.Item>
        <Form.Item label="Brand" name={"brand_name"}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name={"description"}>
          <TextArea rows={8} />
        </Form.Item>

        <Form.Item
          label="Image"
          name={"image"}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            accept="image/jpeg,image/png,image/svg"
            beforeUpload={() => false}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>

        <Form.Item label="Price" name={"price"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="No of stock" name={"stock"}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Is available"
          name={"available"}
          valuePropName="checked"
        >
          <Switch
            checked={available}
            checkedChildren="Available"
            unCheckedChildren="No stock"
            onChange={() => {
              setAvailable(!available);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Categories"
          name="categories"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select product category"
            mode="multiple"
            value={category}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  style={{
                    padding: "0 8px 4px",
                  }}
                >
                  <Input
                    placeholder="New category"
                    ref={inputRef}
                    value={categoryName}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addItem}
                  >
                    Add category
                  </Button>
                </Space>
              </>
            )}
            options={categoriesList.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </Form.Item>

        <Button
          type="primary"
          style={{ marginTop: "1rem", marginBottom: "2rem" }}
          htmlType="submit"
        >
          Add Product
        </Button>
      </Form>
    </>
  );
};

export default Product;
