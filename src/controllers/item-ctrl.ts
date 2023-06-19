import { Request, Response } from "express";
import { Types } from 'mongoose';

import { Item } from '../models/item-model';

export const createItem = (req: Request, res: Response) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a item',
        })
    }

    const item = new Item(body)

    if (!item) {
        const err = "No item created frtom request";
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
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Item not created!',
            })
        })
}


const toObjectId = (st: string) => {return new Types.ObjectId(st);};

export const updateItem = async (req: Request, res: Response) => {
    const body = req.body

    console.log("body is ");
    console.log(body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    const object_params_id = toObjectId(req.params.id);
    const filter = { _id: object_params_id };
    let mydata;
    await Item.findOneAndUpdate(filter, body, {new: true})
      .then((result) => {
        mydata=result;
      })
      .catch((err) => {
       console.log(err);
      });

    if (mydata) {
      console.log("mydata is ");
      console.log(mydata);
    }

    return res.status(200).json({ success: true, data: mydata })
}

export const deleteItem = async (req: Request, res: Response) => {
   console.log("toDelete.id is ");
   console.log(req.params.id);
   const toDelete = await Item.findOneAndDelete({ _id: req.params.id })
   if (!toDelete) {
     return res
     .status(404)
     .json({ success: false, error: `Item not found` })
   }

   return res.status(200).json({ success: true, data: toDelete })
}

export const getItemById = async (req: Request, res: Response) => {
    console.log("getItemById.id is ");
    console.log(req.params.id);
    const item = await Item.findOne({ _id: req.params.id } )
    console.log("getItemById.length is ");
    console.log(getItemById.length);

    if (!item) {
      return res
      .status(404)
      .json({ success: false, error: `Item not found` })
    }
    return res.status(200).json({ success: true, data: item })
}

export const getItems = async (req: Request, res: Response) => {
  if (req) {
    const items = await Item.find( { } );
    console.log("items.length is ");
    console.log(items.length);
    if (items.length) {
      console.log("items[0].email is ");
      console.log(items[0].email);
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
