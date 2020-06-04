import { Request, Response } from 'express';
import User from '../models/model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret: string = "mysecret";

class Login {
    public login = (req: Request, res: Response): void => {
        User.findOne({ email: req.body.email })
            .then(userFromDB => {
                if (userFromDB === null) {
                    res.json({ msg: "User not found in Database" });
                } else {
                    bcrypt.compare(req.body.password, userFromDB.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid) {
                                const newJWT = jwt.sign({ _id: userFromDB._id }, secret)
                                res.cookie("usertoken", newJWT, {
                                    httpOnly: true
                                }).json({ msg: "success", _id: userFromDB._id });
                                // used successs to differentiate between msg/bad and success/good
                            } else {
                                res.json({ msg: "password is not correct" });
                            }
                        })
                        .catch(error => res.json({ msg: "Bcrypt compare has failed here" }));
                }
            })
            .catch(error => {
                console.log(error)
                res.json({ msg: "DB has failed to run the query", error })
            })
    }
}

export default new Login();

// User.create({
//     project: 'testing project 123!',
//     date: Date.now(),
//     position: [true,false,false],
// })