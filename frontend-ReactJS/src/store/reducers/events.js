import * as actionTypes from "../actions/actionTypes";

const initialState = {
  events: [],
  activeEventIndex: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EVENTS: {
      return {
        events: action.events,
        activeEventIndex: action.events[0].id,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
