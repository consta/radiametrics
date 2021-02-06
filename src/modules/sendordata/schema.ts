import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    sensorId: Number,
    timestamp: Date,
    data: {
        humidity: Number,
        temperature: Number,
        heatIndex: Number
    }
});

export default mongoose.model('sensordata', schema);
