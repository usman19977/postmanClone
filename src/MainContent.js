import React, { useState } from "react";
import { Tabs, Input, Form, Button, Select } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Option } = Select;

const MainContent = () => {
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [queryParams, setQueryParams] = useState([{ key: "", value: "" }]);

  const handleHeaderChange = (index, key, value) => {
    const newHeaders = [...headers];
    newHeaders[index][key] = value;
    setHeaders(newHeaders);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleRemoveHeader = (index) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  const handleQueryParamChange = (index, key, value) => {
    const newQueryParams = [...queryParams];
    newQueryParams[index][key] = value;
    setQueryParams(newQueryParams);
  };

  const handleAddQueryParam = () => {
    setQueryParams([...queryParams, { key: "", value: "" }]);
  };

  const handleRemoveQueryParam = (index) => {
    const newQueryParams = [...queryParams];
    newQueryParams.splice(index, 1);
    setQueryParams(newQueryParams);
  };

  return (
 <></>
  );
};

export default MainContent;
