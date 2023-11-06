import { Request, Response } from "express";

import { Item } from '../models/item-model';

export const deleteItem = async (req: Request, res: Response) => {
//   const ORIGIN = req.headers.origin || "https://127.0.0.1";
   const ORIGIN = req.headers.origin || "https://localhost";
   console.log(`deleteItem ORIGIN is ${ORIGIN}`);

   res.set('Access-Control-Allow-Origin', ORIGIN);
//   res.set('Access-Control-Allow-Origin', 'https://localhost');
   res.set('Vary', 'Origin');
   res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

   const toDelete = await Item.findOneAndDelete({ _id: req.params.id })
   if (!toDelete) {
     return res
     .status(404)
     .json({ success: false, error: `Item not found` })
   }

   return res.status(200).json({ success: true, data: toDelete })
}
