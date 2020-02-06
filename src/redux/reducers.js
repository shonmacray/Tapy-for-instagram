const colorState = "#fff";

export const backgroundReducer = (state = colorState, action) => {
  switch (action.type) {
    case "SWITCH_COLOR":
      return (state = action.payload);
    default:
      return state;
  }
};
