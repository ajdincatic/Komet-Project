import React from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector } from "react-redux";
import GoogleMaps from "../GoogleMap";
import styles from "../../Style/Profile.module.css";

export const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const data = useSelector((state) => state.auth.authUser.user);

  return (
    <>
      <ContentHeader
        title="Profile"
        actionRoute="profile/edit"
        buttonText="Edit profile"
      />
      <div className={styles.mainContainer}>
        <div className={styles.leftDiv}>
          {auth.loginType === "GOOGLE" ? (
            <img className={styles.img} src={data.photo_path} alt="Admin"></img>
          ) : (
            <img
              className={styles.img}
              src={"http://komet-intern.qsd.ba" + data.photo_path}
              alt="Admin"
            ></img>
          )}
          <h4 className={styles.h4}>
            {data.first_name} {data.last_name}
          </h4>
          <p>{data.user_type_name}</p>
          {data.address != null && (
            <p>
              {data.address}, {data.country_name}
            </p>
          )}
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.el}>
            <h6 className={styles.h6}>Full Name</h6>
            <p className={styles.p}>
              {data.first_name} {data.last_name}
            </p>
          </div>
          <hr />
          <div className={styles.el}>
            <h6 className={styles.h6}>Phone number</h6>
            <p className={styles.p}>
              {data.phone != null ? data.phone : "N/A"}
            </p>
          </div>
          <hr />
          <div className={styles.el}>
            <h6 className={styles.h6}>Email</h6>
            <p className={styles.p}>{data.email}</p>
          </div>
          <hr />
          <div className={styles.el}>
            <h6 className={styles.h6}>Job title</h6>
            <p className={styles.p}>
              {data.job_title != null ? data.job_title : "N/A"}
            </p>
          </div>
          <hr />
          <div className={styles.el}>
            <h6 className={styles.h6}>Verified email?</h6>
            <p className={styles.p}>
              {data.email_verified_at != null || auth.loginType === "GOOGLE"
                ? "Verified"
                : "Not verified"}
            </p>
          </div>
          <hr />
        </div>
      </div>
      <div className={styles.map}>
        <GoogleMaps longitude={data.longitude} latitude={data.latitude} />
      </div>
    </>
  );
};
