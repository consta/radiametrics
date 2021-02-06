export interface ISensorData {
    _id?: String;
    sensorId: number
    timestamp: Date
    data: {
        humidity: number
        temperature: number
        heatIndex: number
    }
}
