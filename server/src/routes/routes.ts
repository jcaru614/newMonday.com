import { Express } from 'express';
import Create from '../services/create';
import ReadAll from '../services/readAll';
import ReadOne from '../services/readOne';
import UpdateOne from '../services/updateOne';
import DeleteOne from '../services/deleteOne';
import UpdatePassword from '../services/updatePassword';
import Login from '../services/login';

export class Routes {

    public routes(app: Express): void {
    app.post('/create', Create.create);
    app.get('/readAll', ReadAll.readAll);
    app.get('/readOne/:id', ReadOne.readOne);
    app.patch('/updateOne/:id', UpdateOne.updateOne);
    app.delete('/deleteOne/:id', DeleteOne.deleteOne);
    app.patch('/updatePassword/:id', UpdatePassword.updatePassword);
    app.post('/login', Login.login);
    // app.get('/test', (req, res): void => {
    //     console.log('here!!!!!')
    //     res.json({message:'hello world'})

    // })
    }
}


