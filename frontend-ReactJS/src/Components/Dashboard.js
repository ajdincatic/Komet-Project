import React, { useEffect, useState } from "react";
import { ErrorModal } from "./ErrorModal";
import axios from "axios";
import { ContentHeader } from "./ContentHeader";
import styles from "../Style/Dashboard.module.css";
import { Chart } from "./Chart";
import { endpoints } from "../constants";

export const Dashboard = () => {
  const [usersData, setUsersData] = useState({});
  const [employeesData, setEmployeesData] = useState({});
  const [administratorsData, setAdministratorsData] = useState({});

  useEffect(() => {
    axios
      .get(endpoints.dashboard)
      .then((r) => {
        let temp = r.data.users_precentage_graph_data;
        setUsersData({
          datasets: {
            labels: ["Users"],
            datasets: [
              {
                label: "% of users",
                data: [temp.precent_of_users],
                backgroundColor: "#74B649",
                borderColor: "#74B649",
                hoverBackgroundColor: "#75FDB5",
                hoverBorderColor: "#75FDB5",
              },
            ],
          },
        });
        setEmployeesData({
          datasets: {
            labels: ["Employees"],
            datasets: [
              {
                label: "% of employees",
                data: [temp.precent_of_employees],
                backgroundColor: "#d3d11a",
                borderColor: "#74B649",
                hoverBackgroundColor: "#75FDB5",
                hoverBorderColor: "#75FDB5",
              },
            ],
          },
        });
        setAdministratorsData({
          datasets: {
            labels: ["Administrators"],
            datasets: [
              {
                label: "% of administrators",
                data: [temp.precent_of_administrators],
                backgroundColor: "#6dd3c5",
                borderColor: "#74B649",
                hoverBackgroundColor: "#75FDB5",
                hoverBorderColor: "#75FDB5",
              },
            ],
          },
        });
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  const [error, setError] = useState(false);
  const handleErrorState = () => setError(false);

  return (
    <>
      {error && (
        <ErrorModal
          message="Can not load chart right now."
          handleErrorState={handleErrorState}
        />
      )}
      <ContentHeader title="Dashboard" />
      <div className={styles.charts}>
        <Chart dataset={usersData.datasets} />
        <Chart dataset={employeesData.datasets} />
        <Chart dataset={administratorsData.datasets} />
      </div>
      <div className={styles.footer}>
        &copy; QSD BIH Internship project - 2020/2021
      </div>
    </>
  );
};
