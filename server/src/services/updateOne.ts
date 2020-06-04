import { Request, Response } from 'express';
import User from '../models/model';

class UpdateOne {
    public updateOne = (req: Request, res: Response): void => {
        User.updateOne({ _id: req.params.id },  req.body, { new: true, runValidators: true })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    }
}

export default new UpdateOne();