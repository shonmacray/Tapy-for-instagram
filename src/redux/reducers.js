const appState = {
  background: "#00CC6A",
  following: "100"
};

export const appReducer = (state = appState, action) => {
  switch (action.type) {
    case "SWITCH_COLOR":
      return { ...state, background: action.payload };
    case "UPDATE_FOLLOWING":
      return { ...state, following: action.payload };
    default:
      return state;
  }
};
