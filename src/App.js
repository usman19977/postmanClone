import React, { useRef, useState } from "react";
import { Button, Tabs } from "antd";

import { Breadcrumb, Layout, Menu, theme, Tree } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import MainContent from "./MainContent";
const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: `Tab ${id}`,
    children: `Content of Tab Pane ${index + 1}`,
    key: id,
  };
});
const { Header, Content, Sider } = Layout;
const { DirectoryTree } = Tree;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items2 = [
  getItem("Collections", "1", <MailOutlined style={{ fontSize: "20px" }} />),
  getItem("History", "2", <CalendarOutlined style={{ fontSize: "20px" }} />),
];
const treeData = [
  {
    title: "APEX",
    key: "0-0",
    children: [
      {
        title: "GET PRODUCTS",
        key: "0-0-0",
        isLeaf: true,
      },
      {
        title: "POST PRODUCT",
        key: "0-0-1",
        isLeaf: true,
      },
    ],
  },
  {
    title: "JOOR V4",
    key: "0-1",
    children: [
      {
        title: "GET PRODUCT",
        key: "0-1-0",
        isLeaf: true,
      },
      {
        title: "POST PRODUCT",
        key: "0-1-1",
        isLeaf: true,
      },
    ],
  },
];
const initialItems = [
  {
    label: "Untitled Request",
    children: <MainContent />,
    key: "1",
  },
];
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const onSelect = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };
  const onExpand = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: "Untitled Request",
      children: <MainContent />,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#001529", // Example background color
          color: "#fff",
          width: "100%",
        }}
      >
        <h1>NS API</h1>
      </Header>
      <Layout>
        <Sider
          className="sidebar"
          width={400}
          style={{
            background: colorBgContainer,
          }}
        >
          <div style={{ width: "25%" }}>
            <Menu
              className="f3IconMenu"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={items2}
            />
          </div>
          <div>
            <DirectoryTree
              multiple
              defaultExpandAll
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={treeData}
            />
          </div>
        </Sider>
        <Layout
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: "calc(100vh - 30px)", // Adjust for header height
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowX: "hidden", // Hide horizontal overflow
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            <Tabs
              type="editable-card"
              onChange={onChange}
              activeKey={activeKey}
              onEdit={onEdit}
              items={items}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
