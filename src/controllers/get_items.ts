import { Request, Response } from "express";

import { Item } from '../models/item-model';

export const getItems = async (req: Request, res: Response) => {
  if (req) {
    const ORIGIN = req.headers.origin || "127.0.0.1";
    console.log(`getItems ORIGIN is ${ORIGIN}`);

    res.set('Access-Control-Allow-Origin', ORIGIN);
    res.set('Vary', 'Origin');
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const items = await Item.find( { } );
    if (items.length) {
        return res.status(200).json({ success: true, data: items })
    } else {
        return res
            .status(404)
            .json({ success: false, error: `No Items found` })
    }
  }
}
