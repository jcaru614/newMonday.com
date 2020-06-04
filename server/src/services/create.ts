import { Request, Response } from 'express';
import UserDB from '../models/model';
import jwt from "jsonwebtoken";
const secret: string = "mysecret";

class Create {
    public create = (req: Request, res: Response): void => {
        console.log('got to create')
        UserDB.findOne({ email: req.body.email })
            .then((userFromDB: any) => {
                console.log(userFromDB)
                if (userFromDB !== null) {
                    res.json({ msg: "Email already exists", flag: false })
                } else {
                    const temp = new UserDB(req.body);
                    temp.save()
                        .then(response => {
                            console.log(response)
                            const newJWT = jwt.sign({ _id: response._id }, secret)
                            res.cookie("usertoken", newJWT, {
                                httpOnly: true
                            }).json({ msg: "success", _id: response._id });
                        })
                        .catch(error2 => res.json(error2))
                }
            })
            .catch(error => res.json(error))
    }
}

export default new Create();

// User.create({
//     firstName: "test1",
//     lastName: "test1",
//     email: "test1@test1.com",
//     password: "test1234567890",
//     confirmPassword:"test1234567890"
// })