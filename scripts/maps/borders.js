'use strict';


const dungeon = document.querySelector(".dungeon");


let limitRight = dungeon.offsetWidth;
let limitBottom = dungeon.offsetHeight;

console.log("Playable area: " + limitRight + " x " + limitBottom);
