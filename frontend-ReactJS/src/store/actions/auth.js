import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import { endpoints } from "../../constants";

const saveData = (data, loginType) => {
  return {
    type: actionTypes.AUTH_DATA,
    authUser: { data: data, loginType: loginType },
  };
};

const errorData = (data) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: data,
  };
};

export const disableErrorData = (data) => {
  return {
    type: actionTypes.DISABLE_AUTH_ERROR,
  };
};

const getDataStart = () => {
  return {
    type: actionTypes.AUTH_DATA_START,
  };
};

export const getData = (data, url, loginType = "") => {
  return (dispatch) => {
    dispatch(getDataStart());
    axios
      .post(url, data)
      .then((r) => {
        dispatch(saveData(r.data, loginType));
      })
      .catch((error) => {
        dispatch(errorData("Wrong username or password. Please try again."));
      });
  };
};

export const logout = (data) => {
  return {
    type: actionTypes.LOGOUT,
  };
};

const saveProfileData = (param) => {
  return {
    type: actionTypes.GET_PROFILE_DATA,
    profileData: param,
  };
};

export const getProfileData = (res) => {
  return (dispatch) => {
    axios
      .get(endpoints.yourProfile)
      .then((r) => {
        dispatch(saveProfileData(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};
