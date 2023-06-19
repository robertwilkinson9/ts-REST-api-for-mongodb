import express from 'express';
import {createItem, updateItem, deleteItem, getItems, getItemById} from '../controllers/item-ctrl';

export const itemRouter = express.Router()

itemRouter.post('/item', createItem)
itemRouter.put('/item/:id', updateItem)
itemRouter.delete('/item/:id', deleteItem)
itemRouter.get('/item/:id', getItemById)
itemRouter.get('/items', getItems)
