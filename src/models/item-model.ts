import mongoose from 'mongoose';

const Schema = mongoose.Schema

import configData from "../config.json";

const Itemschema = new Schema(configData.SCHEMA)

export const Item = mongoose.model('Item', Itemschema, 'item');
