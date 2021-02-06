import {ISensorData} from './model';
import sensordata from './schema';

export default class SensorDataService {

    public addSensorDataRecord(param_record: ISensorData, callback: any) {
        const _session = new sensordata(param_record);
        _session.save(callback);
    }

    public getSensorData(query: any, callback: any) {
        sensordata.find(query, callback);
    }
}
