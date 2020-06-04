import { Request, Response } from 'express';
import User from '../models/model';
import bcrypt from "bcrypt";

class UpdatePassword {
    public updatePassword = (req: Request, res: Response): void => {
        bcrypt.hash(req.body.password, 10)
            .then((hash:string) => {
                req.body.password = hash
                User.updateOne({ _id: req.params.id }, req.body, { new: true, runValidators: true })
                    .then(response => res.json(response))
                    .catch(error => res.json(error))
            })
            .catch(error2 => res.json(error2))
    }
}

export default new UpdatePassword();