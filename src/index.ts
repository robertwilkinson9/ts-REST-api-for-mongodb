import express, { Request, Response } from "express";

const https = require('https');
const fs = require('fs');

const {MongoClient} = require('mongodb');
// Never hard-code your credentials, get them from config - in this case, the environment.
const mongo_uri = '127.0.0.1:27017';
//const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongo_uri/${process.env.DB_NAME}?retryWrites=true&writeConcern=majority`;
const collection = process.env.DB_NAME ? process.env.DB_NAME : "book";
console.log(collection);
// const uri = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}?retryWrites=true&writeConcern=majority`;
const uri = `mongodb://127.0.0.1:27017/${collection}?retryWrites=true&writeConcern=majority`;

import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from "./db/index";
import { itemRouter } from './routes/item-router';

import configData from "../config/config.json"

const app = express()
const apiPort = Number(configData.APIPORT);

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

// app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

initDatabase().then((client) => {
    console.log('Database initialized');
    dbClient = client;
    server = https.createServer({
        cert: fs.readFileSync('./certs/localhost.crt'),
        key: fs.readFileSync('./certs/localhost.key')
    }, app).listen(
        443, () => console.log('Server listening on https://localhost:443')
    );
});
