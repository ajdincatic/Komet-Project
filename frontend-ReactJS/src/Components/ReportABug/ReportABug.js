import React, { useEffect } from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { ItemsList } from "../ItemsList";

export const ReportABug = () => {
  const data = useSelector((state) => state.bugReports.reports);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getReports());
  }, [dispatch]);

  return (
    <>
      <ContentHeader title="Reported bugs" />
      <ItemsList
        data={data}
        content="message"
        labelRight="Reported by"
        rightContent="creator"
        created_at="created_at"
      />
    </>
  );
};
