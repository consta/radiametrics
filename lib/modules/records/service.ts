import { IRecord } from './model';
import records from './schema';

export default class RecordService {
    
    public addRecord(param_record: IRecord, callback: any) {
        const _session = new records(param_record);
        _session.save(callback);
    }

    public getRecords(query: any, callback: any) {
        records.find(query, callback);
    }

}
