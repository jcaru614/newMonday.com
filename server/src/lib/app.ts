import express from 'express';
import { Express } from 'express';
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Routes } from "../routes/routes";
import mongoose from "mongoose";
// import * as cors from "cors";
import cors from "cors";


class App {
    public router = express.Router();
    public app: Express = express();
    public routePrv: Routes = new Routes();
    public mongoUrl = 'mongodb://localhost:27017/newMonday';
    public options:cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: this.mongoUrl,
        preflightContinue: false,
    }


    constructor() {
        // this.app = express();
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
        // this.app.use(cors());
        this.app.use(cors({origin: 'http://localhost:3000'}));
        this.router.options("*", cors(this.options));
        this.app.use(cookieParser());
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .then(() => console.log("Established a connection to the database"))
            .catch(err => console.log("Something went wrong when connecting to the database", err));
    }
}

export default new App().app;