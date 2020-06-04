import { Request, Response } from 'express';
import User from '../models/model';

class DeleteOne {
    public deleteOne = (req: Request, res: Response): void => {
        User.deleteOne({ _id: req.params.id })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    }
}

export default new DeleteOne();