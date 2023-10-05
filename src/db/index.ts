import mongoose from 'mongoose';

import configData from "../../config/config.json";

//    .connect('mongodb://127.0.0.1:27017/' + configData.LCCOLLECTION)
//    .connect('mongodb://my-mongo:27017/' + configData.LCCOLLECTION)

const mongoip = process.env.MONGO_IP || "127.0.0.1"
console.log(`MONGO IP is ${mongoip}`)

const connection_string = `mongodb://${mongoip}:27017/` + configData.LCCOLLECTION;
console.log(`CONNECTION STRING IP is ${connection_string}`)

mongoose
    .connect(connection_string)
    .catch((e: unknown) => {console.error('Connection error', e.message)})

export const db = mongoose.connection
