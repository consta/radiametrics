import { Response } from 'express';
import { response_status_codes } from './model';

export function successResponse(message: string, data: any, res: Response) {
    res.status(response_status_codes.success).json({
        status: 'success',
        message: message,
        data
    });
}

export function failureResponse(message: string, data: any, res: Response) {
    res.status(response_status_codes.success).json({
        status: 'failure',
        message: message,
        data
    });
}

export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        status: 'failure',
        message: 'Insufficient parameters',
        data: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        status: 'failure',
        message: 'MongoDB error',
        data: err
    });
}
