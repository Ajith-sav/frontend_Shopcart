import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import HeroSection from "../components/customer/HeroSection";
import useScrollTo from "rc-virtual-list/lib/hooks/useScrollTo";
import { fetchProducts } from "../services/api";
import { Flex, message } from "antd";
import Views from "../components/common/Views";
import "../styles/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      message.error("Try again later..");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Navbar />
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
