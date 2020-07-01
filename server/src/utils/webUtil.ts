import { Response } from 'express';
import UserDB, { User } from '../models/model';
import * as Constants from './constants';
import { send } from 'process';

class WebUtil {

    public response(res: Response, code: string, status: number, headers?: any): void {
        res.status(status).header(headers).json(code);
    }

    public successResponse(res: Response, data: any, code: string, status: number, headers?: any): void {
        console.log(data);
        res.json({ info: data, code, status, headers })
    }

    public errorResponse(res: Response, err: any, code: string, status: number): void {
        console.log(err);
        res.status(status).json({
            code: code,
            message: err
        });
    }

    public htmlResponse(res: Response, file: string, status: number): void {
        res.status(status).sendFile(file, { root: Constants.STATIC_RESOURCES })
    }

}

export default new WebUtil();