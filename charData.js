import mongoose from 'mongoose';
import assert from 'assert';
import characterModel from './api/character/characterModel';
import config from './config';
	
	const character = 
	{
	id: "default",	
	strength: 5,	
	brains: 5,
	charm: 5,
	injuries: 0,
	stress: 0,
	scandal: 0
	};
	
	export const loadCharacters = () => {characterModel.find({}).remove(function() {
	characterModel.collection.insert(character, (err, docs)=>{
		if(err){
			console.log('failed to load Character data');
		}
		else{
		console.info('${items.length} characters were successfully stored.');	
		}
	})
});	
}	