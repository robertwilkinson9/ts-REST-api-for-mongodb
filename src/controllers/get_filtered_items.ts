import { Request, Response } from "express";

import { Item } from '../models/item-model';

import configData from "../config.json";

export const getFilteredItems = async (req: Request, res: Response) => {

  console.log(configData);

  if (req) {
    const items = await Item.find( { } );
    const export_items = items.map((it) =>
      {
        let out = {};
        const { _id, email, booking_start, booking_end, expireAt, bucket, item} = it;
        console.log(`EMAIL is ${email}, ITEM is ${item}`);
        const x = configData.EXPORTS.map((y) => {
          console.log(`ELEMENT is ${y}`)
          if (y in it) {
            const key = `${y}`;
            console.log("key = ", key);
            console.log(`FOUND ${y} in object, value is `);
            console.log(it[key]); 
            out[key] = it[key];
          }
        }); 
        console.log("X");
        console.log(out);
        return out;
/*
        return {
          "_id": _id,
          "booking_start": booking_start,
          "booking_end": booking_end, 
          "expireAt": expireAt,
          "bucket": bucket,
          "item": item} 
*/
      } 
    );
    if (items.length) {
        return res.status(200).json({ success: true, data: export_items })
    } else {
        return res
            .status(404)
            .json({ success: false, error: `No Items found` })
    }
  }
}
