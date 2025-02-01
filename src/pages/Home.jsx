import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Views from "../components/Views";
import { Flex, FloatButton, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchProducts } from "../services/api";
import Navbar from "../components/Navbar";
import Product from "../components/Product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await fetchProducts();
      // console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      setError(error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("auth/", { replace: true });
    } else {
      navigate("/", { replace: true });
      getData();
    }
  }, []);

  if (loading)
    return (
      <div>
        <Spin style={{ marginTop: "10rem" }} />
      </div>
    );
  newProduct ? navigate("product", { replace: true }) : null;

  return (
    <div>
      <Navbar />
      <Flex wrap gap={"10px"}>
        {products.map((product, i) => {
          return <Views key={i} product={product} />;
        })}
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
  );
};

export default Home;
