import React, { useState } from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const Views = ({ product }) => {
  const navigate = useNavigate();
  const changeName = product.name
    ? product.name[0].toUpperCase() + product.name.slice(1)
    : "Unknown Product";
  const category = product.categories?.[0] ?? { name: "Unknown Category" };
  const productImage = product.image || "https://via.placeholder.com/240x350";

  const productInfo = async () => {
    if (!product.slug) return;
    navigate(`/product/${product.slug}`, { replace: true });
  };
  return (
    <div style={{ margin: "30px", textAlign: "center" }}>
      <Card
        onClick={productInfo}
        hoverable
        style={{
          width: 240,
          height: 300,
        }}
        cover={
          <div
            style={{ display: "flex", justifyContent: "center", padding: 10 }}
          >
            <img
              alt={category.name}
              src={productImage}
              style={{
                marginTop: "25px",
                maxWidth: "85%",
                marginLeft: "-1.5rem",
                height: "75%",
                objectFit: "contain",
              }}
            />
          </div>
        }
      >
        <Meta
          title={changeName}
          description={`Price:${product.price ?? "N/A"}`}
          style={{ marginTop: 20 }}
        />
      </Card>
    </div>
  );
};
export default Views;
