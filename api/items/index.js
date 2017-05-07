import express from 'express';
import _ from 'lodash';
import mongoose from 'mongoose';
import Item from './itemModel';
import config from './../../config';

//mongoose.createConnection(config.mongoDb);

const router = express.Router();

router.get('/', (req, res) => {
	Item.find((err, items) => {
	if(err) {return handleError(res, err);}
	return res.send(items);
	});

});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	   Item.findById(id, function (err, item) {
        if(err) { return handleError(res, err); }
        return res.send({item});
  } );
});

router.post('/', (req,res) => {
	
	const newItem = req.body;
	if(newItem){
	Item.create(newItem, (err, item) => {
	if(err) {return handleError(res, err); }	
	return res.status(201).send({item});
	});
	}else{
	return handleError(res, err);	
	}
	

});

router.put('/:id', (req, res) => {
	let key = req.params.id;
	let updateItem = req.body;
	
	if(updateItem._id) {delete updateItem._id;}//_id 
	Item.findById(req.params.id, (err, item) => {//might need to change to req.params._id if mongo defaults to using that id in searches
		if(err) {return handleError(res, err);}
		if(!item) {return res.send(404);}
		const updated = _.merge(item, updateItem);
		updated.save((err) => {
			if(err) {return handleError(res,err);}
			return res.send(item);
		});
	});
	});
	



router.delete('/:id', (req, res)=>{
let key = req.params.id;
Item.findById(key, (err, item)=> {
if(err) {return res.status(400).send(err);}
if(!item) {return res.send(404); }
item.remove(err => {
	if(err) {return handleError(res, err);}
	return res.send(item);
});	
});	
});		

function handleError(res, err) {
  return res.status(500).send(err);
};


export default router;