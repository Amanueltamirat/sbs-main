import { createContext, useReducer } from "react";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_SIGNIN":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
      };
     case "REMOVE_USER": {
      const users = state.userInfo.filter(
        (user) => user._id !== action.payload._id
      );
      localStorage.setItem("userInfo", JSON.stringify(users));
      return { ...state, userInfo:users};
    }
    default:
      return state;
  }
};

export const Store = createContext();
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
