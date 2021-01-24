import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Wrapper } from "./Components/MainLayout/Wrapper";
import { Routes } from "./Components/Routes";
import { LoginRoutes } from "./Components/LoginRoutes";
import { useSelector } from "react-redux";
import { SideBar } from "./Components/MainLayout/SideBar";
import { Content } from "./Components/MainLayout/Content";
import axios from "axios";

function App() {
  const data = useSelector((state) => state.auth);

  const [sidebarActive, setsidebarActive] = useState(true);
  const [contentActive, setcontentActive] = useState(false);

  const toogleMenu = () => {
    setsidebarActive(!sidebarActive);
    setcontentActive(!contentActive);
  };

  if (!data.isAuth) {
    return <LoginRoutes />;
  } else {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.authUser.access_token}`;
  }

  return (
    <Wrapper>
      <Router>
        <SideBar
          isActive={sidebarActive}
          user={
            data.authUser.user.first_name + " " + data.authUser.user.last_name
          }
        />
        <Content isActive={contentActive} handler={toogleMenu}>
          <Routes />
        </Content>
      </Router>
    </Wrapper>
  );
}

export default App;
