import * as types from "./actionType"
const intialstate={
       token:"",
       data:[],
       count:0,
       isLoading:false
};



 export  const Reducer = (state=intialstate,action) =>{

      const {type,payload} = action;
    //    console.log("state",state)

        switch(type){
            case types.IncresementPENDING:
                return {
                    ...state,
                    isLoading:true,
                }
                case types.IncresementSUCESSS:
                return {
                    ...state,
                    isLoading:true,
                    count:state.count+1
                }
                  // ============================= //
                case types.GETDATAREQ:
                return {
                    ...state,
                    isLoading:true,
                }
                case types.GETDATASUCESSS:
                return {
                    ...state,
                    isLoading:true,
                    data:payload
                }
               
                default:
                    return state;
        }


  }