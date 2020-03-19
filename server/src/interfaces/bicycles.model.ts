import * as mongoose from 'mongoose';
import { Features } from './bicycles.interface';

const bicyclesSchema = new mongoose.Schema({
    geometry:Object,
    properties:Object,
    type:String,
});
const bicyclesModel = mongoose.model<Features & mongoose.Document>('Features', bicyclesSchema);
export default bicyclesModel;
