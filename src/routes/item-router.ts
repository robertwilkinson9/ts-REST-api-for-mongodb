import configData from "../config.json";

import express from 'express';
import {createItem} from '../controllers/create_item';
import {updateItem} from '../controllers/update_item';
import {deleteItem} from '../controllers/delete_item';
import {getItems} from '../controllers/get_items';
import {getFilteredItems} from '../controllers/get_filtered_items';
import {getItemById} from '../controllers/get_item_by_id';

export const itemRouter = express.Router()

itemRouter.post('/item', createItem)
itemRouter.put('/item/:id', updateItem)
itemRouter.delete('/item/:id', deleteItem)
itemRouter.get('/item/:id', getItemById)
itemRouter.get('/items', getFilteredItems)
if (configData.SHOW_ALL !== false) {
  itemRouter.get('/all_items', getItems)
}
