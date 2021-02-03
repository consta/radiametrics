import {IRecord} from './model';
import records from './schema';

export default class RecordService {

    public addRecord(param_record: IRecord, callback: any) {
        const _session = new records(param_record);
        _session.save(callback);
    }

    public getRecords(query: any, callback: any) {
        records.find(query, callback);
    }

    public getAverage(minutesBack: number, callback: any) {
         records.aggregate([
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
                     'cpmAverage': {
                         $avg: '$cpm'
                     }
                 }
             }
         ], callback)
             .then(r => {
                 return r
             });
    }

    public getDateOfMostRecentRecord(callback: any) {
        records.find(callback).sort({"timestamp":-1}).limit(1);
    }

}
