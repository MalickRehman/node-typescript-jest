import {Data} from '../constrants/data.constrants';
export function DataReducer(state={retrievedObject:false},action)
{
    switch (action.type) {
        case Data.GET_DATA_REQUEST:
          return state
        case Data.GET_DATA_SUCCESS:
          return {
            ...state,
            retrievedObject:action.data         
          };         
        default:
          return state
      }
}