'use strict';
/* global dungeon limitRight:true limitBottom:true objectives checkObjectives */

let moveIconDown;
let moveIconUp;
let moveIconRight;
let moveIconLeft;
let currentPositionX;
let currentPositionY;
const audioSteps = new Audio('../audio/steps-stone.mp3');
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
  // currentPositionX = hero.offsetLeft;
  currentPositionY = hero.offsetTop;
  if (currentPositionY <= heroStepSize) {
    return;
  } else {
    audioSteps.currentTime = 0;
    audioSteps.play();
    hero.style.top = currentPositionY - heroStepSize + 'px';
    hero.style.backgroundPosition = faceUp;

    setTimeout(function() {
      currentPositionY = hero.offsetTop;
      console.log('x: ' + currentPositionX + ', y: ' + currentPositionY);
    }, 600);

    if (moveIconUp === -1) {
      moveIconUp = 1;
    }
    setTimeout(function() {
      hero.style.backgroundPosition = faceUp[2];
    }, 300);
    hero.style.backgroundPosition = faceUp[moveIconUp];
    moveIconUp -= 1;
  }
};

const heroMoveDown = () => {
  checkObjectives();
  limitBottom = (dungeon.offsetHeight - heroStepSize - 48);
  // currentPositionX = hero.offsetLeft;
  currentPositionY = hero.offsetTop;
  if (currentPositionY >= limitBottom) {
    objectives['Reach bottom edge'] = 'YES';
    return;
  } else {
    audioSteps.currentTime = 0;
    audioSteps.play();
    hero.style.top = currentPositionY + heroStepSize + 'px';
    setTimeout(function() {
      currentPositionY = hero.offsetTop;
      console.log('x: ' + currentPositionX + ', y: ' + currentPositionY);

    }, 600);

    if (moveIconDown === -1) {
      moveIconDown = 1;
    }
    setTimeout(function() {
      hero.style.backgroundPosition = faceDown[2];
    }, 300);
    hero.style.backgroundPosition = faceDown[moveIconDown];
    moveIconDown -= 1;
  }
};

const heroMoveRight = () => {
  checkObjectives();
  limitRight = (dungeon.offsetWidth - heroStepSize - 48);
  currentPositionX = hero.offsetLeft;
  // currentPositionY = hero.offsetTop;
  if (currentPositionX >= limitRight) {
    objectives['Reach right edge'] = 'YES';
    return;
  } else {
    audioSteps.currentTime = 0;
    audioSteps.play();
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
  // currentPositionY = hero.offsetTop;
  if (currentPositionX <= heroStepSize) {
    return;
  } else {
    audioSteps.currentTime = 0;
    audioSteps.play();
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


const moveButtons = document.querySelectorAll('.button__move');

const moveByConsole = event => {
  const buttonClicked = event.currentTarget;

  buttonClicked.firstChild.classList.add('move-active');
  setTimeout(function() {
    buttonClicked.firstChild.classList.remove('move-active');
  }, 500);

  if (buttonClicked.classList.contains('move--up')) {
    heroMoveUp();
  } else if (buttonClicked.classList.contains('move--down')) {
    heroMoveDown();
  } else if (buttonClicked.classList.contains('move--left')) {
    heroMoveLeft();
  } else if (buttonClicked.classList.contains('move--right')) {
    heroMoveRight();
  }
};

moveButtons.forEach(moveButton => {
  moveButton.addEventListener('click', moveByConsole);
});
