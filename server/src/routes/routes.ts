import { Express } from 'express';
import Services from '../services/services';

export class Routes {

    public routes(app: Express): void {
    app.post('/create', Services.create);
    app.get('/readAll', Services.readAll);
    app.get('/readOne/:id', Services.readOne);
    app.put('/updateOne/:id', Services.updateOne);
    app.delete('/deleteOne/:id', Services.deleteOne);
    app.get('/test', (req, res): void => {
        console.log('here!!!!!')
        res.json({message:'hello world'})

    })
    }
}


