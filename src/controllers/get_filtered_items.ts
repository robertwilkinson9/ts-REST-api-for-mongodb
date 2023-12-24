import { Request, Response } from "express";

import { Item } from '../models/item-model';

import configData from "../../config/config.json";

export const getFilteredItems = async (req: Request, res: Response) => {
  if (req) {
    const items = await Item.find( { } );
    let export_items = items;
    if (configData.EXPORTS && configData.EXPORTS.length) {
      export_items = items.map((it) =>
        {
          let filtered = {};
          configData.EXPORTS.filter((filter) => {
            if (filter in it) {
              filtered[filter] = it[filter];
            }
          });
          return filtered;
        }
      );
    }
    if (items.length) {
        return res.status(200).json({ success: true, data: export_items })
    } else {
        return res
            .status(404)
            .json({ success: false, error: `No Items found` })
    }
  }
}
