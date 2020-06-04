import { Request, Response } from 'express';
import User from '../models/model';

class ReadOne {
    public readOne = (req: Request, res: Response): void =>{
        User.findOne({ _id: req.params.id })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    }
}

export default new ReadOne();