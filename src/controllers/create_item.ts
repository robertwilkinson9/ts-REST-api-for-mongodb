import { Request, Response } from "express";

import { Item } from '../models/item-model';

import { ItemData } from '../interfaces';

interface ItemRequest extends Request {
  body: ItemData;
}

export const createItem = (req: ItemRequest, res: Response) => {
    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      console.log("OPTIONS detected");
      res.set('Access-Control-Allow-Origin', req.headers.origin);
      res.set('Access-Control-Expose-Headers', 'Access-Control-Allow-Origin')
      res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
      res.send(200);
    }

    const body = req.body 

    console.log(`req.headers.origin is ${req.headers.origin}`)

//    console.log("RESPONSE");
//   console.dir(res);

    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Expose-Headers', 'Access-Control-Allow-Origin')
    res.set('Vary', 'Origin');
    res.set('X-Woffle', "Wibble");
    res.set('Access-Control-Expose-Headers', 'X-Woffle')
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Woffle, Access-Control-Allow-Origin");

// response.setHeader('Content-Type', 'application/json')
/*
    console.log("RESPONSE");
    console.dir(res);
*/

    res.set('X-Woffle-2', "Wibble2");
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Expose-Headers', 'Access-Control-Allow-Origin')
    res.set('Vary', 'Origin');
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Woffle-2, Access-Control-Allow-Origin");

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an item',
        })
    }

    const item = new Item(body)

    console.log('X-Woffle-3', "Wibble3");
    res.set('X-Woffle-3', "Wibble3");
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Expose-Headers', 'Access-Control-Allow-Origin')
    res.set('Vary', 'Origin');
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Woffle-3, Access-Control-Allow-Origin");

    if (!item) {
        const err = "No item created from request";
        return res.status(400).json({ success: false, error: err })
    }

    item
        .save()
        .then(() => {
            res.set('X-Woffle-4', "Wibble4");
            res.set('Access-Control-Allow-Origin', req.headers.origin);
            res.set('Access-Control-Expose-Headers', 'Access-Control-Allow-Origin')
            res.set('Vary', 'Origin');
//            res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Woffle-4, Access-Control-Allow-Origin");
/*
            res.header('X-Woffle-2', "Wibble2");
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Vary', 'Origin');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
*/

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
