import { useSelector } from "react-redux";
import React from "react";
import { SideBarItem } from "./SideBarItem";
import { Link } from "react-router-dom";
import { userTypes } from "../../constants";
import styles from "../../Style/Sidebar.module.css";

export const SideBar = ({ isActive, user }) => {
  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );
  const active = isActive ? styles.active : styles.nonActive;
  return (
    <nav className={styles.sidebar + " " + active}>
      <div className={styles.sidebarHeader}>
        <Link to="/">
          <h3 className={styles.h3}>KOMET</h3>
        </Link>
      </div>
      <p className={styles.p}>Welcome {user}</p>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <SideBarItem title="News" route="news" />
          <SideBarItem title="Events" route="events" />
          <SideBarItem title="Forum" route="forum" />
          {authData !== userTypes.administrator ? (
            <SideBarItem title="Report a bug" route="reportABug/add" />
          ) : (
            <SideBarItem title="Report a bug" route="reportABug" />
          )}
          <SideBarItem title="Notifications" route="notifications" />
          {authData === userTypes.administrator ? (
            <SideBarItem
              title="Media"
              route="media"
              subelements={[
                { title: "Show all photos", route: "allPhotos" },
                { title: "Add a photo", route: "addPhoto" },
                { title: "Show all videos", route: "allVideos" },
                { title: "Add a video", route: "addVideo" },
              ]}
            />
          ) : (
            <SideBarItem
              title="Media"
              route="media"
              subelements={[
                { title: "Show all photos", route: "allPhotos" },
                { title: "Show all videos", route: "allVideos" },
              ]}
            />
          )}
        </li>
      </ul>
    </nav>
  );
};
