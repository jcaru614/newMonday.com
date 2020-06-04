import { Request, Response } from 'express';
import User from '../models/model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret: string = "mysecret";

class Authenticate {
    public authenticate = (req: Request, res: Response, next: any): void => {
        jwt.verify(req.cookies.usertoken, secret, (err: any, payload: any) => {
            console.log(payload);
            if (err) {
                res.status(401).json({ verified: false });
            } else {
                next();
            }
        })
    }
}

export default new Authenticate();