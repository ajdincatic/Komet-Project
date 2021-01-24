import * as actionTypes from "../actions/actionTypes";
import { endpoints } from "../../constants";
import axios from "axios";

export const addReply = (param) => {
  return {
    type: actionTypes.ADD_REPLY,
    reply: param,
  };
};

export const saveCategories = (param) => {
  return {
    type: actionTypes.GET_FORUM_CATEGORIES,
    categories: param,
  };
};

export const getCategories = (res) => {
  return (dispatch) => {
    axios
      .get(endpoints.forumCategories)
      .then((r) => {
        dispatch(saveCategories(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};

const getTopicsStart = (param) => {
  return {
    type: actionTypes.GET_FORUM_TOPICS_START,
  };
};

const saveTopics = (param) => {
  return {
    type: actionTypes.GET_FORUM_TOPICS,
    topics: param,
  };
};

export const getTopics = (id) => {
  return (dispatch) => {
    dispatch(getTopicsStart());
    axios
      .get("/forum/category/" + id + "/topics")
      .then((r) => {
        dispatch(saveTopics(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};

export const clearTopics = () => {
  return {
    type: actionTypes.CLEAR_TOPICS,
  };
};

const getRepliesStart = (param) => {
  return {
    type: actionTypes.GET_TOPIC_REPLIES_START,
  };
};

const saveReplies = (param) => {
  return {
    type: actionTypes.GET_TOPIC_REPLIES,
    replies: param,
  };
};

export const getReplies = (id) => {
  return (dispatch) => {
    dispatch(getRepliesStart());
    axios
      .get("/forum/topics/" + id + "/replies")
      .then((r) => {
        dispatch(saveReplies(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};

export const clearReplies = () => {
  return {
    type: actionTypes.CLEAR_REPLIES,
  };
};

export const setDataReply = (title, question) => {
  return {
    type: actionTypes.SET_DATA_REPLY,
    title: title,
    question: question,
  };
};
