import React from "react";
import { Card, Flex } from "antd";
import Signup from "./Signup";
import Signin from "./Signin";
const cardStyle = {
  width: 750,
};
const imgStyle = {
  display: "block",
  width: 350,
  marginLeft: 20,
};

const Cards = ({ component }) => {
  return (
    <Card
      hoverable
      style={cardStyle}
      styles={{
        body: {
          padding: 1,
          overflow: "hidden",
        },
      }}
    >
      <Flex justify="space-between">
        {component ? (
          <img
            alt="avatar"
            src="https://cdn.pixabay.com/photo/2024/05/28/07/31/ai-generated-8793077_960_720.png"
            style={imgStyle}
          />
        ) : (
          <img
            alt="avatar"
            src="https://cdn.pixabay.com/photo/2024/05/28/07/31/ai-generated-8793079_960_720.png"
            style={imgStyle}
          />
        )}
        {component ? <Signin /> : <Signup />}
      </Flex>
    </Card>
  );
};

export default Cards;
