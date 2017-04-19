var Adventures = [
{
id: "area1start",
text: "You stand in a vast, white room with no features. Before you are two doors.",
previous: "",
next: [
{
id:"area1left",
btnTxt: "Open The Left Door"
},
{
 id:"area1right",
 btnTxt: "Open The Right Door"
}
]
},
{
id: "area1left",
text: "The door swings open noiselessly, revealing a floor of orange tiles. The room you step into feels cool, and you notice strange shrines in alcoves hidden in the walls.",
previous: "area1start",
next: []
},
{
id: "area1right",
text: "The door heaves open slowly, with a horrific grinding noise. It is obviously very heavily rusted. At last it opens, and you see a room with an earthen floor, with copper pots strewn everywhere.",
previous: "area1start",
next: []
}
];

export default Adventures;