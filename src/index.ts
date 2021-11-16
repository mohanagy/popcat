// #!/usr/bin/env node

// // import app from './server.js';
// import axios from "axios";
// // import { parse } from 'node-html-parser';
// import cheerio from 'cheerio'

// const doit = async (url: string) => {

//     const { data } = await axios.get(url, {
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//             'Accept-Charset': 'charset=utf-8'
//         }
//     })
//     console.log(data)
//     const $ = cheerio.load(data, { decodeEntities: false })
//     const elements = $("div[id*='post_message_']")
//     console.log(elements)
//     //     for (const element of elements) {
//     //         // const text = cheerio.load(element, { decodeEntities: false }).html();

//     //         // console.log(text)
//     //     }
// }


// // const PORT = process.env.PORT || 3000;

// await doit('https://www.btalah.com/t22687-21.html',)


// // app.listen(PORT, async () => {


// //     // eslint-disable-next-line
// //     console.log(`Our app is running on http://localhost:8080`);
// // });

import puppeteer from 'puppeteer'
import { cpus } from 'os';
import cluster from 'cluster';

let x = 0;
(async () => {
    if (cluster.isMaster) {

        for (let index = 0; index < cpus().length; index += 1) {
            cluster.fork();
        }
    } else {
        while (true) {
            console.log('start');
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('https://popcat.click');
            const body = await page.$('body')
            await body?.click()
            await browser.close();
            console.log("finish")
        }
    }
})();

