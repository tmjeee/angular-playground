
import express, {Express} from 'express';
import cors from 'cors';
import config from './config';
import {setTimezone} from "./timezone/timezone";
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

setTimezone(config['timezone']);
const port = config['port']

const app: Express = express();

app.use(helmet())
app.use(express.urlencoded({ limit: config['request-payload-limit']} ));
app.use(express.text({ limit: config['request-payload-limit']} ));
app.use(express.json( { limit: config['request-payload-limit'] }));
app.use(express.raw( { limit: config['request-payload-limit'] }));
app.use(cookieParser());
app.use(cors());

const appPromiseFns: (()=>Promise<any>)[] = [
    () => new Promise((res, rej) => {
        app.listen(port, () => {
            console.log(`App version: ${process.env.APP_VERSION} started at port ${port} `) ;
        });
    })
];

appPromiseFns.reduce((promise: Promise, promiseFn: ()=>Promise<any>) => {
    return promise.then(promiseFn);
}, Promise.resolve());


process.on('exit', async () => {
    console.log(`proces exit`);
});
process.on('uncaughtException', (e) => {
    console.log(`uncaught exception (in process)`, e)
});
process.on('unhandledRejection', (e) => {
    console.log(`unhandled rejection (in process)`, e)
});