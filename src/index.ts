import express, { Request, Response } from "express";

const https = require('https');
const fs = require('fs');

const {MongoClient} = require('mongodb');
// Never hard-code your credentials, get them from config - in this case, the environment.
const mongo_uri = '127.0.0.1:27017';
//const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongo_uri/${process.env.DB_NAME}?retryWrites=true&writeConcern=majority`;
const collection = process.env.DB_NAME ? process.env.DB_NAME : "book";
console.log(`collection is ${collection}`);
// const uri = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}?retryWrites=true&writeConcern=majority`;
const uri = `mongodb://127.0.0.1:27017/${collection}?retryWrites=true&writeConcern=majority`;

import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from "./db/index";
import { itemRouter } from './routes/item-router';

import configData from "../config/config.json"

const app = express()
const apiPort = Number(configData.APIPORT);

var api_ip = "localhost";
console.log(`0. api_ip is ${api_ip}`);
 
if (('API_IP' in configData) && (typeof configData.API_IP === "string")) {
  api_ip = configData.API_IP;
  console.log(`1. api_ip is ${api_ip}`);
}
console.log(`2. api_ip is ${api_ip}`);

var dbClient = null;
var server = null;

async function initDatabase() { 
    try {
        const client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        await client.connect();
        return client;
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req: Request, res:Response) => {
  res.send('Hello World!')
})

app.use('/api', itemRouter)

initDatabase().then((client) => {
    console.log('Database initialized');
    dbClient = client;
    server = https.createServer({
        cert: fs.readFileSync('./certs/localhost.crt'),
        key: fs.readFileSync('./certs/localhost.key')
    }, app).listen(
        apiPort, () => console.log(`Server listening on https://${api_ip}:${apiPort}`)
    );
});
