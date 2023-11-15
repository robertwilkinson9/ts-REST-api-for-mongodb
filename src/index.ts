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

const collection = process.env.DB_NAME || "test";

const connection_string = `mongodb://${mongoip}:27017/${collection}`;
console.log(`CONNECTION STRING IP is ${connection_string}`)

const uri = `${connection_string}?retryWrites=true&writeConcern=majority`;

var apiIP = process.env.API_IP || "localhost";
console.log(`ApiIP is ${apiIP}`);

const post_path = `/api/${collection}/`
// POST sends OPTIONS first, so we set appropriate response headers and send success status.
app.options(post_path, function(req, res, next){
  const ORIGIN = req.headers.origin || 'https://127.0.0.1';
  console.log(`FOUND OPTION for ${post_path} and origin of ${ORIGIN}`);
  res.set('Access-Control-Allow-Origin', ORIGIN);
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin, Access-Control-Allow-Origin');
  res.sendStatus(200);
});

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

const allowedOrigins = [ 
  /^https:\/\/192\.168\.[1-9][0-9]?[0-9]?\.[1-9][0-9]?[0-9]?:[1-9]?[0-9]?[0-9]?[0-9]?\//,
  /^https:\/\/172\.[1-3][0-9]\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?:[1-9]?[0-9]?[0-9]?[0-9]?\//,
  /^https:\/\/10\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?:[1-9]?[0-9]?[0-9]?[0-9]?\//,
  /^https:\/\/localhost:[0-9]?[0-9]?[0-9]?[0-9]?\//
];

const options: cors.CorsOptions = {origin: allowedOrigins};

app.use(cors(options));

app.use(function(req, res, next) {
// add appropriate response headers for CORS
  const ORIGIN = req.headers.origin || "https://127.0.0.1";
  res.set("Access-Control-Allow-Origin", ORIGIN);
  res.set('Access-Control-Expose-Headers', 'Access-Control-Allow-Origin')
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin, Access-Control-Allow-Origin');

  next();
});

app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req: Request, res:Response) => {
// add appropriate response headers for CORS
  const ORIGIN = req.headers.origin || "https://127.0.0.1";
  res.set("Access-Control-Allow-Origin", ORIGIN);
  res.set('Access-Control-Expose-Headers', 'Access-Control-Allow-Origin')
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin, Access-Control-Allow-Origin');
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
