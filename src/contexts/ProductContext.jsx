import React, { createContext, useContext, useState } from "react";
import { message } from "antd"; // Ensure message is imported
import { searchProducts } from "../services/api";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const searchAction = async (value) => {
    try {
      const response = await searchProducts(value);
      setProducts(response.data);
    } catch (error) {
      message.error(
        error?.response?.data?.detail || "Failed to search products"
      );
    }
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, searchAction }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { ProductContext, ProductProvider, useProduct };
export default ProductProvider;
