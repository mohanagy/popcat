#!/usr/bin/env node

import app from './server.js';
import axios from "axios";
import fs from "fs";
import path from "path";


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
            console.log({
                subdomain,
                url,
                name,
                [word]: response.status,
                result: `${subdomain && 'https://' + word + '.'}${url}${!subdomain && word}`

            })

        } catch (error: any) {

        }
    }
}


const PORT = process.env.PORT || 3000;
console.log(console.log({
    PORT
}))

app.listen(PORT, async () => {
    await doit('https://www.umnea.net/', file1Words, false, 'list1')
    await doit('https://www.umnea.net/', file2Words, false, 'list2')
    await doit('umnea.net/', file1Words, true, 'subdomainList1')
    await doit('umnea.net/', file2Words, true, 'subdomainLst2')

    setInterval(async () => {

        await axios.get('https://umnea.herokuapp.com/')
    }, 30000)


    // eslint-disable-next-line
    console.log(`Our app is running on http://localhost:8080`);
});
