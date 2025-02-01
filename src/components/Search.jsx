import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
const SearchQuery = () => (
  <Space direction="vertical">
    <Search
      placeholder="Search here"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  </Space>
);
export default SearchQuery;
