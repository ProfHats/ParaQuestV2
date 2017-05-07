import config from './config';
import express from 'express';
import adventureRouter from './api/adventures';
import itemRouter from './api/items';
import charRouter from './api/character';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {loadAdventures} from './advData';
import {loadItems} from './itemData';
import {loadCharacters} from './charData';

//Connect to Mongo
mongoose.createConnection(config.mongoDb);
//Populate DB with sample data
if(config.seedDb){
loadAdventures();
loadItems();
loadCharacters();	
}

const server = express();
server.use(express.static('src/public'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded());
server.use('/api/adventures', adventureRouter);
server.use('/api/items', itemRouter);
server.use('/api/character', charRouter);


//route for simple greeting
//notice that in this case, the route is defined in server.js, while with 
//adventureRouter we determine that in another place and import it
server.get('/greeting',(req,res)=>{
res.end('Greetings, my name is Genji, I need healing!');	
});

server.listen(config.port, () => {
  console.info('Express listening on port', config.port);
});