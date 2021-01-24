import * as actionTypes from "../actions/actionTypes";
import { endpoints } from "../../constants";
import axios from "axios";

const saveNotifications = (param) => {
  return {
    type: actionTypes.GET_NOTIFICATIONS,
    notifications: param,
  };
};

export const getNotifications = (res) => {
  return (dispatch) => {
    axios
      .get(endpoints.yourNotifications)
      .then((r) => {
        dispatch(saveNotifications(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};
