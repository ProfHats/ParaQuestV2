import express from 'express';
import adventures from './AdventuresAPI';
import _ from 'lodash';

const router = express.Router();

router.get('/', (req, res) => {
	res.send({adventures: adventures});
	
});

router.post('/', (req,res) => {
	let newAdv = req.body;
	if(newAdv){
	adventures.push({id:newAdv.id, text:newAdv.text, previous:newAdv.previous, next:newAdv.next, tests:newAdv.tests});	
	res.status(201).send({message: "Adventure Created"});
	}else{
	res.status(400).send({message: "Unable to find Adventure."});	
	}
});

router.put('/:id', (req, res) => {
	let key = req.params.id;
	let updateAdv = req.body;
	var index = _.findIndex(adventures, adventure => {
		return adventure.id ===key;
	});
	if(index!==""){
	adventures.splice(index, 1, {id:updateAdv.id, text:updateAdv.text, previous:updateAdv.previous, next:updateAdv.next, tests:updateAdv.tests});	
	res.status(200).send({message: "Adventure Updated"});
	}
	else{
	res.status(400).send({message: "Nope. Couldn't find the relevant Adventure. Are you sure you wired up the .equals() logic right?"});	
	}
});

router.delete('/:id', (req, res)=>{
let key = req.params.id;
var elements = _.remove(adventures,
		adventure => {
			return adventure.id === key;
		});
if(elements){
res.status(200).send({message:"Adventure deleted"});
}else{
res.status(400).send({message:"Unable to find Adventure. No Adv was deleted."}) 	
}	
});		


export default router;