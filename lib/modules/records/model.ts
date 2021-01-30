import { ModificationNote } from "../common/model";

export interface IRecord {
    _id?: String;
    cpm: number,
    sensorId: number
    timestamp: Date
}
