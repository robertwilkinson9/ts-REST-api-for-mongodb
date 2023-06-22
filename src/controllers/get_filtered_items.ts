import { Request, Response } from "express";

import { Item } from '../models/item-model';

export const getFilteredItems = async (req: Request, res: Response) => {
  if (req) {
    const items = await Item.find( { } );
    const no_email_items = items.map((it) =>
      {
        const { _id, email, booking_start, booking_end, expireAt, bucket, item} = it;
        console.log(`EMAIL is ${email}, ITEM is ${item}`)
        return {
          "_id": _id,
          "booking_start": booking_start,
          "booking_end": booking_end, 
          "expireAt": expireAt,
          "bucket": bucket,
          "item": item} 
      } 
    );
    if (items.length) {
        return res.status(200).json({ success: true, data: no_email_items })
    } else {
        return res
            .status(404)
            .json({ success: false, error: `No Items found` })
    }
  }
}
