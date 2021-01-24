import * as actionTypes from "../actions/actionTypes";
import { endpoints } from "../../constants";
import axios from "axios";

const getMediasStart = (param) => {
  return {
    type: actionTypes.GET_MEDIAS_START,
  };
};

const savePhotos = (photos) => {
  return {
    type: actionTypes.GET_PHOTOS,
    photos: photos,
  };
};

const saveVideos = (videos) => {
  return {
    type: actionTypes.GET_VIDEOS,
    videos: videos,
  };
};

export const getPhotos = (photos) => {
  return (dispatch) => {
    dispatch(getMediasStart());
    axios
      .get(endpoints.photos)
      .then((r) => {
        dispatch(savePhotos(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};

export const getVideos = (res) => {
  return (dispatch) => {
    dispatch(getMediasStart());
    axios
      .get(endpoints.videos)
      .then((r) => {
        dispatch(saveVideos(r.data));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
};
