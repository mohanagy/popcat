import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
const app = express();
export default app
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(routes);
