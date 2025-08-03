import axios from "axios";
import * as Types from "./ActionTypes";
import { Type } from "lucide-react";

const getdatareq = () => {
  return {
    type: Types.GetREQ,
  };
};

const getdatasuccess = (payload) => {
  return {
    type: Types.GetSuccess,
    payload,
  };
};

const getdatafailure = () => {
  return {
    type: Types.GetFailure,
  };
};

export const getincrsecount = () => {
  return {
    type: Types.INCRSECOUNT,
  };
};

export const Getdata = (dispatch) => {
  dispatch(getdatareq());

  return axios
    .get(`khkhkhk`)
    .then((res) => {
      dispatch(getdatasuccess(res.data));
      //  console.log("ress",res)
    })
    .catch((err) => {
      dispatch(getdatafailure());
    });
};
