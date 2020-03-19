const express = require('express');
const router = express.Router();
import axios from 'axios';
import jwt from 'jsonwebtoken';
const checkAuth = require('../../middleware/auth-check.ts');
import bicyclesModel from '../../interfaces/bicycles.model';
//get data from db
router.get('', (req:any, res:any) => {
    bicyclesModel.find()  
    .limit(10) 
    .then(data=>{
      let token = jwt.sign({
       id:data[0]._id,
    },
   "secret",
    {
        expiresIn:"1day"
  
    }
    )
     return res.status(200).json({
       data:data,
       token:token
  
      });
    }) 
    .catch(err=>{
      return res.status(404).json(err);
    })   
  })
  
  //get data against specific time
  router.get('getdatabytime/:time',checkAuth,(req:any, res:any) =>{
    const time = req.params.time;
    bicyclesModel.find({openTime:time})
    .sort({ _id: -1 })  
    .then(data=>{
      let coordinates:any;
      if(data==[])
      {
        data.forEach(element=>{
          coordinates.push(element.geometry.coordinates);       
        })
        axios.get("https://www.api.openweathermap.org/data/2.5/weather?lat="+coordinates[0][1]+"&lon="+coordinates[0][0]+"")
    .then((response:any) => {
      return res.status(200).json(response);
    })
    .catch((err:any)=>{    
      return res.status(404).json(err);
    }) 
     }
     else
     {     
       return res.status(200).json('no Data Found')
     }  
    }) 
    .catch(err=>{
      return res.status(404).json(err);
    })
  })
  //get data against specific kiosId
  router.get('getdatabykiosid/:kiosid',checkAuth,(req:any, res:any) =>{
    const id = req.params.kiosid;
    bicyclesModel.find({"properties[0].kioskId":id})
    .sort({ _id: -1 })  
    .then(data=>{
      let coordinates:any;
      if(data==[])
      {
        data.forEach(element=>{
          coordinates.push(element.geometry.coordinates);       
        })
        axios.get("https://www.api.openweathermap.org/data/2.5/weather?lat="+coordinates[0][1]+"&lon="+coordinates[0][0]+"")
    .then((response:any) => {
      return res.status(200).json(response);
    })
    .catch((err:any)=>{    
      return res.status(404).json(err);
    }) 
     }
     else
     {     
       return res.status(200).json('no Data Found')
     }  
    }) 
    .catch(err=>{
      return res.status(404).json(err);
    })
  });

  module.exports =router;
  
  
  