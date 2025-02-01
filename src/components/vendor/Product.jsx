import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCategory,
  createProduct,
  fetchProduct,
  updateProduct,
  deleteProduct,
} from "../../services/api";

import {
  message,
  Button,
  Form,
  Input,
  Layout,
  Divider,
  InputNumber,
  Switch,
  Upload,
  Select,
  Image,
  Spin,
  Row,
  Col,
} from "antd";
import Title from "antd/es/typography/Title";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { Content } from "antd/es/layout/layout";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const Product = ({ editMode }) => {
  const { slug } = useParams();
  const [refresh, setRefresh] = useState(false);
  const [form] = Form.useForm();
  const [available, setAvailable] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const response = await fetchCategory();
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to get categories."
      );
      setCategories([]);
    }
  };

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await fetchProduct(slug);
      form.setFieldsValue({
        name: response.data.name,
        brand_name: response.data.brand_name,
        description: response.data.description,
        price: response.data.price,
        stock: response.data.stock,
        available: response.data.available,
        categories: response.data.categories.map((cat) => cat.id),
        Image: null,
      });
      setProduct(response.data);

      if (response.data.image) {
        setFileList([
          {
            uid: "-1",
            name: "product-image",
            status: "done",
            url: response.data.image,
          },
        ]);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch the product.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    editMode ? getProduct() : null;
  }, []);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const onSuccess = () => {
    setRefresh(!refresh);
  };

  const onFinish = async (values) => {
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
    values.categories.forEach((category) =>
      formData.append("categories", category)
    );

    if (fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      setLoading(true);
      editMode
        ? await updateProduct(slug, formData)
        : await createProduct(formData);
      message.success("Product updated successfully!");
      !editMode ? form.resetFields() : null;
      setFileList([]);
      onSuccess();
    } catch (error) {
      const errorMessage = error.message || "Failed to update the product.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProduct(slug);
      message.success("Product is deleted now");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      message.error("Error in delete product");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div>
        <Spin size="large" style={{ marginTop: "10rem" }} />
      </div>
    );
  if (editMode && !product) return <div>Product not Found</div>;

  const style = {
    backgroundColor: "rgba(0, 0, 0, 0.98)",
    color: "white",
    width: "100%",
    height: "4rem",
    marginTop: 0,
  };

  return (
    <>
      {!editMode ? (
        <Title style={style}>Add New Product</Title>
      ) : (
        <Title style={style}>Update Product Details</Title>
      )}
      <Layout>
        <Content style={{ padding: "24px" }}>
          {editMode ? (
            <div
              className="btn"
              style={{
                marginTop: 0,
                marginBottom: 50,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button type="primary" danger onClick={handleDelete}>
                Delete
              </Button>
            </div>
          ) : null}
          <Row gutter={20}>
            <Col span={12}>
              <Form
                onFinish={onFinish}
                form={form}
                labelCol={{
                  span: 4,
                }}
                layout="horizontal"
                style={{
                  maxWidth: 1000,
                }}
              >
                <Form.Item
                  label="Name"
                  name={"name"}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Brand"
                  name={"brand_name"}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name={"description"}
                  rules={[{ required: true }]}
                >
                  <TextArea rows={8} />
                </Form.Item>

                <Form.Item
                  label="Image"
                  name={"image"}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[
                    { required: !editMode, message: "Please upload an image." },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={handlePreview}
                    accept="image/jpeg,image/png,image/svg"
                    beforeUpload={() => false}
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                      }}
                      src={previewImage}
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Price"
                  name={"price"}
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  label="No of stock"
                  name={"stock"}
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  label="Is available"
                  name={"available"}
                  valuePropName="checked"
                  rules={[{ required: true }]}
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
                  name="categories"
                  label="Categories"
                  rules={[{ required: true }]}
                >
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="Select or search categories"
                    optionFilterProp="label"
                    style={{
                      width: "100%",
                    }}
                    filterOption={(input, option) =>
                      option?.label?.toLowerCase().includes(input.toLowerCase())
                    }
                    options={categories.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                  />
                </Form.Item>

                {editMode ? (
                  <Button
                    type="primary"
                    style={{ marginTop: "1rem", marginBottom: "2rem" }}
                    htmlType="submit"
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    style={{ marginTop: "1rem", marginBottom: "2rem" }}
                    htmlType="submit"
                  >
                    Add Product
                  </Button>
                )}
              </Form>
            </Col>
            <Col span={12}>
              <CategoryForm onSuccess={onSuccess} />
              <CategoryList refresh={refresh} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Product;
