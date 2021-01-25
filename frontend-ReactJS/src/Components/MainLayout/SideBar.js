import { useSelector } from "react-redux";
import React from "react";
import { SideBarItem } from "./SideBarItem";
import { Link } from "react-router-dom";
import { userTypes, reactRoutes } from "../../constants";
import styles from "../../Style/Sidebar.module.css";

export const SideBar = ({ isActive, user }) => {
  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );
  return (
    <nav
      className={`${styles.sidebar} ${
        isActive ? styles.active : styles.nonActive
      }`}
    >
      <div className={styles.sidebarHeader}>
        <Link to={reactRoutes.dashboard}>
          <h3 className={styles.h3}>KOMET</h3>
        </Link>
      </div>
      <p className={styles.p}>Welcome {user}</p>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <SideBarItem title="News" route={reactRoutes.news} />
          <SideBarItem title="Events" route={reactRoutes.events} />
          <SideBarItem title="Forum" route={reactRoutes.forum} />
          {authData !== userTypes.administrator ? (
            <SideBarItem
              title="Report a bug"
              route={reactRoutes.addBugReport}
            />
          ) : (
            <SideBarItem title="Report a bug" route={reactRoutes.reportABug} />
          )}
          <SideBarItem
            title="Notifications"
            route={reactRoutes.notifications}
          />
          {authData === userTypes.administrator ? (
            <SideBarItem
              title="Media"
              subelements={[
                { title: "Show all photos", route: reactRoutes.allPhotos },
                { title: "Add a photo", route: reactRoutes.addPhoto },
                { title: "Show all videos", route: reactRoutes.allVideos },
                { title: "Add a video", route: reactRoutes.addVideo },
              ]}
            />
          ) : (
            <SideBarItem
              title="Media"
              subelements={[
                { title: "Show all photos", route: reactRoutes.allPhotos },
                { title: "Show all videos", route: reactRoutes.allVideos },
              ]}
            />
          )}
        </li>
      </ul>
    </nav>
  );
};
