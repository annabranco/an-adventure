'use strict';


const audioCheck = new Audio('audio/check.mp3');
const audiovictoryMusic = new Audio('audio/victoryMusic.mp3');


let objectives = {
  'Reach right edge': 'not accomplished',
  'Reach bottom edge': 'not accomplished'
};

const theEnd = () => {
  document.querySelector('.main__background').style.display = 'block';
  document.querySelector('.main__background').style.backgroundColor = 'black';
  const thankYouH2 = document.createElement('h2');
  thankYouH2.classList.add('victory--theEnd');

  const thankYou = document.createTextNode('Thank you very much for playing it!');
  thankYouH2.append(thankYou);
  document.querySelector('.main__background').append(thankYouH2);

  const authorDIV = document.createElement('div');
  authorDIV.classList.add('authorDIV');

  const authorName = document.createElement('h1');
  const authorAB = document.createTextNode('Anna Branco');
  authorName.append(authorAB);
  authorName.classList.add('authorName');

  const authorTwitter = document.createElement('a');
  authorTwitter.href = 'https://twitter.com/AnyaBranco';
  const authorTwitterIcon = document.createElement('i');
  authorTwitter.classList.add('fab', 'fa-twitter', 'socialIcons');
  authorTwitter.append(authorTwitterIcon);

  const authorFacebook = document.createElement('a');
  authorFacebook.href = 'https://www.facebook.com/anya.branco';
  const authorFacebookIcon = document.createElement('i');
  authorFacebook.classList.add('fab', 'fa-facebook-f', 'socialIcons');
  authorFacebook.append(authorFacebookIcon);

  const authorGithub = document.createElement('a');
  authorGithub.href = 'https://github.com/annabranco';
  const authorGithubIcon = document.createElement('i');
  authorGithub.classList.add('fab', 'fa-github', 'socialIcons');
  authorGithub.append(authorGithubIcon);


  authorDIV.append(authorTwitter, authorFacebook, authorGithub);
  document.querySelector('.main__background').append(authorName, authorDIV);
};

const checkObjectives = () => {

  Object.values(objectives);

  if (Object.values(objectives).filter(objective => objective === 'not accomplished').length === 0) {
    victory();
  }
};

const victory = () => {

  audiovictoryMusic.play();
  document.querySelector('.main__background').style.display = 'block';
  let timeLapseForObjectivesCheck = 0;

  const body = document.querySelector('body');

  const victoryBox = document.createElement('div');
  victoryBox.classList.add('victory--box');
  body.append(victoryBox);

  const victoryTitle = document.createElement('h1');
  victoryTitle.classList.add('victory--title');
  victoryBox.append(victoryTitle);

  const victoryTitleText = document.createTextNode('Victory!');
  victoryTitle.append(victoryTitleText);

  const victoryPar = document.createElement('p');
  victoryPar.classList.add('victory--text');
  victoryTitle.append(victoryPar);

  const victoryImg = document.createElement('img');
  victoryImg.classList.add('victory--img');
  victoryImg.src = 'images/victory1.png';
  victoryBox.append(victoryImg);

  const victoryObjectivesList = document.createElement('ul');
  victoryObjectivesList.classList.add('victory--list');
  const objectiveListText = document.createTextNode('Objectives:');
  victoryObjectivesList.append(objectiveListText);


  victoryBox.append(victoryObjectivesList);


  const allObjectives = Object.keys(objectives);
  for (const eachObjective of allObjectives) {
    const objective = document.createElement('li');
    objective.classList.add('victory--objectives');
    const objectiveText = document.createTextNode(eachObjective);
    objective.append(objectiveText);
    victoryObjectivesList.append(objective);
    timeLapseForObjectivesCheck += 2000;
    setTimeout(function() {
      const check = document.createElement('i');
      check.classList.add('fas', 'fa-check', 'checks');
      objective.append(check);
      audioCheck.play();
    }, timeLapseForObjectivesCheck);
  }

  setTimeout(function() {
    const victoryParText = document.createTextNode('Congratulations! You have accomplished all of your objectives. This is a time for celebration and feasts. Enjoy your triumph while you get ready for your next adventure!');
    victoryPar.append(victoryParText);
  }, timeLapseForObjectivesCheck + 4000);


  setTimeout(function() {
    const finalButton = document.createElement('button');
    finalButton.classList.add('victory--button');
    const finalButtonText = document.createTextNode('I just cannot wait for the next adventure!');
    finalButton.append(finalButtonText);
    victoryBox.append(finalButton);
    finalButton.addEventListener('click', () => {
      victoryBox.remove();
      theEnd();
    });
  }, timeLapseForObjectivesCheck + 15000);
};


setTimeout(function() {
  document.querySelector('.instructions').remove();
}, 10000);
