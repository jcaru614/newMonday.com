import * as http from 'http';

import app from "./app";
const PORT = process.env.PORT || 8080;

http.createServer(app).listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});