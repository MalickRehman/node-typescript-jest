import { config } from '../config';
export const dataService = {
 getData,
};
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