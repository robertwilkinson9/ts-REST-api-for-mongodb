import express,{ Request, Response } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from "./db/index";
import { itemRouter } from './routes/item-router';

const app = express()
const apiPort = 5179

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req: Request, res:Response) => {
    console.log(req);
    res.send('Hello World!')
})

app.use('/api', itemRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
