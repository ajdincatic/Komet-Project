import * as actionTypes from "../actions/actionTypes";

const initialState = {
  photos: [],
  videos: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PHOTOS: {
      return {
        ...state,
        videos: [...state.videos],
        photos: action.photos,
        loading: false,
      };
    }
    case actionTypes.GET_VIDEOS: {
      return {
        ...state,
        photos: [...state.photos],
        videos: action.videos,
        loading: false,
      };
    }
    case actionTypes.GET_MEDIAS_START: {
      return {
        ...state,
        photos: [...state.photos],
        videos: [...state.videos],
        loading: true,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
