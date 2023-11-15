import { Request, Response } from "express";

import { Item } from '../models/item-model';

export const getItems = async (req: Request, res: Response) => {
  if (req) {
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
