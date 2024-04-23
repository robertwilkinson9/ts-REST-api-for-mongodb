import mongoose from 'mongoose';

import configData from "../../config/config.json";

const schema = new mongoose.Schema(configData.SCHEMA)

const capitalizeFirstLetter = (str: string): string => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
};

const ucfirstcollection = capitalizeFirstLetter(configData.COLLECTION);
export const Item = mongoose.model(ucfirstcollection, schema, configData.COLLECTION);
