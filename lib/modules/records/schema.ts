import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    cpm: Number,
    sensorId: Number,
    timestamp: Date
});

export default mongoose.model('records', schema);
