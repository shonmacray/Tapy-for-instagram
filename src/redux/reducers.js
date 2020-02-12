const appState = {
  background: "#0078D7",
  following: "0",
  motion: 6
};

export const appReducer = (state = appState, action) => {
  switch (action.type) {
    case "SWITCH_COLOR":
      return { ...state, background: action.payload };
    case "UPDATE_FOLLOWING":
      return { ...state, following: action.payload };
    case "CHANG_DECO":
      return { ...state, motion: action.payload };
    default:
      return state;
  }
};
