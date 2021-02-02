import React, { useEffect, useState } from "react";
import { ErrorModal } from "./ErrorModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { ContentHeader } from "./ContentHeader";
import styles from "../Style/Dashboard.module.css";
import { Chart } from "./Chart";
import { endpoints } from "../constants";

export const Dashboard = () => {
  const [usersData, setUsersData] = useState({});
  const [employeesData, setEmployeesData] = useState({});
  const [administratorsData, setAdministratorsData] = useState({});
  const [error, setError] = useState(false);
  const theme = useSelector((state) => state.theme);

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
                data: [temp.precent_of_users.toFixed(1)],
                backgroundColor: "orange",
                hoverBackgroundColor: "rgb(196, 127, 1)",
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
                data: [temp.precent_of_employees.toFixed(1)],
                backgroundColor: "green",
                hoverBackgroundColor: "rgb(1, 90, 1)",
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
                data: [temp.precent_of_administrators.toFixed(1)],
                backgroundColor: "brown",
                hoverBackgroundColor: "rgb(124, 31, 31)",
              },
            ],
          },
        });
      })
      .catch(() => {
        setError(true);
      });
  }, []);

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
        <Chart dataset={usersData.datasets} theme={theme} />
        <Chart dataset={employeesData.datasets} theme={theme} />
        <Chart dataset={administratorsData.datasets} theme={theme} />
      </div>
      <div className={styles.footer}>
        &copy; QSD BIH Internship project - 2020/2021
      </div>
    </>
  );
};
