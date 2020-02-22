const appState = {
  background: "#131418",
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

const userState = {
  username: null,
  followingCount: null,
};

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return {...state, ...action.payload};
    case "CLEAR_USERNAME":
      return { ...userState };
    default:
      return state;
  }
};
