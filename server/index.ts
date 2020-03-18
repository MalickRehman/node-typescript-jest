import 'module-alias/register';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import bicyclesModel from './src/models/bicycles.model';
const checkAuth = require('./middleware/auth-check')
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.json());

//connect to mongodb
mongoose.connect('mongodb://testuser:test111@ds053206.mlab.com:53206/bicyclesdb');
// mongoose.connect('mongodb://127.0.0.1:27017/greenpakistan');

// handling the cors
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With,Content-Type,Accept,Authorization");
  if(req.method ==='OPTIONS')
  {
      res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
      return res.status(200).json({});
  }
  next();
});

//get data against specific time
app.get('/getdatabytime/:time',checkAuth,(req,res) =>{
  const time = req.params.time;
  bicyclesModel.find({openTime:time})
  .sort({ _id: -1 })  
  .then(data=>{
    let coordinates:any=[];
    console.log(data)
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
app.get('/getdatabykiosid/:kiosid',checkAuth,(req,res) =>{
  const id = req.params.kiosid;
  console.log(id);
  bicyclesModel.find({"properties[0].kioskId":id})
  .sort({ _id: -1 })  
  .then(data=>{
    let coordinates:any=[];
    console.log(data)
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

//get data from db
app.get('/', (req, res) => {
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

    });
  }) 
  .catch(err=>{
    return res.status(404).json(err);
  })   
})

// set time interval that fetches new data after avery 1 hour 
setInterval(function () {
  axios.get('https://www.rideindego.com/stations/json/')
  .then((response:any) => {
    if(response)
    { 
      bicyclesModel.insertMany(response.data.features, function (err, resp) {
        if (err) {
          console.log(err);
        };
        console.log(resp);
      });
    } 
  })
  .catch((error:any) => {
   return error;
  });
}, 
1 *60* 60 * 1000); // 1 hour

//connect with server
const port = process.env.PORT || 4000;
const boot = (): void => {
  app.listen(port, () => {
    console.log('server started');
  })
}
boot()