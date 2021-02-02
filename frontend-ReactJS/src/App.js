import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Wrapper } from "./Components/MainLayout/Wrapper";
import { Routes } from "./Components/Routes";
import { LoginRoutes } from "./Components/LoginRoutes";
import { useSelector, useDispatch } from "react-redux";
import { SideBar } from "./Components/MainLayout/SideBar";
import { Content } from "./Components/MainLayout/Content";
import * as actions from "./store/actions/index";
import { useMediaQuery } from "react-responsive";
import "./App.css";
import "./Colors.css";
import axios from "axios";

const DARK_CLASS = "dark";

export const App = () => {
  const [sidebarToogle, setSidebarToogle] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const data = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (prefersDark) => {
      setIsDark(prefersDark);
    }
  );

  const [isDark, setIsDark] = useState(
    theme.isDark === null ? systemPrefersDark : theme.isDark
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
    dispatch(actions.changeTheme(isDark));
  }, [isDark, dispatch]);

  const handleChangeTheme = () => {
    setIsDark((prevState) => !prevState);
    dispatch(actions.changeTheme(isDark));
  };

  const handleBackdropClick = () => {
    setShowBackdrop(false);
    setSidebarToogle(true);
  };

  const handleSidebarItemClick = () => {
    window.innerWidth <= 900 && handleBackdropClick();
  };

  const toogleMenu = () => {
    window.innerWidth <= 900
      ? setSidebarToogle(false)
      : setSidebarToogle((prevState) => !prevState);
    setShowBackdrop(true);
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
          sidebarToogle={sidebarToogle}
          showBackdrop={showBackdrop}
          handleBackdropClick={handleBackdropClick}
          handleSidebarItemClick={handleSidebarItemClick}
          user={`${data.authUser.user.first_name} ${data.authUser.user.last_name}`}
        />
        <Content
          sidebarToogle={sidebarToogle}
          handleChangeTheme={handleChangeTheme}
          isDark={isDark}
          handler={toogleMenu}
        >
          <Routes />
        </Content>
      </Router>
    </Wrapper>
  );
};
