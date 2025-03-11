import React, { useEffect, useMemo, useState } from "react";
import { Button, Spin } from "antd";
import "../../styles/productView.css";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../services/api";
import { useUser } from "../../contexts/UserContext";
import {
  ShoppingCartOutlined,
  TruckOutlined,
  DiffOutlined,
} from "@ant-design/icons";

const ProductDetails = () => {
  const { slug } = useParams();
  const { loading, setLoading } = useUser();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const product_value = async () => {
      try {
        setLoading(true);
        const response = await fetchProduct(slug);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    product_value();
  }, [slug]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!product) {
    return <h3>Product not found</h3>;
  }

  return (
    <>
      <h3>Product</h3>
      <div className="product-container">
        <div className="left content">
          <img
            src={`${product.image}`}
            alt={product.categories[0]}
            width={"350px"}
          />
          {/* <img src="https://loremflickr.com/350/320" alt="image" /> */}
        </div>
        <div className="right content">
          <div className="info">
            <h3>{product.name}</h3>
            <h4>Ratting 4.5</h4>
            <h4>Price : {product.price}₹</h4>
            <p>{product.description}</p>
            <Button type="primary">
              Order
              <TruckOutlined style={{ marginTop: "5px" }} />
            </Button>
            <Button type="primary" style={{ margin: "7px" }}>
              Add to cart <ShoppingCartOutlined style={{ marginTop: "5px" }} />
            </Button>
            <Button type="primary">
              Wish list <DiffOutlined />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
