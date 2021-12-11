import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from "./config/routes";
import { Auth0Provider } from "@auth0/auth0-react";

import "./App.scss";

function App(){
  return (
    <Auth0Provider 
    domain="misiontic-sprintmasters.us.auth0.com"
    clientId="Tq4zz4S5fhoR1z0LBIqsfihvkWGpuHsJ"
    redirectUri={window.location.origin}
    audience="https://misiontic-sprintmasters.us.auth0.com/api/v2/"
    >
    
      <Router>
              <Switch>
                {routes.map((route, index) => (
                  <RouteWithSubRoutes key={index}{...route}/>
                ))}
              </Switch>
      </Router>
    </Auth0Provider>
    
  );
}

function RouteWithSubRoutes(route){
  console.log(route);
  return (
    <Route 
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes}{...props}/>}
    />
  )
}
 
export default App;