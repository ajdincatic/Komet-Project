import * as actionTypes from "../actions/actionTypes";
import { endpoints } from "../../constants";
import axios from "axios";

export const addNewsType = (param) => {
  return {
    type: actionTypes.ADD_NEWS_TYPE,
    newsType: param,
  };
};

export const addNewsSubfolder = (param) => {
  return {
    type: actionTypes.ADD_NEWS_SUBFOLDER,
    subfolder: param,
  };
};

const saveNewsTypes = (param) => {
  return {
    type: actionTypes.GET_NEWS_TYPES,
    newsTypes: param,
  };
};

export const getNewsTypes = (res) => {
  return (dispatch) => {
    axios
      .get(endpoints.newsTypes)
      .then((r) => {
        dispatch(saveNewsTypes(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};

export const clearSubfolders = () => {
  return {
    type: actionTypes.CLEAR_SUBFOLDERS,
  };
};

export const clearNews = () => {
  return {
    type: actionTypes.CLEAR_NEWS,
  };
};

const getNewsSubfoldersStart = () => {
  return {
    type: actionTypes.GET_NEWS_SUBFOLDERS_START,
  };
};

const saveNewsSubfolders = (param) => {
  return {
    type: actionTypes.GET_NEWS_SUBFOLDERS,
    newsSubfolders: param,
  };
};

export const getNewsSubfolders = (id) => {
  let uri = "news/type/" + id + "/subfolders";
  return (dispatch) => {
    dispatch(getNewsSubfoldersStart());
    axios
      .get(uri)
      .then((r) => {
        dispatch(saveNewsSubfolders(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};

const getNewsStart = () => {
  return {
    type: actionTypes.GET_NEWS_START,
  };
};

const saveNews = (param) => {
  return {
    type: actionTypes.GET_NEWS,
    news: param,
  };
};

export const getNews = (id) => {
  let uri = "news/subfolder/" + id + "/news";
  return (dispatch) => {
    dispatch(getNewsStart());
    axios
      .get(uri)
      .then((r) => {
        dispatch(saveNews(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};
