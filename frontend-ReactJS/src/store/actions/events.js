import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import { endpoints } from "../../constants";

const saveEvents = (events) => {
  return {
    type: actionTypes.GET_EVENTS,
    events: events,
  };
};

export const getEvents = (res) => {
  return (dispatch) => {
    axios
      .get(endpoints.events)
      .then((r) => {
        dispatch(saveEvents(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};
