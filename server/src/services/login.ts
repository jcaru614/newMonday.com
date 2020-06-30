import { Request, Response } from 'express';
import UserDB, { User } from '../models/model';
import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import WebUtil from '../utils/webUtil';
import * as Constants from '../utils/constants';
import bcrypt from 'bcryptjs';
import passport from 'passport';


// class Login {
//     public login = (req: Request, res: Response): void => {
//         UserDB.findOne({ email: req.body.email })
//             .then((userResult: User | null) => {
//                 if (userResult === null) {
//                     WebUtil.response(res, Constants.NO_ACCOUNT_EXISTS, 400)
//                 } else {
//                     Bcrypt.compare(req.body.password, userResult.password)
//                         .then((passwordIsValid: boolean) => {
//                             if (passwordIsValid) {
//                                 const newJWT:string = JWT.sign({ _id: userResult._id }, secret)
//                                 res.cookie("usertoken", newJWT, { httpOnly: true })
//                                 WebUtil.successResponse(res, userResult._id, Constants.LOGGED_IN, 200)
//                             } else {
//                                 WebUtil.response(res, Constants.INVALID_PASSWORD, 400)
//                             }
//                         })
//                         .catch((error: any) => WebUtil.errorResponse(res, error, Constants.INVALID_PASSWORD, 400));
//                 }
//             })
//             .catch((error: any) => {
//                 WebUtil.errorResponse(res, error, Constants.SERVER_ERROR, 500)
//             })
//     }
// }

class Login {
    public login = (req: any, res: any, next: any): void => {
        passport.authenticate('local', function (err, user, info) {
            if (err) { return next(err) }
            if (!user) { return WebUtil.response(res, Constants.NO_ACCOUNT_EXISTS, 400) }
            req.login(user, function (err: any) {
                if (err) { return next(err) }
                console.log('logged in', req.body.email);
                console.log('USER HERE =>', user)
                return WebUtil.successResponse(res, user.email, Constants.LOGGED_IN, 200)
            });
        })(req, res, next);
    };
}

export default new Login();