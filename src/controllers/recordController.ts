import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');
import RecordService from "../modules/records/service";
import {IRecord} from "../modules/records/model";

export class RecordController {

    private recordService: RecordService = new RecordService();

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
}
