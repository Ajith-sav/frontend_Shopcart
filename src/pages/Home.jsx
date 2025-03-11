import React, { useEffect, useState } from "react";
import HeroSection from "../components/customer/HeroSection";
import { fetchProducts } from "../services/api";
import { Flex, message, Spin } from "antd";
import Views from "../components/common/Views";
import "../styles/home.css";
import { useUser } from "../contexts/UserContext";
import { useProduct } from "../contexts/ProductContext";

const Home = () => {
  const { products, setProducts } = useProduct();
  const { loading, setLoading } = useUser();

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      message.error("Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <div>
        <Spin size="large" style={{ marginTop: "10rem" }} />
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <Flex>
        <div className="view-product">
          {products.map((product, i) => (
            <Views key={product.id || i} product={product} />
          ))}
        </div>
      </Flex>
    </div>
  );
};

export default Home;
