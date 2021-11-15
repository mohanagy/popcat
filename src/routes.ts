import express from 'express';

const router = express.Router();
export default router
    .get('/', (_request, response) => {


        return response.json("done")
    })
