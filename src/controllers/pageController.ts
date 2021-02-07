import {Request, Response} from 'express';
import {insufficientParameters, mongoError, successResponse} from '../modules/common/service';
import SensorDataService from "../modules/sendordata/service";
import {ISensorData} from "../modules/sendordata/model";
import e = require('express');

function round(n: number): number {
    return Math.round(n * 100) / 100.0;
}

export class PageController {
    private service = new SensorDataService();

    getPages(req: e.Request, res: e.Response) {
        const promises = [];
        const numbers: Array<number> = [5, 15, 60, 720, 1440];
        for (let i of numbers) {
            promises.push(
                this.service.getAverages(i)
                    .then((value) => {
                        const result = {
                            minutes: i,
                            temperature: null,
                            humidity: null,
                            heatIndex: null
                        }

                        if (value && value.length > 0) {
                            const averages = value[0];
                            result.temperature = round(averages.temperature);
                            result.humidity = round(averages.humidity);
                            result.heatIndex = round(averages.heatIndex);
                        }
                        return result;
                    })
            );
        }
        promises.push(
            this.service.getMostRecent()
                .then(arr => {
                    let value: ISensorData;
                    value = <ISensorData><unknown>arr[0];
                    return {
                        timestamp: value.timestamp,
                        temperature: round(value.data.temperature),
                        humidity: round(value.data.humidity),
                        heatIndex: round(value.data.heatIndex)
                    }
                })
        );

        Promise.all(promises)
            .then(val => {
                const data = {
                    averages: [],
                    recent: {}
                }
                for (const key of val) {
                    if (key.minutes) {
                        data.averages.push(key)
                    } else {
                        data.recent = key;
                    }
                }
                res.render('pages', {rndNumber: 12.55, model: data});
            })

    }
}

