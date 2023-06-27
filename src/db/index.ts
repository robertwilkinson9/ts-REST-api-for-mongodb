import mongoose from 'mongoose';

import configData from "../config.json";

mongoose
    .connect('mongodb://127.0.0.1:27017/' + configData.LCCOLLECTION)
    .catch(e => {
        console.error('Connection error', e.message)
    })

export const db = mongoose.connection
