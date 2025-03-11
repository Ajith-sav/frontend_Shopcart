import React from "react";
import { Card, Rate } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const Views = ({ product }) => {
  const navigate = useNavigate();
  const changeName = product.name
    ? product.name[0].toUpperCase() + product.name.slice(1)
    : "Unknown Product";
  const category = product.categories?.[0] ?? { name: "Unknown Category" };
  const productImage = product.image || `http://localhost:8000${product.image}`;
  const rating = product.rating || 4.5;

  const productInfo = async () => {
    if (!product.slug) return;
    navigate(`/product/${product.slug}`, { replace: true });
  };

  return (
    <Card
      hoverable
      style={{ width: 260, margin: 20 }}
      onClick={productInfo}
      cover={
        <img
          alt={category}
          src={productImage}
          style={{ height: 230, objectFit: "contain", marginTop: 25 }}
        />
      }
    >
      <Meta
        title={changeName}
        description={`Price: ${product.price ?? "N/A"}`}
      />
      <div style={{ marginTop: 10 }}>
        <Rate allowHalf defaultValue={rating} disabled />
      </div>
    </Card>
  );
};
export default Views;
