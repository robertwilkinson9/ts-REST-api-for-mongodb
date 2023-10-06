import mongoose from 'mongoose';

import configData from "../../config/config.json";

const mongoip = process.env.MONGO_IP || "127.0.0.1"
const connection_string = `mongodb://${mongoip}:27017/` + configData.LCCOLLECTION;

mongoose
    .connect(connection_string)
    .catch((e: unknown) => {console.error('Connection error', e.message)})

export const db = mongoose.connection
