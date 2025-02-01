import React from "react";
import { Button, Layout, Menu, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import SearchQuery from "./Search";
import { signoutUser } from "../services/api";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        const response = await signoutUser(refreshToken)
        if (response.status == 200) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          navigate("auth/");
        }
      }
    } catch (error) {
      // console.log(error);
      message.error(error.message);
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <Header className="header">
        <div className="logo" style={{ color: "white", fontSize: "24px" }}>
          ShopCart 🛒
        </div>
        <div className="search" style={{ marginTop: "10px" }}>
          <SearchQuery />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Button
            className="primary"
            style={{
              marginTop: "1rem",
              backgroundColor: "#1677ff",
              color: "#ffff",
              fontWeight: 500,
              border: "None",
            }}
            onClick={logout}
          >
            LogOut
          </Button>
        </Menu>
      </Header>
    </div>
  );
};

export default Navbar;
