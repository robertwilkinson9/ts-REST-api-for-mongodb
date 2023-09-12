import mongoose from 'mongoose';

import configData from "../../config/config.json";

mongoose
    .connect('mongodb://127.0.0.1:27017/' + configData.LCCOLLECTION)
    .catch((e: unknown) => {console.error('Connection error', e.message)})

export const db = mongoose.connection
