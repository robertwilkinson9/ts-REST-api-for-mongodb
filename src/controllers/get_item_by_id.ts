import { Request, Response } from "express";

import { Item } from '../models/item-model';

export const getItemById = async (req: Request, res: Response) => {
    const ORIGIN = req.headers.origin || "https://localhost";
    console.log(`getItemById ORIGIN is ${ORIGIN}`);

/*
    res.set('Access-Control-Allow-Origin', ORIGIN);
    res.set('Vary', 'Origin');
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
*/

    const item = await Item.findOne({ _id: req.params.id } )

    if (!item) {
      return res
      .status(404)
      .json({ success: false, error: `Item not found` })
    }
    return res.status(200).json({ success: true, data: item })
}
