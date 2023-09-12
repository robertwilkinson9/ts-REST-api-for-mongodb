import { Request, Response } from "express";
import { Types } from 'mongoose';

import { Item } from '../models/item-model';

import { ItemData } from '../interfaces';

interface ItemRequest extends Request {
  body: ItemData;
}

const toObjectId = (st: string) => {return new Types.ObjectId(st);};

export const updateItem = async (req: ItemRequest, res: Response) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    const object_params_id = toObjectId(req.params.id);
    const filter = { _id: object_params_id };
    await Item.findOneAndUpdate(filter, body, {new: true})
      .then((result) => {
        return res.status(200).json({ success: true, data: result })
      })
      .catch((err: unknown) => {
       console.log(err);
       return res.status(400).json({ success: false })
      });
}
