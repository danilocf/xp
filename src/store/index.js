import { createStore } from "redux";

const INITIAL_STATE = {
  lala: [1, 2, 3],
  activeLala: null,
};

function reducer(state = INITIAL_STATE, action) {
  if (action.type === "SET_LALA_ACTIVE") {
    return { ...state, activeLala: action.lala };
  }
  return;
}

const store = createStore(reducer);

export default store;
