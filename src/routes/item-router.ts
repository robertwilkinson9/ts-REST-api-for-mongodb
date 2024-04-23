import configData from "../../config/config.json";

import express from 'express';
import {createItem} from '../controllers/create_item';
import {updateItem} from '../controllers/update_item';
import {deleteItem} from '../controllers/delete_item';
import {getItems} from '../controllers/get_items';
import {getFilteredItems} from '../controllers/get_filtered_items';
import {getItemById} from '../controllers/get_item_by_id';

export const itemRouter = express.Router()

itemRouter.post('/' + configData.COLLECTION, createItem)
itemRouter.put('/' + configData.COLLECTION + '/:id', updateItem)
itemRouter.delete('/' + configData.COLLECTION + '/:id', deleteItem)
itemRouter.get('/' + configData.COLLECTION + '/:id', getItemById)
itemRouter.get('/' + configData.COLLECTION + 's', getFilteredItems)
if (configData.SHOW_ALL !== false) {
  itemRouter.get('/all_' + configData.COLLECTION + 's', getItems)
}
