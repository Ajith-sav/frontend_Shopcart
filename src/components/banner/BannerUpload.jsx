import React, { useEffect, useState } from "react";
import {
  Upload,
  Button,
  List,
  message,
  Image,
  Layout,
  Row,
  Col,
  Form,
  Input,
} from "antd";
import Title from "antd/es/typography/Title";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createBannerImage,
  deleteImage,
  getBannerImage,
} from "../../services/api";
import { useUser } from "../../contexts/UserContext";

const { Content } = Layout;

const BannerUpload = () => {
  const [banners, setBanners] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [form] = Form.useForm();
  const { loading, setLoading } = useUser();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await getBannerImage();
      console.log(response.data);

      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners", error);
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      setLoading(true);
      await createBannerImage(formData);
      message.success("Banner uploaded successfully!");
      setFileList([]);
      form.resetFields();
      fetchBanners();
    } catch (error) {
      message.error(error.response?.data?.error || "Failed to upload banner.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteImage(id);
      message.success("Banner deleted!");
      fetchBanners();
    } catch (error) {
      message.error("Delete failed!");
    }
  };

  const onChange_image = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const style = {
    backgroundColor: "rgba(0, 0, 0, 0.98)",
    color: "white",
    width: "100%",
    height: "4rem",
    marginTop: 0,
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Title style={style}> Banner Management</Title>
      <Content style={{ padding: "20px" }}>
        <Row gutter={20}>
          <Col span={12}>
            <Form
              onFinish={onFinish}
              form={form}
              labelCol={{ span: 4 }}
              layout="horizontal"
              style={{ maxWidth: 1000 }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter a name." }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: "Please upload an image." }]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList }) => {
                    setFileList(fileList);
                    form.setFieldsValue({
                      image: fileList.length ? fileList : undefined,
                    });
                  }}
                  onPreview={handlePreview}
                  accept="image/jpeg,image/png"
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

              <Button
                type="primary"
                style={{ marginTop: "1rem", marginBottom: "2rem" }}
                htmlType="submit"
                loading={loading}
              >
                Add Banner
              </Button>
            </Form>
          </Col>
        </Row>
        {banners.length > 0 ? (
          <List
            style={{ width: "700px" }}
            itemLayout="horizontal"
            dataSource={banners}
            renderItem={(banner) => (
              <List.Item
                actions={[
                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(banner.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      width={100}
                      src={`data:image/jpeg;base64,${banner.image_blob}`}
                    />
                  }
                  title={banner.name}
                />
              </List.Item>
            )}
          />
        ) : (
          <p>No banners available.</p>
        )}
      </Content>
    </Layout>
  );
};

export default BannerUpload;
