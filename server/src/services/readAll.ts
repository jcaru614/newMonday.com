import { Request, Response } from 'express';
import User from '../models/model';

class ReadAll {
    public readAll = (req: Request, res: Response): void => {
        console.log('got to readAll')
        User.find()
            .then(response => res.json(response))
            .catch(error => res.json(error)) 
    }
}

export default new ReadAll();