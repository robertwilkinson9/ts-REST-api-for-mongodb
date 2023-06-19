import mongoose from 'mongoose';

const Schema = mongoose.Schema

const Itemschema = new Schema(
    {
        booking_start: { type: Date },
        booking_end: { type: Date },
        expireAt: { type: Date },
        bucket: { type : Number },
        item: { type: String },
        email: { type: String },
    },
)

export const Item = mongoose.model('Item', Itemschema, 'item');
