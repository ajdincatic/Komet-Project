import React from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector } from "react-redux";
import { ProfileItem } from "./ProfileItem";
import GoogleMaps from "../GoogleMap";
import styles from "../../Style/Profile.module.css";
import { reactRoutes, apiURL } from "../../constants";

export const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const data = useSelector((state) => state.auth.authUser.user);

  return (
    <>
      <ContentHeader
        title="Profile"
        actionRoute={reactRoutes.editProfile}
        buttonText="Edit profile"
      />
      <div className={styles.mainContainer}>
        <div className={styles.leftDiv}>
          <img
            className={styles.img}
            src={
              auth.loginType === "GOOGLE"
                ? data.photo_path
                : apiURL + data.photo_path
            }
            alt="Admin"
          ></img>
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
          <ProfileItem
            label="Full Name"
            data={`${data.first_name} ${data.last_name}`}
          />
          <ProfileItem
            label="Phone number"
            data={`${data.phone != null ? data.phone : "N/A"}`}
          />
          <ProfileItem label="Email" data={data.email} />
          <ProfileItem
            label="Job title"
            data={`${data.job_title != null ? data.job_title : "N/A"}`}
          />
          <ProfileItem
            label="Verified email?"
            data={`${
              data.email_verified_at != null || auth.loginType === "GOOGLE"
                ? "Verified"
                : "Not verified"
            }`}
          />
        </div>
      </div>
      <div className={styles.map}>
        <GoogleMaps longitude={data.longitude} latitude={data.latitude} />
      </div>
    </>
  );
};
