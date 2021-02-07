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

    public getAverages(minutesBack: number) {
        return sensordata.aggregate([
            {
                $match: {
                    'timestamp': {
                        $gte: new Date(new Date().getTime() - 1000 * 60 * minutesBack)
                    }
                }
            },
            {
                $group: {
                    '_id': '$sensorId',
                    'temperature': {$avg: '$data.temperature'},
                    'humidity': {$avg: '$data.humidity'},
                    'heatIndex': {$avg: '$data.heatIndex'},
                }
            }
        ]).exec();
    }

    public getMostRecent() {
        return sensordata.find().sort({"timestamp":-1}).limit(1).exec();
    }
}
