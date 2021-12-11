  import React from "react";
  import { Link } from "react-router-dom";
  import { Layout, Menu, Icon } from "antd";
  import { HomeOutlined } from "@ant-design/icons";
  import { MenuFoldOutlined } from "@ant-design/icons";

  import "./MenuSider.scss";

  export default function MenuSider(props){
      const { menuCollapsed } = props;
      const { Sider } = Layout;
      return(
          <Sider className="admin-sider" collapsed={menuCollapsed}>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                  <Menu.Item key="1">
                        <Link to={"/admin"}>
                            <MenuFoldOutlined type="home"/>
                            <span className="nav-text">Home</span>
                        </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                        <Link to={"/admin/menu-web"}>
                            <HomeOutlined type="menu"/>
                            <span className="nac-text">Menu Web</span>
                        </Link>
                  </Menu.Item>
              </Menu>
          </Sider>
      )
  }