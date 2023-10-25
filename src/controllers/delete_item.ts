import { Request, Response } from "express";

import { Item } from '../models/item-model';

export const deleteItem = async (req: Request, res: Response) => {

   res.set('Access-Control-Allow-Origin', req.headers.origin);
   res.set('Vary', 'Origin');
   res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
/*
   res.header('Access-Control-Allow-Origin', req.headers.origin);
   res.header('Vary', 'Origin');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
*/

   const toDelete = await Item.findOneAndDelete({ _id: req.params.id })
   if (!toDelete) {
     return res
     .status(404)
     .json({ success: false, error: `Item not found` })
   }

   return res.status(200).json({ success: true, data: toDelete })
}
