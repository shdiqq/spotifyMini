import { reducerCases } from "./Constant";

export const initialState = {
  accessToken: null,
  userInfo: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_ACCESSTOKEN: {
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }
    case reducerCases.SET_USER: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    default:
      return state;
  }
};

export default reducer;