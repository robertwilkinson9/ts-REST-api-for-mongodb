import { Request, Response } from "express";

import { Item } from '../models/item-model';

export const getItemById = async (req: Request, res: Response) => {
    const item = await Item.findOne({ _id: req.params.id } )

    if (!item) {
      return res
      .status(404)
      .json({ success: false, error: `Item not found` })
    }
    return res.status(200).json({ success: true, data: item })
}
