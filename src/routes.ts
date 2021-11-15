import express from 'express';

const router = express.Router();
export default router
    .get('/', (_request, response) => {

        console.log("pong")
        return response.json("done")
    })
