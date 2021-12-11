import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "./LayoutBasic.scss";

export default function LayoutBasic(props){
    const { routes } = props; //Para traernos todo el sistema de rutas de props
    const { Content } = Layout; //Igual que el panel de LayoutAdmin, solo que aquí no usamos Header

    return(
        <Layout>
            <Content>
                <LoadRoutes routes={routes}/> 
            </Content>
        </Layout>
    );
}

function LoadRoutes({ routes }){//Aquí generamos toda las funciones para las rutas fijas
    return (
        <Switch>
            {routes.map((route, index)=>( //Aquí tenemos la ruta e index de cada ruta
              <Route
                key={index}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
        </Switch>
    );
}