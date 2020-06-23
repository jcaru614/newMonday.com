import { Request, Response } from 'express';
import UserDB, { User } from '../models/model';
import WebUtil from '../utils/webUtil';
import * as Constants from '../utils/constants';
import jwt from "jsonwebtoken";
const secret: string = "mysecret";

class Create {
    public create = (req: Request, res: Response): void => {
        UserDB.findOne({ email: req.body.email })
            .then((userResult: User | null) => {
                console.log(userResult)
                if (userResult === null) {
                    UserDB.create(req.body)
                        .then((createResult: User): void => {
                            const newJWT: string = jwt.sign({ _id: createResult._id }, secret)
                            WebUtil.successResponse(res, createResult, Constants.ACCOUNT_CREATED, 200, newJWT)
                        }).catch((createError: any) => WebUtil.errorResponse(res, createError, Constants.SERVER_ERROR, 500));
                } else {
                    // res.json({ msg: "Email already exists", flag: false })
                    WebUtil.response(res, Constants.ACCOUNT_EXISTS, 400);
                }
            }).catch(error => WebUtil.errorResponse(res, error, Constants.CLIENT_ERROR_AE, 400))
    }
}

export default new Create();

// UserDB.create({
//     firstName: "test1",
//     lastName: "test1",
//     email: "test1@test1.com",
//     password: "test1234567890",
//     confirmPassword:"test1234567890"
// })