import express from 'express';
import session from 'express-session';
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import flash from 'connect-flash';
import cors from "cors";
import passport from 'passport';
import { Routes } from '../routes/routes';


// Passport Config
require('../config/passport')(passport);

// Create Express server
const app = express();

// Use enviroment varibles
require('dotenv').config();

// Connect to MongoDB
const mongoUrl = 'mongodb://localhost:27017/newMonday';

mongoose.connect(process.env.MONGODB_URI || mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));


// Express configuration

// // Cors config
app.use(cors({
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: 'http://localhost:3000',
    preflightContinue: false,
}))

// // app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Express session
app.use(session({
    secret: 'thesecret',
    resave: true,
    saveUninitialized: true
}))

// // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// // Connect flash
app.use(flash());

// // Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
// //serving static files 
app.use(express.static('public'));


// heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));
}

// Routes
const routes = new Routes()
routes.routes(app)


export default app;
