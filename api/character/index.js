import express from 'express';
//import adventures from './AdventuresAPI';
import _ from 'lodash';
import mongoose from 'mongoose';
import Character from './characterModel';
import config from './../../config';

//mongoose.connect(config.mongoDb);

const router = express.Router();

router.get('/', (req, res) => {
	Character.find((err, chars) => {
	if(err) {return handleError(res, err);}
	return res.send(chars);
	});
	/*res.send({adventures: adventures});*/

});

router.put('/:id', (req, res) => {
	let key = req.params.id;
	let updateChar = req.body;
		
		if(updateChar._id) {delete updateChar._id;}//_id 
	Character.findById(req.params.id, (err, cha) => {
		if(err) {return handleError(res, err);}
		if(!cha) {return res.send(404);}
		const updated = _.merge(cha, updateChar);
		updated.save((err) => {
			if(err) {return handleError(res,err);}
			return res.send(cha);
		});
	});
});

function handleError(res, err) {
  return res.status(500).send(err);
};


export default router;