import  express from 'express';
import swaggerUi from 'swagger-ui-express';
import  bodyParser from 'body-parser';
import  mongoose from 'mongoose'; 
import bicyclesModel from './interfaces/bicycles.model';
const swaggerDocument = require('../swagger/swagger.json')
import axios from 'axios';
const dataRoutes = require('./api/routes/data.ts')

let app = express();
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
app.use('/',dataRoutes);
app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

// set time interval that fetches new data after avery 1 hour 
setInterval(function () {
  axios.get('https://www.rideindego.com/stations/json/')
  .then((response) => {
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
  .catch((error) => {
   return error;
  });
}, 
1 *60* 60 * 1000); // 1 hour
//handle requests


// app.use((error:any, req:any,res:any,next:any) =>{
// res.status(error.status ||500);
// res.json({
//   error:{
//       message:error.message

//   }
// })
// });
module.exports = app;