import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../Style/Sidebar.module.css";
import { MdArrowDropDown } from "react-icons/md";
import { activeStyle } from "../../constants";

export const SideBarItem = ({ subelements, route, title, clickEvent }) => {
  const [submenuShow, setSubmenuShow] = useState(false);
  const handleSubmenu = () => setSubmenuShow(!submenuShow);

  if (subelements != null) {
    return (
      <div>
        <div onClick={handleSubmenu} className={styles.a}>
          {title}
          <span className={styles.submenuIcon}>
            <MdArrowDropDown />
          </span>
        </div>
        <ul
          className={`${styles.toggledMenu} ${
            submenuShow && styles.activeMenu
          }`}
        >
          {subelements.map((element) => (
            <li key={element.title} className={styles.li}>
              <div>
                <NavLink
                  className={styles.a}
                  activeStyle={activeStyle}
                  to={element.route}
                  onClick={element.clickEvent}
                >
                  {element.title}
                </NavLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <NavLink
          className={styles.a}
          activeStyle={activeStyle}
          to={route}
          onClick={clickEvent}
        >
          {title}
        </NavLink>
      </div>
    );
  }
};
