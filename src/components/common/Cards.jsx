import React from "react";
import { Card, Flex } from "antd";
import Signup from "../user/Signup";
import Signin from "../user/Signin";
import ErrorBoundary from "../error/ErrorBoundary ";
const cardStyle = {
  width: 750,
};
const imgStyle = {
  display: "block",
  width: 350,
  marginTop: 25,
  marginLeft: 20,
};

const Cards = ({ component }) => {
  return (
    <div style={{ marginTop: "3rem" }}>
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
          {component ? (
            <ErrorBoundary>
              <Signin />
            </ErrorBoundary>
          ) : (
            <Signup />
          )}
        </Flex>
      </Card>
    </div>
  );
};

export default Cards;
