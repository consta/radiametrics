import {Request, Response} from 'express';
import {insufficientParameters, mongoError, successResponse} from '../modules/common/service';
import RecordService from "../modules/records/service";
import SensorDataService from "../modules/sendordata/service";
import {IRecord} from "../modules/records/model";
import {ISensorData} from "../modules/sendordata/model";
import e = require('express');

export class RecordController {

    private recordService: RecordService = new RecordService();
    private sensorDataService: SensorDataService = new SensorDataService();

    public add_record(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.cpm && req.body.sensorId) {
            const param_record: IRecord = {
                cpm: req.body.cpm,
                sensorId: req.body.sensorId,
                timestamp: new Date(Date.now()),
            };
            this.recordService.addRecord(param_record, (err: any, record: IRecord) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('record added successfully', record, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public find_records(req: Request, res: Response) {
        this.recordService.getRecords({}, (err: any, result: IRecord[]) => {
            if (err) {
                mongoError(err, res);
            }
            else {
                successResponse("records", result, res);
            }
        });
    }

    public get_averages(req: Request, res: Response) {
        var minutesSince:number = req.query.since ? Number(req.query.since) : 5;

        this.recordService.getAverage(minutesSince, (err: any, result: any) => {
            if (err) {
                mongoError(err, res);
            }
            else {
                successResponse("averages", result, res);
            }
        })
    }

    getDateOfRecentRecord(req: e.Request, res: e.Response) {
        this.recordService.getDateOfMostRecentRecord((err:any, result: any) => {
            if (err) {
                mongoError(err, res);
            }
            else {
                successResponse("recent-timestamp", result[0].timestamp, res);
            }
        })
    }

    add_sensor_data(req: e.Request, res: e.Response) {
        if (req.body && req.body.sensorId) {
            const param_record: ISensorData = {
                sensorId: req.body.sensorId,
                timestamp: new Date(Date.now()),
                data: {
                    temperature: req.body.data.temperature,
                    humidity: req.body.data.humidity,
                    heatIndex: req.body.data.heatIndex
                }
            };
            this.sensorDataService.addSensorDataRecord(param_record, (err: any, record: IRecord) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('record added successfully', record, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }
}
