import { Request, Response } from 'express';
import UserDB, { User } from '../models/model';
import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import WebUtil from '../utils/webUtil';
import * as Constants from '../utils/constants';
const secret: string = "mysecret";

class Login {
    public login = (req: Request, res: Response): void => {
        UserDB.findOne({ email: req.body.email })
            .then((userResult: User | null) => {
                if (userResult === null) {
                    WebUtil.response(res, Constants.NO_ACCOUNT_EXISTS, 400)
                } else {
                    Bcrypt.compare(req.body.password, userResult.password)
                        .then((passwordIsValid: boolean) => {
                            if (passwordIsValid) {
                                const newJWT:string = JWT.sign({ _id: userResult._id }, secret)
                                res.cookie("usertoken", newJWT, { httpOnly: true })
                                WebUtil.successResponse(res, userResult._id, Constants.LOGGED_IN, 200)
                            } else {
                                WebUtil.response(res, Constants.INVALID_PASSWORD, 400)
                            }
                        })
                        .catch((error: any) => WebUtil.errorResponse(res, error, Constants.INVALID_PASSWORD, 400));
                }
            })
            .catch((error: any) => {
                WebUtil.errorResponse(res, error, Constants.SERVER_ERROR, 500)
            })
    }
}

export default new Login();

// User.create({
//     project: 'testing project 123!',
//     date: Date.now(),
//     position: [true,false,false],
// })