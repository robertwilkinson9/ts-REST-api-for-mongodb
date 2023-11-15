import { Request, Response } from "express";

import { Item } from '../models/item-model';

export const deleteItem = async (req: Request, res: Response) => {
   const toDelete = await Item.findOneAndDelete({ _id: req.params.id })
   if (!toDelete) {
     return res
     .status(404)
     .json({ success: false, error: `Item not found` })
   }

   return res.status(200).json({ success: true, data: toDelete })
}
