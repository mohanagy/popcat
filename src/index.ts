#!/usr/bin/env node

import app from './server.js';
import axios from "axios";
import fs from "fs";
import path from "path";
import nodemailer from 'nodemailer';


const file1 = await fs.readFileSync(path.resolve('./', 'directory_only_one.small.txt'), 'utf8')
const file1Words = file1.split('/\n')
const file2 = await fs.readFileSync(path.resolve('./', 'Subdomain.txt'), 'utf8')
const file2Words = file2.split('/\n')
const wait = (time: number) => new Promise((resolve) => {

    setTimeout(resolve, time);
})

const doit = async (url: string, words: string[], subdomain: boolean, name: string) => {

    for await (const word of words) {
        console.log(`process with name :${name} and word : ${word} url :${url} and subdomain is ${subdomain ? 'ON' : 'OFF'} `)
        try {
            const response = await axios.get(`${subdomain && 'https://' + word + '.'}${url}${!subdomain && word}`);
            await wait(3000)
            await sendConfirmationEmail(
                `${subdomain && 'https://' + word + '.'}${url}${!subdomain && word}`
            );
            console.log({
                subdomain,
                url,
                name,
                [word]: response.status,
                result: `${subdomain ? 'https://' + word + '.' : ''}${url}${!subdomain ? word : ''}`

            })

        } catch (error: any) {

        }
    }
}


const PORT = process.env.PORT || 3000;
console.log(console.log({
    PORT
}))


const sendConfirmationEmail = (url: string) => new Promise((resolve, _reject) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        port: 465,
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        },
        auth: {
            user: 'jokernaji7@gmail.com',
            pass: '123asd!@#'
        }
    });
    const mailOptions = {
        from: 'jokernaji7@gmail.com',
        to: 'moha.buy@gmail.com',
        subject: `valid url`,
        html: `${url}`
    };
    transporter.sendMail(mailOptions, resolve);
})

app.listen(PORT, async () => {

    setInterval(async () => {

        console.log("ping")
        await axios.get('http://localhost:3000/');
    }, 60000)

    await doit('https://www.umnea.net/', file1Words, false, 'list1')
    await doit('https://www.umnea.net/', file2Words, false, 'list2')
    await doit('umnea.net/', file1Words, true, 'subdomainList1')
    await doit('umnea.net/', file2Words, true, 'subdomainLst2')

    // eslint-disable-next-line
    console.log(`Our app is running on http://localhost:8080`);
});
