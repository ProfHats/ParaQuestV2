import _ from 'lodash';


var Adventures = [
{
id: "start",
text: "You stand in a vast, white room with no features. Before you are two doors.",
previous: "",
	statGain: [],
next: [
{
id:"orangeRoom1",
btnTxt: "Open The Left Door"
},
{
 id:"earthRoom1",
 btnTxt: "Open The Right Door"
}
],
	tests: []
},
{
id: "orangeRoom1",
text: "The door swings open noiselessly, revealing a floor of orange tiles. The room you step into feels cool, and you notice strange shrines in alcoves hidden in the walls.",
previous: "start",
	statGain: [],
next: [
{
id:"orangeRoomShrine1",
btnTxt: "Inspect one of the Shrines"
},
{
id:"orangeRoom2",
btnTxt: "Walk to the other end of the room"	
}
],
	tests: []
},
{
id: "earthRoom1",
text: "The door heaves open slowly, with a horrific grinding noise. It is obviously very heavily rusted. At last it opens, and you see a room with an earthen floor, with copper pots strewn everywhere.",
previous: "start",
	statGain: [],
next: [
{
id: "earthRoomCopperPot",
btnTxt: "Pick up one of the pots"
},
{
id:"earthRoom2",
btnTxt: "Walk past the pots"	
}
],
	tests: []
},
{
id: "orangeRoomShrine1",
text: "All but one of the Shrines has been defaced. You do not recognise the statue within, though the abundant carvings of grapevines lead you to believe this figure is a wine lord of sorts. In a corner, someone has painted the words 'All Lions Abhor The Vine' in red. Could this be a clue?",
previous: "orangeRoom1",
	statGain: [],
next:[],
	tests: []
},
{
id: "orangeRoom2",
text: "As you cross the room, it becomes apparent that it is (or used to be) a temple of some sort. The walls are decorated with elaborate designs depicting serpents, clouds, and giants. It is not clear to you what any of this means, but eventually you come to the opposite end of the room.",	
previous: "orangeRoom1",
	statGain: [],
next:[
{
id: 'puzzleRoom1',
btnTxt: 'Go through the door to the next room'
}
],
	tests: []
},
{
id: "puzzleRoom1",
text: "The door opens, and you are faced with another room. This one is very small, more like a closet than anything else. On the opposite wall lies a door, made of green stone. It is devoid of decoration excepting the carven symbol of a lion. Below the lion are written these words: 'THOU MUST REPEL ME IF TO PASS THOU WISHEST'. You've heard of these kind of locks before - they're opened by speaking a particular word close to them. What will you say?",	
previous: 'orangeRoom2',
statGain: [],
next: [],
tests: [
{
name: 'I will say...',
answer: 'The Vine',
statRequired: 'form',
onSuccess: 'puzzleRoom1Success',
onFail: 'puzzleRoom1Fail'	
}
]
},

{
id: "earthRoomCopperPot",
text: "The pot bears the mark of a tiger's head, and is bright and burnished, as if it had recently been cleaned. Either this strange place is inhabited, or these pots are of very recent make. Of course, it's also possible that you have gone mad. Never a possibility to be discounted lightly.",	
previous: "earthRoom1",
	statGain: [],
next:[],
	tests: []
},
{
id: "earthRoom2",
text: "The earth is cool and dry beneath your feet. You cross the hallway and find a stone door at the other side of the room. It contains carved images of oranges. You attempt to open it, but it is locked, and you see no keyhole. Below the door are three carved images, different from the others. They depict a goat, a tiger, and an eagle. Are these clues to something?", 	
previous: "earthRoom1",
	statGain: [],
next:
[
{
id: "openDoorTestResult",
btnTxt: "Try to open the door"
}
],
	tests: []
},
{
id: "openDoorTestResult",
text: "How do you plan on opening this massive door?",
previous: "earthRoom2",
next:[
{
	
}
],
statGain:[],
tests: [
{
name: 'Open it with raw strength',
threshold: 5,
statRequired: 'strength',
onSuccess: 'door1STRPass',
onFail: 'door1STRFail'	
},
{
name: 'Try to deciper the meaning of the symbols',
threshold: 4,
statRequired: 'brains',
onSuccess: 'door1BRNPass',
onFail: 'door1BRNFail'	
}

] 	
},
{
id: 'door1STRPass',
text: 'You press your shoulder against the door and heave with all your might. The doors are heavy, but the hinges are rusted. With a final shove you push them aside.',	
previous: 'openDoorTestResult',
statGain: [{
type: 'strength',
amount: 1,
limit: 6
}], 
next:[
{
id: 'ladyChamber1',
btnTxt: 'Proceed through the ruined doors'	
}
],
		tests:[]
},
{
id: 'door1STRFail',
text: 'You were a fool to think that raw muscle could move a door this heavy. You heave and ho for a good ten minutes, but earn only bruises for your efforts.',	
previous: 'openDoorTestResult',
statGain: [{
type: 'injuries',
amount: 1,
limit: 3
}],
next:[
],
		tests:[]
},
{
id: 'door1BRNPass',
text: 'You carefully study each of the animal symbols, trying to remember the classes you took years ago on Classical Symbology. At last you remember - yes, yes, the Swan and the Tiger. You recall an old rhyme that lists animals, and try pressing on the symbols in that order. Gears screech, and the doors open just a crack...',	
previous: 'openDoorTestResult',
	statGain: [
	{
	type: 'brains',
	amount: 1,
	limit: 6
	}
	],
next:[
{
id: 'ladyChamber1',
btnTxt: 'Proceed through the ruined doors'	
}
],
		tests:[]
},
{
id: 'door1BRNFail',
text: 'You look at each of the symbols in turn, then you turn them over in your head again and again. Suddenly, a revelation! The tiger is surely a symbol for imperialism, and the dove..! You touch the carvings in a particular order, but all you get for your trouble is wasted time. You should probably think this through again',	
previous: 'openDoorTestResult',
	statGain: [
	{
	type: 'stress',
	amount: 1,
	limit: 2
	}
	],
next:[
],
		tests:[]
},
{
id: 'ladyChamber1',	
text: 'The room you enter is draped from top to bottom in fine carpets, tapestries, and pieces of furniture. Standing in the middle of it, staring at you in shock, is a young woman in a white dress. With her also is a grizzled-looking man with a cavalry saber strapped to his belt. It seems you have intruded upon a private conversation.',	
previous: 'openDoorTestResult',
statGain: [],
next:[
{
id:'prisonCell1',
btnTxt: 'Put your hands up and show you mean no harm'	
}
],
tests:[
{
name: 'Convince Them That You Belong Here',
threshold: 6,
statRequired: 'charm',
onSuccess: 'colCHRPass',
onFail: 'colCHRFail'
}
]
},
{
id: 'prisonCell1',
text: 'You are taken to a cold, damp, cell with iron bars. The only light comes in from a small grating in the ceiling. You are trapped here, until such a time as the creator writes more game for you to inhabit. Perhaps you can escape from your cell when that happens?',
previous: '',
 statGain: [],
 next: [],
 tests:[
 {
 name: 'Contemplate the meaning of Life',
 threshold: 8,
 statRequired: 'brains',
 onSuccess: 'contemplatePass',
 onFail: 'contemplateFail' 
 }
 ] 
},
{
id: 'contemplatePass',
text: 'You ponder for ages and ages. Nothing happens for a while, but then you begin to see. The ceiling seems to open up, and you become aware of something beyond...a Document, of sorts, or perhaps an Object? No, it feels more like a Model.',
previous: 'prisonCell1',
next:[],
 statGain: [
 {
 type: 'brains',
 amount: 1,
 limit: 999 
 }
 ],
tests:[] 
},
{
id: 'contemplateFail',
text: 'You think, and think, and think some more, until you feel like banging your head against the wall. Eventually, you do exactly that. Who said that thought broadens the mind? It has certainly broadened the hole in your head.',	
previous: 'prisonCell1',
next: [],
 statGain: [
 {
 type: 'stress',
 amount: 1,
 limit: 999 
 },
 {
 type: 'injury',
 amount: 1,
 limit: 999 
 }
 ],
 tests:[]
},
{
id: 'colCHRPass',
text: 'Your Silver Tongue and quick wit do you well, as you explain to the Colonel that you are in fat his long lost nephew from over the seas, come back to the family after learning of your true ancestry. Surprisingly, the Colonel and the Lady both accept your bold lie, and you are accepted into the family. Your life is cushy. And that, I am afraid, is where this story must end for now. Perhaps the creator will find time to return in future, and there will be more to your life than cakes and horseback riding. I suppose you could have done worse, no?',
previous: '',
next: [],
statGain: [],
tests: []	
},
{
id: 'colCHRFail',
text: 'Your cock-and-bull story is not believed. The Colonel marches you off to the castle cells.',
previous: '',
next: [
{
id:'prisonCell1',
btnTxt: 'Accept your fate'
}
],
statGain: [],
tests: []		
}
];

     export const AdventureAPI = {
         getAll : function() {
            return Adventures ;
          },
		  getAdventure : function(id) {
			             var result = null ;
             var index = _.find(Adventures, function(adv) {
                    return adv.id === id;
                    } );     
             if (index !== -1) {                 
                result = index;
                    }
            return result ;  
		  },
		 statTest : function(stat, threshold50pc) {
			var modifier = stat - threshold50pc;
			var rando = Math.floor(Math.random() * (1,10)) + 1;
			var temp = rando + modifier;
			console.log("The character rolled a " + rando + ", and had a relevant stat of " + stat + " on a threshold of " + threshold50pc + ", resulting in a modifier of " + modifier);
			if(temp>5){
				return true;
			}
			else {
				return false;
			}
		 },
		formTest : function(guess, answer) {
		if(guess === answer){
		return true;	
		}
		else {
			return false;
		}
		} 
		
	 }
	 
export default Adventures;
