import express from 'express';
//import adventures from './AdventuresAPI';
import _ from 'lodash';
import mongoose from 'mongoose';
import Adventure from './adventureModel';
import config from './../../config';

mongoose.connect(config.mongoDb);

const router = express.Router();

router.get('/', (req, res) => {
	Adventure.find((err, advs) => {
	if(err) {return handleError(res, err);}
	return res.send(advs);
	});
	/*res.send({adventures: adventures});*/

});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	   Adventure.findById(id, function (err, adv) {
        if(err) { return handleError(res, err); }
        return res.send({adv});
  } );
});

router.post('/', (req,res) => {
	
	const newAdv = req.body;
	if(newAdv){
	Adventure.create(newAdv, (err, adv) => {
	if(err) {return handleError(res, err); }	
	return res.status(201).send({adv});
	});
	}else{
	return handleError(res, err);	
	}
	
	/*adventures.push({id:newAdv.id, text:newAdv.text, previous:newAdv.previous, next:newAdv.next, tests:newAdv.tests});	
	res.status(201).send({message: "Adventure Created"});
	}else{
	res.status(400).send({message: "Unable to find Adventure."});	
	}
	*/
});

router.put('/:id', (req, res) => {
	let key = req.params.id;
	let updateAdv = req.body;
	
	if(updateAdv._id) {delete updateAdv.id;}//_id 
	Adventure.findById(req.params.id, (err, adv) => {
		if(err) {return handleError(res, err);}
		if(!adv) {return res.send(404);}
		const updated = _.merge(adv, updateAdv);
		updated.save((err) => {
			if(err) {return handleError(res,err);}
			return res.send(adv);
		});
	});
	});
	
	/*var index = _.findIndex(adventures, adventure => {
		return adventure.id ===key;
	});
	if(index!==""){
	adventures.splice(index, 1, {id:updateAdv.id, text:updateAdv.text, previous:updateAdv.previous, next:updateAdv.next, tests:updateAdv.tests});	
	res.status(200).send({message: "Adventure Updated"});
	}
	else{
	res.status(400).send({message: "Nope. Couldn't find the relevant Adventure. Are you sure you wired up the .equals() logic right?"});	
	}
	*/



router.delete('/:id', (req, res)=>{
let key = req.params.id;
Adventure.findById(key, (err, adventure)=> {
if(err) {return res.status(400).send(err);}
if(!adventure) {return res.send(404); }
adventure.remove(err => {
	if(err) {return handleError(res, err);}
	return res.send(adventure);
});	
});	
});		

function handleError(res, err) {
  return res.status(500).send(err);
};

export default router;