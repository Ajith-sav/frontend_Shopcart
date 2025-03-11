import React, { useCallback } from "react";
import SearchQuery from "./Search";
import { Button, message, Tooltip } from "antd";
import {
  ShoppingCartOutlined,
  UnorderedListOutlined,
  PhoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../../styles/customerNavbar.css";
import { useUser } from "../../contexts/UserContext";
import { signoutUser } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const {loading, setLoading} = useUser();
  const { user } = useUser();
  const userName = user?.username || "Guest";
  const firstLetter = userName.charAt(0).toUpperCase();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const refreshToken = localStorage.getItem("refresh");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/auth", { replace: true });
      if (refreshToken) {
        await signoutUser(refreshToken);
      }
    } catch (error) {
      message.error(error?.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <div className="header">
      <div className="column left">
        <Link to="/home" className="logo">
          ShopCart 🛒
        </Link>
      </div>
      <div className="column center">
        {user?.role == "customer" ? (
          <div className="top">
            <div className="nav-menu">
              <Link to="/about">About us</Link>
              <Link to="/contact">
                Contact <PhoneOutlined />
              </Link>
              <Link to="/wishlist">
                Wish list <UnorderedListOutlined />
              </Link>
              <Link to="/cart">
                Cart <ShoppingCartOutlined />
              </Link>
              <Link to="/blog">Blog</Link>
              <div className="dot"></div>
            </div>
          </div>
        ) : null}
        <div className="bottom">
          <SearchQuery querySearch={onSearch} />
        </div>
      </div>
      <div className="column right">
        <Tooltip title="Logout">
          <Button className="logout-btn" onClick={logout}>
            <LogoutOutlined /> Logout
          </Button>
        </Tooltip>
        <Tooltip title="Profile">
          <div className="circle">
            <p className="profile">{firstLetter}</p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
