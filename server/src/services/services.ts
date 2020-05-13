import { Request, Response } from 'express';
import User from '../models/model';
// const mongoose = require('mongoose');
// const User = mongoose.model('User');

class Services {
    public create = (req: Request, res: Response): void => {
        console.log('got to create')
        User.create(req.body)
            .then(response => res.json(response))
            .catch(error => res.json(error))
    }
    public readAll = (req: Request, res: Response): void => {
        console.log('got to readAll')
        User.find()
            .then(response => res.json(response))
            .catch(error => res.json(error)) 
    }
    public readOne = (req: Request, res: Response): void =>{
        User.findOne({ _id: req.params.id })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    }
    public updateOne = (req: Request, res: Response): void => {
        User.updateOne({ _id: req.params.id },  req.body, { new: true, runValidators: true })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    }
    public deleteOne = (req: Request, res: Response): void => {
        User.deleteOne({ _id: req.params.id })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    }
}

export default new Services();

// User.create({
//     project: 'testing project 123!',
//     date: Date.now(),
//     position: [true,false,false],
// })