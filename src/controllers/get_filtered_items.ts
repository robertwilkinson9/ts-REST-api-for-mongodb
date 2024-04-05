import { Request, Response } from "express";

import { Item } from '../models/item-model';

import configData from "../../config/config.json";

export const getFilteredItems = async (req: Request, res: Response) => {
  if (req) {
    let items 
    if (configData.EXPORTS && configData.EXPORTS.length) {
      items = await Item.find( { }, configData.EXPORTS );
    } else {
      items = await Item.find( { } );
    }
    if (items.length) {
        return res.status(200).json({ success: true, data: items })
    } else {
        return res
            .status(404)
            .json({ success: false, error: `No Items found` })
    }
  }
}
