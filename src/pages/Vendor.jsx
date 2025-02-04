import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Views from "../components/Views";
import { Flex, FloatButton, message, Spin, Button, Layout, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchProducts, signoutUser } from "../services/api";
import { Header } from "antd/es/layout/layout";

const Vendor = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Products
  const getData = useCallback(async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      setError(error);
      message.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout User
  const logout = useCallback(async () => {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/auth", { replace: true });

      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        await signoutUser(refreshToken);
      }
    } catch (error) {
      message.error(error?.message || "Logout failed");
    }
  }, [navigate]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Handle Product Navigation
  useEffect(() => {
    if (newProduct) {
      navigate("/product", { replace: true });
      setNewProduct(false); // Reset state after navigation
    }
  }, [newProduct, navigate]);

  if (loading)
    return (
      <div>
        <Spin size="large" style={{ marginTop: "10rem" }} />
      </div>
    );

  return (
    <>
      <div style={{ width: "100%" }}>
        <Header className="header">
          <div className="logo" style={{ color: "white", fontSize: "24px" }}>
            ShopCart 🛒
          </div>
          <div className="search" style={{ marginTop: "10px" }}>
            {/* <SearchQuery /> */}
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Button
              className="primary"
              style={{
                marginTop: "1rem",
                backgroundColor: "#1677ff",
                color: "#ffff",
                fontWeight: 500,
                border: "None",
              }}
              onClick={logout}
            >
              LogOut
            </Button>
          </Menu>
        </Header>
      </div>

      <div>
        <Flex wrap gap={"10px"}>
          {products.map((product, i) => (
            <Views key={product.id || i} product={product} />
          ))}
        </Flex>

        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          tooltip="Add Product"
          onClick={() => setNewProduct(true)}
          style={{
            insetInlineEnd: 24,
          }}
        />
      </div>
    </>
  );
};

export default Vendor;
