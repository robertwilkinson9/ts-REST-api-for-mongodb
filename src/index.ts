import express, { Request, Response } from "express";
import * as fs from 'fs';
import * as https from 'https';
import { MongoClient } from 'mongodb';

import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from "./db/index";
import { itemRouter } from './routes/item-router';

import configData from "../config/config.json"

const app = express()
const apiPort = Number(configData.APIPORT);

// we run the API interface on the same server as mongodb - this could be different but for now ...
const mongo_uri = '127.0.0.1:27017';
const collection = process.env.DB_NAME ? process.env.DB_NAME : "book";
console.log(`collection is ${collection}`);
const uri = `mongodb://${mongo_uri}/${collection}?retryWrites=true&writeConcern=majority`;

var api_ip = "localhost";
if (('API_IP' in configData) && (typeof configData.API_IP === "string")) {api_ip = configData.API_IP}

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

var dbClient: MongoClient = null;
var server: Server = null;

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
