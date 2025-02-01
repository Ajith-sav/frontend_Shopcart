import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Views from "../components/common/Views";
import { Flex, FloatButton, message, Spin } from "antd";
import { PlusOutlined, DesktopOutlined } from "@ant-design/icons";
import { fetchProducts, searchProducts, signoutUser } from "../services/api";
import Navbar from "../components/common/Navbar";
import { useUser } from "../contexts/UserContext";

const Vendor = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

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

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/auth", { replace: true });
      if (refreshToken) {
        await signoutUser(refreshToken);
      }
    } catch (error) {
      message.error(error?.message || "Failed to logout");
    }
  }, [navigate]);

  const searchAction = async (value) => {
    try {
      const response = await searchProducts(value);
      setProducts(response.data);
    } catch (error) {
      message.error(error?.detail || "Failed to search products");
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading)
    return (
      <div>
        <Spin size="large" style={{ marginTop: "10rem" }} />
      </div>
    );

  return (
    <>
      <div style={{ width: "100%" }}>
        <Navbar onSearch={searchAction} />
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
          onClick={() => navigate("/product", { replace: true })}
          style={{
            insetInlineEnd: 24,
          }}
        />
        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          tooltip="Add Product"
          onClick={() => navigate("/product", { replace: true })}
          style={{
            insetInlineEnd: 24,
          }}
        />  
      </div>
    </>
  );
};

export default Vendor;
