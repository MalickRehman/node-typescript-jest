import * as mongoose from 'mongoose';
import { Features } from '../interfaces/bicycles.interface';

const bicyclesSchema = new mongoose.Schema({
    geometry:Object,
    properties:Object,
    type:String,
});
const bicyclesModel = mongoose.model<Features & mongoose.Document>('Features', bicyclesSchema);
export default bicyclesModel;
