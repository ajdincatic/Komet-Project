import * as actionTypes from "../actions/actionTypes";

const initialState = {
  reports: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BUG_REPORTS: {
      return {
        reports: action.reports,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
