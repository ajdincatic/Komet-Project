import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authUser: {},
  isAuth: false,
  loginType: "",
  error: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_DATA: {
      return {
        ...state,
        authUser: action.authUser.data,
        isAuth: true,
        loginType: action.authUser.loginType,
        loading: false,
      };
    }
    case actionTypes.AUTH_DATA_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.AUTH_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.DISABLE_AUTH_ERROR: {
      return {
        ...state,
        error: "",
        loading: false,
      };
    }
    case actionTypes.LOGOUT: {
      return {
        authUser: {},
        isAuth: false,
        error: "",
      };
    }
    case actionTypes.GET_PROFILE_DATA: {
      return {
        ...state,
        authUser: {
          access_token: state.authUser.access_token,
          user: action.profileData,
        },
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
