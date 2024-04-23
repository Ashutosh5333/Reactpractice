import * as types from "./actiontypes";
const initialState = {
  isloading: false,
  Data: [],
  count: 0,
};
export const Reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case types.INCRESCOUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case types.LOGINREQ:
      return {
        ...state,
        isloading: true,
      };
    case types.LOGINSUCESS:
      return {
        ...state,
        isloading: false,
        Data: payload,
      };
    case types.LOGINREFAILURE:
      return {
        ...state,
        isloading: false,
        Data: [],
      };
    default:
      return state;
  }
} ;
