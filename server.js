import config from './config';
import express from 'express';
import adventureRouter from './api/adventures';
import bodyParser from 'body-parser';

const server = express();
server.use(express.static('src/public'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded());
server.use('/api/adventures', adventureRouter);


//route for simple greeting
//notice that in this case, the route is defined in server.js, while with 
//adventureRouter we determine that in another place and import it
server.get('/greeting',(req,res)=>{
res.end('Greetings, my name is Genji, I need healing!');	
});

server.listen(config.port, () => {
  console.info('Express listening on port', config.port);
});