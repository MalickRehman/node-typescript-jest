import 'module-alias/register';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { productsRouter } from './modules/products';
import * as mongoose from 'mongoose';
import bicyclesModel from '../src/models/bicycles.model';
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
// mongoose.connect('mongodb://testuser:test111@ds053206.mlab.com:53206/bicyclesdb');
mongoose.connect('mongodb://127.0.0.1:27017/greenpakistan');

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
app.use('/products', productsRouter());
app.get('/', (req, res) => {
  bicyclesModel.find({})
  .sort({ _id: -1 })  
  .then(data=>{
   return res.status(200).json(data);
  }) 
  .catch(err=>{
    return res.status(404).json(err);
  })
    // return res.send('hi'); 
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
const boot = (): void => {
  app.listen(5000, () => {
    console.log('server started');
  })
}
boot()