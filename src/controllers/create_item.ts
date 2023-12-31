import { Request, Response } from "express";

import { Item } from '../models/item-model';

import { ItemData } from '../interfaces';

interface ItemRequest extends Request {
  body: ItemData;
}

export const createItem = (req: ItemRequest, res: Response) => {

    const body = req.body 

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an item',
        })
    }

    const item = new Item(body)

    if (!item) {
        const err = "No item created from request";
        return res.status(400).json({ success: false, error: err })
    }

    item
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: item._id,
                message: 'Item created!',
            })
        })
        .catch((error: unknown) => {
            return res.status(400).json({
                error,
                message: 'Item not created!',
            })
        })
}
