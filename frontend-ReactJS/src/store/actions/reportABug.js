import * as actionTypes from "../actions/actionTypes";
import { endpoints } from "../../constants";
import axios from "axios";

const saveReports = (param) => {
  return {
    type: actionTypes.GET_BUG_REPORTS,
    reports: param,
  };
};

export const getReports = (res) => {
  return (dispatch) => {
    axios
      .get(endpoints.reportedBugs)
      .then((r) => {
        dispatch(saveReports(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};
