import React from 'react';
import './App.css';

import { connect } from 'react-redux';

import { dataActions } from './actions';

class App extends React.Component { 
  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(dataActions.fetchData());
  }
  render(){
    let process = this.props.process;
    if(!process){
      return(<div></div>)
    }   
    console.log('procss',process);
  return (
    <div className="App">
      <table>        
          <thead>
            <tr>
          <th>id</th>
          <th>name</th>
          <th>bikesAvailable</th>
          <th>addressStreet</th>
          </tr>
          </thead> 
          <tbody>
          {process.data.map((item,i) =>
            <tr key={i}>
              <td>{item._id}</td>
              <td >{item.properties.name}</td>
              <td >{item.properties.bikesAvailable}</td>
              <td >{item.properties.addressStreet}</td>
            </tr>
            )}
            </tbody>      
      </table>
    
    </div>
  );
}
}
function mapStateToProps(state) {
  return { 
    process:state.DataReducer.retrievedObject
  };
}
const connectedApp= connect(mapStateToProps)(App);
export default connectedApp;
