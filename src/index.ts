import express, { Request, Response } from "express";
import * as fs from 'fs';
import * as https from 'https';
import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from "./db/index";
import { itemRouter } from './routes/item-router';

console.log(`SSL_CERT is ${process.env.SSL_CERT}`);
console.log(`SSL_KEY is ${process.env.SSL_KEY}`);
console.log(`CONNECTION_STRING is ${process.env.CONNECTION_STRING}`);
console.log(`API IP is ${process.env.API_IP}`)
console.log(`API PORT is ${process.env.API_PORT}`)

if ((!process.env.SSL_KEY) || (!process.env.SSL_CERT) || (!process.env.CONNECTION_STRING)) {
  console.log("Need to give path to SSL key and SSL certificate and a connection string for mongoDB as environment variables");
  process.exit(1);
}

import configData from "../config/config.json"

const app = express()
const apiPort = process.env.API_PORT || configData.APIPORT;
console.log(`api port is ${apiPort}`)

const end_point_name = configData.ITEM_NAME || "test";
console.log(`END_POINT_NAME is ${end_point_name}`);

const apiIP = process.env.API_IP || "localhost";
console.log(`api ip is ${apiIP}`)

const post_path = `/api/${end_point_name}/`
// POST sends OPTIONS first, so we set appropriate response headers and send success status.
//app.options(post_path, function(req, res, next){
app.options(post_path, function(req, res){
  const ORIGIN = req.headers.origin || 'https://127.0.0.1';
  console.log(`FOUND OPTION for ${post_path} and origin of ${ORIGIN}`);
  res.set('Access-Control-Allow-Origin', ORIGIN);
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin, Access-Control-Allow-Origin');
  res.sendStatus(200);
});

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

//const server = https.createServer({
https.createServer({
  cert: fs.readFileSync(process.env.SSL_CERT),
  key: fs.readFileSync(process.env.SSL_KEY)
}, app).listen(
  apiPort, () => console.log(`Server listening on https://${apiIP}:${apiPort}`)
);

app.use('/api', itemRouter)
