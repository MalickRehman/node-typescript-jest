import {Data} from '../constrants/data.constrants';
import {alertActions} from './alert.action'
import {dataService} from '../services/data.service'

export const dataActions ={
    fetchData
};
//action method for fetching data 
function fetchData(){
    return (dispatch) =>{
        dispatch(request());
        //call service method
        dataService.getData()
        .then(
            (res) => {
                dispatch(success(res)); 
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error.toString()));
            });
    };
    function request() { return { type: Data.GET_DATA_REQUEST} }
    function success(data) { return { type: Data.GET_DATA_SUCCESS, data } }
    function failure(error) { return { type: Data.GET_DATA_FAILURE, error } }
}