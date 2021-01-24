import * as actionTypes from "../actions/actionTypes";

const initialState = {
  categories: [],
  topics: [],
  replies: [],
  loadingTopics: false,
  loadingReplies: false,
  title: "",
  question: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FORUM_CATEGORIES: {
      return {
        ...state,
        topics: [...state.topics],
        replies: [...state.replies],
        categories: action.categories,
      };
    }
    case actionTypes.GET_FORUM_TOPICS: {
      return {
        ...state,
        categories: [...state.categories],
        replies: [...state.replies],
        topics: action.topics,
        loadingTopics: false,
      };
    }
    case actionTypes.GET_FORUM_TOPICS_START: {
      return {
        ...state,
        categories: [...state.categories],
        replies: [...state.replies],
        topics: action.topics,
        loadingTopics: true,
      };
    }
    case actionTypes.CLEAR_TOPICS: {
      return {
        ...state,
        replies: [...state.replies],
        categories: [...state.categories],
        topics: [],
      };
    }
    case actionTypes.GET_TOPIC_REPLIES: {
      return {
        ...state,
        categories: [...state.categories],
        replies: action.replies,
        topics: [...state.topics],
        loadingReplies: false,
      };
    }
    case actionTypes.GET_TOPIC_REPLIES_START: {
      return {
        ...state,
        categories: [...state.categories],
        replies: action.replies,
        topics: [...state.topics],
        loadingReplies: true,
      };
    }
    case actionTypes.CLEAR_REPLIES: {
      return {
        ...state,
        replies: [],
        categories: [...state.categories],
        topics: [...state.topics],
      };
    }
    case actionTypes.SET_DATA_REPLY: {
      return {
        ...state,
        replies: [...state.replies],
        categories: [...state.categories],
        topics: [...state.topics],
        title: action.title,
        question: action.question,
      };
    }
    case actionTypes.ADD_REPLY: {
      return {
        ...state,
        replies: state.replies.concat(action.reply),
        categories: [...state.categories],
        topics: [...state.topics],
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
