import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../Style/Sidebar.module.css";

export const SideBarItem = ({ subelements, route, title }) => {
  const activeStyle = {
    background: "#6d7fcc",
    fontWeight: "600",
  };
  const [submenuShow, setSubmenuShow] = useState(false);
  const handleSubmenu = () => setSubmenuShow(!submenuShow);

  if (subelements != null) {
    return (
      <div>
        <div onClick={handleSubmenu} className={styles.a}>
          {title}
          <span className={styles.submenuIcon}>
            <i className="fas fa-caret-down"></i>
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
                  to={"/" + element.route}
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
          to={"/" + route}
        >
          {title}
        </NavLink>
      </div>
    );
  }
};
