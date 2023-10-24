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
const apiPort = process.env.API_PORT || configData.APIPORT;
console.log(`api port is ${apiPort}`)

console.log(`DB_NAME is ${process.env.DB_NAME}`);
console.log(`DB_USER is ${process.env.DB_USER}`);
console.log(`DB_PASSWORD is ${process.env.DB_PASSWORD}`);
console.log(`MONGO_IP is ${process.env.MONGO_IP}`);
console.log(`SSL_CERT is ${process.env.SSL_CERT}`);
console.log(`SSL_KEY is ${process.env.SSL_KEY}`);

if ((!process.env.SSL_KEY) || (!process.env.SSL_CERT)) {
  console.log("Need to give path to SSL key and SSL certificate as environment variables");
  process.exit(1);
}

const mongoip = process.env.MONGO_IP || "127.0.0.1"
console.log(`MONGO IP 2 is ${mongoip}`)

const collection = process.env.DB_NAME ? process.env.DB_NAME : "book";
console.log(`collection is ${collection}`);
const connection_string = `mongodb://${mongoip}:27017/${collection}`;
console.log(`CONNECTION STRING IP is ${connection_string}`)

const uri = `${connection_string}?retryWrites=true&writeConcern=majority`;

var apiIP = process.env.API_IP || "localhost";
console.log(`ApiIP is ${apiIP}`);

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

/*
either

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

or

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
---
app.use(cors(options));
*/

//const allowedOrigins = ['https://172.16.1.20'];
//const allowedOrigins = ['https://172.16.1.20:6120'];
//const allowedOrigins = [/^https:\/\/172.16.*.*/];
const allowedOrigins = [/^https:\/\/172.16.*.*:5[1-9][0-9][0-9]/];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
console.log("CORS OPTIONS are ");
console.log(options);

app.use(cors(options));

//app.use(cors())
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
        cert: fs.readFileSync(process.env.SSL_CERT),
        key: fs.readFileSync(process.env.SSL_KEY)
    }, app).listen(
        apiPort, () => console.log(`Server listening on https://${apiIP}:${apiPort}`)
    );
});
