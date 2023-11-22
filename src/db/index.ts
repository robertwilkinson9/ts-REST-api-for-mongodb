import mongoose from 'mongoose';

const connection_string = process.env.CONNECTION_STRING 

mongoose
    .connect(connection_string)
    .catch((e: unknown) => {console.error('Connection error', e.message)})

export const db = mongoose.connection
