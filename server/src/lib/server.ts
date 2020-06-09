import * as http from 'http';
// import * as cors from "cors";

import app from "./app";
const PORT = 8000;

http.createServer(app).listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});