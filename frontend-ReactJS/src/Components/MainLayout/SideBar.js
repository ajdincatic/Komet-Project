import { useSelector } from "react-redux";
import React from "react";
import { SideBarItem } from "./SideBarItem";
import { Backdrop } from "../Backdrop";
import { Link } from "react-router-dom";
import { userTypes, reactRoutes } from "../../constants";
import styles from "../../Style/Sidebar.module.css";

export const SideBar = ({
  sidebarToogle,
  user,
  showBackdrop,
  handleBackdropClick,
  handleSidebarItemClick,
}) => {
  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );

  return (
    <>
      <Backdrop show={showBackdrop} clickEvent={handleBackdropClick} />
      <nav
        className={`${styles.sidebar} ${
          sidebarToogle ? styles.active : styles.nonActive
        }`}
      >
        <div className={styles.sidebarHeader} onClick={handleSidebarItemClick}>
          <Link to={reactRoutes.dashboard}>
            <h3 className={styles.h3}>KOMET</h3>
          </Link>
        </div>
        <p className={styles.p}>Welcome {user}</p>

        <ul className={styles.ul}>
          <li className={styles.li}>
            <SideBarItem
              title="News"
              route={reactRoutes.news}
              clickEvent={handleSidebarItemClick}
            />
            <SideBarItem
              title="Events"
              route={reactRoutes.events}
              clickEvent={handleSidebarItemClick}
            />
            <SideBarItem
              title="Forum"
              route={reactRoutes.forum}
              clickEvent={handleSidebarItemClick}
            />
            {authData !== userTypes.administrator ? (
              <SideBarItem
                title="Report a bug"
                route={reactRoutes.addBugReport}
                clickEvent={handleSidebarItemClick}
              />
            ) : (
              <SideBarItem
                title="Report a bug"
                route={reactRoutes.reportABug}
                clickEvent={handleSidebarItemClick}
              />
            )}
            <SideBarItem
              title="Notifications"
              route={reactRoutes.notifications}
              clickEvent={handleSidebarItemClick}
            />
            {authData === userTypes.administrator ? (
              <SideBarItem
                title="Media"
                subelements={[
                  {
                    title: "Show all photos",
                    route: reactRoutes.allPhotos,
                    clickEvent: handleSidebarItemClick,
                  },
                  {
                    title: "Add a photo",
                    route: reactRoutes.addPhoto,
                    clickEvent: handleSidebarItemClick,
                  },
                  {
                    title: "Show all videos",
                    route: reactRoutes.allVideos,
                    clickEvent: handleSidebarItemClick,
                  },
                  {
                    title: "Add a video",
                    route: reactRoutes.addVideo,
                    clickEvent: handleSidebarItemClick,
                  },
                ]}
              />
            ) : (
              <SideBarItem
                title="Media"
                subelements={[
                  {
                    title: "Show all photos",
                    route: reactRoutes.allPhotos,
                    clickEvent: handleSidebarItemClick,
                  },
                  {
                    title: "Show all videos",
                    route: reactRoutes.allVideos,
                    clickEvent: handleSidebarItemClick,
                  },
                ]}
              />
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};
