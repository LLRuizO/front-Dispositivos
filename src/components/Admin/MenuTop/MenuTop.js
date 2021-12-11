import React from "react";
import { Button, Icon } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { PoweroffOutlined } from "@ant-design/icons";
import logo from "../../../assets/img/png/logo-white-2.jpg";

import "./MenuTop.scss";

export default function MenuTop(props){
    const { menuCollapsed, setMenuCollapsed } = props;
    return(
        <div className="menu-top">
            <div className="menu-top__left">
                <img
                    className="menu-top__left-logo"
                    src={ logo }
                    alt="Wilson Espitia logo"
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                        <MenuFoldOutlined type={menuCollapsed ? "menu-unfold" : "menu-fold"}/>
                </Button>
            </div>
            <div className = "menu-top__right">
                <Button type="link" onClick={() => console.log("Cerrar")}>
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
}