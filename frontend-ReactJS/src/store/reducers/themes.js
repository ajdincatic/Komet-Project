import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isDark: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME: {
      return {
        isDark: action.isDark,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
