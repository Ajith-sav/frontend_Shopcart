import React, { useEffect, useState, useRef } from "react";
import { Input } from "antd";

import { useUser } from "../../contexts/UserContext";
import "../../styles/search.css";

const { Search } = Input;

const SearchQuery = ({ querySearch }) => {
  const { user } = useUser();
  const [query, setQuery] = useState();
  const [placeholder, setPlaceholder] = useState("Search for products");
  const inputRef = useRef(null);

  const placeholders = [
    "Search for products",
    "Find your favorite items",
    "What are you looking for?",
    "Search and discover!",
    "Explore new arrivals",
  ];

  const onSearch = (value) => {
    setQuery("");
    querySearch(value);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (user?.role == "customer") {
      const interval = setInterval(() => {
        setPlaceholder((pre) => {
          const currentIndex = placeholders.indexOf(pre);
          const nextIndex = (currentIndex + 1) % placeholders.length;
          return placeholders[nextIndex];
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [user?.role]);

  return (
    <div className="search-wrapper">
      <Search
        style={{ width: "500px" }}
        placeholder={`${placeholder}`}
        ref={inputRef}
        allowClear
        value={query}
        enterButton="Search"
        size={user?.role == "customer" ? "middle" : "large"}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={onSearch}
        className="search-input"
      />
    </div>
  );
};

export default SearchQuery;
