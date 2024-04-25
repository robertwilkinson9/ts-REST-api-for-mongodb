import configData from "../../config/config.json";

import express from 'express';
import {createItem} from '../controllers/create_item';
import {updateItem} from '../controllers/update_item';
import {deleteItem} from '../controllers/delete_item';
import {getItems} from '../controllers/get_items';
import {getFilteredItems} from '../controllers/get_filtered_items';
import {getItemById} from '../controllers/get_item_by_id';

export const itemRouter = express.Router()

itemRouter.post('/' + configData.ITEM_NAME, createItem)
itemRouter.put('/' + configData.ITEM_NAME + '/:id', updateItem)
itemRouter.delete('/' + configData.ITEM_NAME + '/:id', deleteItem)
itemRouter.get('/' + configData.ITEM_NAME + '/:id', getItemById)
itemRouter.get('/' + configData.ITEM_NAME + 's', getFilteredItems)
if (configData.SHOW_ALL !== false) {
  itemRouter.get('/all_' + configData.ITEM_NAME + 's', getItems)
}
