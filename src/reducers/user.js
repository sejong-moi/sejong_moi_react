import * as type from "../actions/ActionTypes";

const userState = {
  userAuth: {},
};

const user = (state = userState, action = {}) => {
  switch (action.type) {
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        userAuth: { ...action.data }
      }

    default:
      return state;
  }
};


export default user;