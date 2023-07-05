import mongoose from 'mongoose';

import configData from "../../config/config.json";

const schema = new mongoose.Schema(configData.SCHEMA)

export const Item = mongoose.model(configData.COLLECTION, schema, configData.LCCOLLECTION);
