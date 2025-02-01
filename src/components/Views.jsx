import React, { useState } from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const Views = ({ product }) => {
  const navigate = useNavigate();
  const changeName = product.name[0].toUpperCase() + product.name.slice(1);
  const category = product.categories ? product.categories[0] : null;

  const productInfo = async () => {
    navigate(`product/${product.slug}`, { replace: true });
  };
  return (
    <div style={{ margin: "30px" }}>
      <Card
        onClick={productInfo}
        hoverable
        style={{
          width: 240,
        }}
        cover={
          <img
            alt={category ? category.name : "Product Image"}
            src={product.image}
            // src={"https://picsum.photos/id/237/200/300"}
          />
        }
      >
        <Meta title={changeName} description={product.price} />
      </Card>
    </div>
  );
};
export default Views;
