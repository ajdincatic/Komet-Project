import * as actionTypes from "../actions/actionTypes";

const initialState = {
  notifications: [],
  activeNotificationIndex: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NOTIFICATIONS: {
      return {
        notifications: action.notifications,
        activeNotificationIndex: action.notifications[0].id,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
