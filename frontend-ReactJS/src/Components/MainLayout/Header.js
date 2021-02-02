import React, { useState } from "react";
import * as actions from "../../store/actions/index";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AlertModal } from "../AlertModal";
import { Switch } from "../Switch";
import styles from "../../Style/Header.module.css";
import { reactRoutes } from "../../constants";
import { GiHamburgerMenu } from "react-icons/gi";

export const Header = ({ handler, handleChangeTheme, isDark }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => dispatch(actions.logout());

  return (
    <>
      {show && (
        <AlertModal
          message="Are you sure?"
          handleClose={handleClose}
          handleLogout={handleLogout}
        />
      )}
      <div className={styles.mainDiv}>
        <button className={styles.button} onClick={handler}>
          <GiHamburgerMenu />
          <span className={styles.sidebarText}>Toggle Sidebar</span>
        </button>

        <div className={styles.headerLinks}>
          <Switch handleChangeTheme={handleChangeTheme} isDark={isDark} />

          <div className={styles.link}>
            <Link to={reactRoutes.profile}>Profile</Link>
          </div>
          <div className={styles.link}>
            <Link onClick={handleShow}>Logout</Link>
          </div>
        </div>
      </div>
    </>
  );
};
