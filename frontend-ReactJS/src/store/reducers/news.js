import * as actionTypes from "../actions/actionTypes";

const initialState = {
  newsTypes: [],
  newsSubfolders: [],
  news: [],
  loadingSubfolders: false,
  loadingNews: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NEWS_TYPES: {
      return {
        ...state,
        newsSubfolders: [...state.newsSubfolders],
        news: [...state.news],
        newsTypes: action.newsTypes,
      };
    }
    case actionTypes.GET_NEWS_SUBFOLDERS_START: {
      return {
        ...state,
        newsTypes: [...state.newsTypes],
        newsSubfolders: [...state.newsSubfolders],
        news: [...state.news],
        loadingSubfolders: true,
      };
    }
    case actionTypes.GET_NEWS_SUBFOLDERS: {
      return {
        ...state,
        newsTypes: [...state.newsTypes],
        newsSubfolders: action.newsSubfolders,
        news: [...state.news],
        loadingSubfolders: false,
      };
    }
    case actionTypes.CLEAR_SUBFOLDERS: {
      return {
        ...state,
        newsTypes: [...state.newsTypes],
        newsSubfolders: [],
        news: [...state.news],
        loadingSubfolders: false,
      };
    }
    case actionTypes.ADD_NEWS_TYPE: {
      return {
        ...state,
        newsSubfolders: [...state.newsSubfolders],
        news: [...state.news],
        newsTypes: state.newsTypes.concat(action.newsType),
      };
    }
    case actionTypes.ADD_NEWS_SUBFOLDER: {
      return {
        ...state,
        news: [...state.news],
        newsTypes: [...state.newsTypes],
        newsSubfolders: state.newsSubfolders.concat(action.subfolder),
      };
    }
    case actionTypes.GET_NEWS: {
      return {
        ...state,
        news: action.news,
        newsTypes: [...state.newsTypes],
        newsSubfolders: [...state.newsSubfolders],
        loadingNews: false,
      };
    }
    case actionTypes.GET_NEWS_START: {
      return {
        ...state,
        newsTypes: [...state.newsTypes],
        newsSubfolders: [...state.newsSubfolders],
        news: [...state.news],
        loadingNews: true,
      };
    }
    case actionTypes.CLEAR_NEWS: {
      return {
        ...state,
        newsTypes: [...state.newsTypes],
        newsSubfolders: [...state.newsSubfolders],
        news: [],
        loadingNews: false,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
