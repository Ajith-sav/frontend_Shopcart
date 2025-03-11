import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Views from "../components/common/Views";
import { Flex, FloatButton, message, Spin } from "antd";
import { PlusOutlined, DesktopOutlined } from "@ant-design/icons";
import { fetchProducts } from "../services/api";
import { useUser } from "../contexts/UserContext";
import { useProduct } from "../contexts/ProductContext";

const Vendor = () => {
  const { products, setProducts } = useProduct();
  const navigate = useNavigate();
  const { loading, setLoading, user } = useUser();

  const getData = useCallback(async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      message.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

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
      <div style={{ width: "100%" }}></div>

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
        {user.role == "admin" ? (
          <FloatButton
            icon={<DesktopOutlined />}
            type="primary"
            tooltip="Add Product"
            onClick={() => navigate("/banner", { replace: true })}
            style={{
              insetInlineEnd: 70,
            }}
          />
        ) : null}
      </div>
    </>
  );
};

export default Vendor;
