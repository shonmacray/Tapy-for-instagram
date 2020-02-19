const appState = {
  background: "#8764B8",
  following: "0",
  post: "hello",
  motion: 6,
  plans: [
    { name: "Thanks", selected: true },
    { name: "Post", selected: false }
  ]
};

export const appReducer = (state = appState, action) => {
  switch (action.type) {
    case "SWITCH_COLOR":
      return { ...state, background: action.payload };
    case "UPDATE_FOLLOWING":
      return { ...state, following: action.payload };
    case "CHANG_DECO":
      return { ...state, motion: action.payload };
    case "SELECT_PLAN":
      const plans = state.plans.map(plan => {
        if (action.payload.plan.name === plan.name) {
          plan.selected = true;
        } else {
          plan.selected = false;
        }
        return plan;
      });
      return { ...state, plans };
    case "SET_POST":
      return { ...state, post: action.payload };
    default:
      return state;
  }
};
