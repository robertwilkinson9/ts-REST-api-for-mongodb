{ /*
const mongoose = require('mongoose')
    .connect('mongodb://127.0.0.1:27017/item', { useNewUrlParser: true })
*/ }

import mongoose from 'mongoose';

mongoose
    .connect('mongodb://127.0.0.1:27017/item')
    .catch(e => {
        console.error('Connection error', e.message)
    })

export const db = mongoose.connection

{ /*
const db = mongoose.connection
module.exports = db
*/ }

{ /* 

export const connectToDatabase = async () => {
 const client: mongoDB.MongoClient = new mongoDB.MongoClient('item');
 await client.connect();
 const db: mongoDB.Db = client.db(process.env.DB_NAME);
}

 dotenv.config();

 const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
*/ }

{ /* 
 const gamesCollection: mongoDB.Collection = db.collection(process.env.GAMES_COLLECTION_NAME);

 collections.games = gamesCollection;
      
 console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);

 console.log(`Successfully connected to database: ${db.databaseName}`);
*/ }

