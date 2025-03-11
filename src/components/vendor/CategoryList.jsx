import React, { useEffect, useState } from "react";
import { List, Typography, Spin } from "antd";
import { fetchCategory } from "../../services/api";
import { useUser } from "../../contexts/UserContext";

const CategoryList = ({ refresh }) => {
  const [categories, setCategories] = useState([]);
  const { loading, setLoading } = useUser();

  const fetchCategories = async () => {
    try {
      const response = await fetchCategory();
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        // console.error("Expected an array but got:", response.data);
        setCategories([]);
      }
    } catch (error) {
      // console.error("Failed to fetch categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refresh]);

  if (loading) {
    return <Spin />; // Show a loading spinner while fetching data
  }

  return (
    <List
      header={<Typography.Title level={4}>Categories</Typography.Title>}
      bordered
      style={{
        maxHeight: "550px",
        overflowY: "auto",
      }}
      dataSource={categories}
      renderItem={(item) => <List.Item>{item.name}</List.Item>}
    />
  );
};

export default CategoryList;
