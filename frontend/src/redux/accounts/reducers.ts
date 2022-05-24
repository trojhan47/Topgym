import actions from "./actions";

const initialState = {
  user: null,
  authorized: true, // default value
  ac: { grants: { some: true } },
  loading: {
    user: false,
    action: false,
  },
};

export default function accountReducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
