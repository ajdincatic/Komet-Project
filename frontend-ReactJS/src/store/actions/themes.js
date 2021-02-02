import * as actionTypes from "../actions/actionTypes";

export const changeTheme = (isDark) => {
  return {
    type: actionTypes.CHANGE_THEME,
    isDark: isDark,
  };
};
