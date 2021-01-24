import React, { useEffect } from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import styles from "../../Style/ReportABug.module.css";

export const ReportABug = () => {
  const data = useSelector((state) => state.bugReports.reports);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getReports());
  }, [dispatch]);

  return (
    <>
      <ContentHeader title="Reported bugs" />
      {data.map((x) => (
        <div className={styles.item} key={x.id}>
          <span>{x.message}</span>
          <span className={styles.contentRight}>
            Reported by: {x.creator},{" "}
            {x.created_at.slice(0, x.created_at.indexOf("T"))}
          </span>
        </div>
      ))}
    </>
  );
};
