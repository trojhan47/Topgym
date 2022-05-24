import actions from "./actions";

const initialState = {
  user: null,
  authorized: false, //default value
  loading: {
    user: false,
    action: false,
  },
};

export default function settingsReducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
