const appState = {
  background: "#0078D7",
  following: "0",
  post: "hello",
  motion: 6,
  plans: [
    { name: "Thanks", selected: true },
    { name: "Post", selected: false }
  ],
  plan: "Thanks"
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
      let newState = { ...state };
      newState.plans.map(plan => {
        if (plan.selected === true) {
          newState.plan = "Thanks";
          plan.selected = false;
          return { ...plan };
        } else {
          newState.plan = "Post";
          plan.selected = true;
          return { ...plan };
        }
      });
      return newState;
    case "SET_POST":
      return { ...state, post: action.payload };
    default:
      return state;
  }
};
