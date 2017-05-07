import mongoose from 'mongoose';
import assert from 'assert';
import itemModel from './api/items/itemModel';
import config from './config';
	
	const items = [
	{
	id: 'ironSword',	
	name: 'Iron Sword',
	text: 'A simple, iron sword',
	charges: 9
	},
	{
	id: 'woodShield',
	name: 'Wooden Shield',
	text: 'A simple wooden shield',
	charges: 12
	},
	{
	id: 'healPotion',
	name: 'Healing Potion',
    text: 'Heals you right up',
	charges: 2
	},
	{
	id: 'invisPotion',
	name: 'Potion of Invisibility',
    text: 'Makes you invisible for a few minutes',
	charges: 1
	},
	{
	id: 'cheese',
	name: 'Hunk of dry cheese',
	text: 'A piece of old, stale cheese. At least there is no mould on it',
	charges: 3
	}
	
	];
	
	export const loadItems = () => {itemModel.find({}).remove(function() {
	itemModel.collection.insert(items, (err, docs)=>{
		if(err){
			console.log('failed to load Item data');
		}
		else{
		console.info('${items.length} inventory items were successfully stored.');	
		}
	})
});	
}