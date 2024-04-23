import * as types from "./ActionTypes";

        const intialState = {
          isLoading: false,
          data: [],
          count:0
        };

 export const Reducer = (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {

    case types.INCRSECOUNT:
        return {
          ...state,
          isLoading: true,
          count:state.count+1
        };

    case types.GetREQ:
      return {
        ...state,
        isLoading: true,
      };
    case types.GetSuccess:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
      case types.GetFailure:
        return {
          ...state,
          isLoading: true,
         
        };

    default:
      return state;
  }
};
