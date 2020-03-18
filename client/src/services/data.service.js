import { config } from '../config';
export const dataService = {
 getData,
};
//method to get data from backend.
function getData(){
  return  fetch(`${config.apiurl}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(ree => {
           return ree
        })
}