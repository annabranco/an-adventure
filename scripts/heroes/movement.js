'use strict';
/* global dungeon limitRight:true limitBottom:true */

let moveIconDown;
let moveIconUp;
let moveIconRight;
let moveIconLeft;
let currentPositionX;
let currentPositionY;
let heroStepSize = 48 + (window.innerHeight * 0.1);

const hero = document.querySelector('.hero');

// Define el tamaño del personaje, de acuerdo con la pantalla, con un mínimo de 48px

if (window.innerHeight * 0.1 > 48) {
  hero.style.transform = `scale(${1 + (window.innerHeight * 0.001)}`;
}

// if (window.innerHeight * 0.1 <= 48) {
//   heroSize = 48;
//   hero.style.height = hero.style.width = '48px';
//   hero.style.backgroundPosition = 'top right -48px';
// } else {
//   heroSize = window.innerHeight * 0.1;
//   hero.style.height = hero.style.width = heroSize + 'px';
//   hero.style.backgroundPosition = `top right - $ {heroSize}px`;
// }

// Define la imagem inicial del personaje
moveIconDown = moveIconUp = moveIconRight = moveIconLeft = 1;

// Define la posición inicial del personaje.
// 5 por los borders top y left
currentPositionX = currentPositionY = 5;


// Imágenes para dar movimiento al personaje
const faceDown = ['top right', 'top right -96px', 'top right -48px'];
const faceUp = ['top 48px right', 'top 48px right -96px', 'top 48px right -48px'];
const faceRight = ['top 96px right', 'top 96px right -96px', 'top 96px right -48px'];
const faceLeft = ['top 144px right', 'top 144px right -96px', 'top 144px right -48px'];

// const faceDown = [`top right `, `top right - $ {2 * heroSize}px `, `top right - $ {  heroSize}px `];
// const faceUp = [`top $ {  heroSize}px right `, `top $ {  heroSize}px right - $ {  2 * heroSize}px `, `top $ {  heroSize}px right - $ {  heroSize}px `];
// const faceRight = [`top $ {  2 * heroSize}px right `, `top $ {  2 * heroSize}px right -$ {  2 * heroSize}px `, `top $ {  2 * heroSize}px right - $ {  heroSize}px `];
// const faceLeft = [`top $ {  3 * heroSize}px right `, `top $ {  3 * heroSize}px right -${  2 * heroSize}px `, `top $ {  3 * heroSize}px right - $ {  heroSize}px `];


// ---- MOVIMIENTOS
const heroMoveUp = () => {
  currentPositionY = hero.offsetTop;
  if (currentPositionY === 5) {
    return;
  } else {
    hero.style.top = currentPositionY - heroStepSize + 'px';
    hero.style.backgroundPosition = faceUp;

    if (moveIconUp === -1) {
      moveIconUp = 1;
    }
    setTimeout(function() {
      hero.style.backgroundPosition = faceUp[2];
    }, 300);
    hero.style.backgroundPosition = faceUp[moveIconUp];
    currentPositionY = hero.offsetTop;
    console.log('x: ' + currentPositionX + ', y: ' + currentPositionY);
    moveIconUp -= 1;
  }
};

const heroMoveDown = () => {
  var limitBottom = dungeon.offsetHeight;
  currentPositionY = hero.offsetTop;
  if (currentPositionY >= limitBottom - 100) { // no entiendo porqué -50, pero fue lo que funcionó para limitar el movimiento para bajo
    return;
  } else {
    hero.style.top = currentPositionY + heroStepSize + 'px';

    if (moveIconDown === -1) {
      moveIconDown = 1;
    }
    setTimeout(function() {
      hero.style.backgroundPosition = faceDown[2];
    }, 300);
    hero.style.backgroundPosition = faceDown[moveIconDown];
    currentPositionY = hero.offsetTop;
    console.log('x: ' + currentPositionX + ', y: ' + currentPositionY);
    moveIconDown -= 1;
  }
};

const heroMoveRight = () => {
  limitRight = dungeon.offsetWidth;
  currentPositionX = hero.offsetLeft;
  if (currentPositionX >= limitRight - 100) { // también no entiendo porqué -60, pero fue lo que funcionó
    return;
  } else {
    hero.style.left = currentPositionX + heroStepSize + 'px';
    hero.style.backgroundPosition = faceRight;

    if (moveIconRight === -1) {
      moveIconRight = 1;
    }
    setTimeout(function() {
      hero.style.backgroundPosition = faceRight[2];
    }, 300);
    hero.style.backgroundPosition = faceRight[moveIconRight];
    currentPositionX = hero.offsetLeft;
    console.log('x: ' + currentPositionX + ', y: ' + currentPositionY);
    moveIconRight -= 1;
  }
};

const heroMoveLeft = () => {
  currentPositionX = hero.offsetLeft;
  if (currentPositionX === 5) {
    return;
  } else {
    hero.style.left = currentPositionX - heroStepSize + 'px';
    hero.style.backgroundPosition = faceLeft;

    if (moveIconLeft === -1) {
      moveIconLeft = 1;
    }
    setTimeout(function() {
      hero.style.backgroundPosition = faceLeft[2];
    }, 300);
    hero.style.backgroundPosition = faceLeft[moveIconLeft];
    currentPositionX = hero.offsetLeft;
    console.log('x: ' + currentPositionX + ', y: ' + currentPositionY);
    moveIconLeft -= 1;
  }
};

// Función que mover de acuerdo con las teclas
const keys = event => {
  if (event.key === 's' || event.key === 'ArrowDown') {
    heroMoveDown();
  }
  if (event.key === 'w' || event.key === 'ArrowUp') {
    heroMoveUp();
  }
  if (event.key === 'd' || event.key === 'ArrowRight') {
    heroMoveRight();
  }
  if (event.key === 'a' || event.key === 'ArrowLeft') {
    heroMoveLeft();
  }
};


// EventListener para captar las teclas
window.addEventListener('keydown', keys);
