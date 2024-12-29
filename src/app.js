import CardManager from './card-manager.js';
import Bubble from './bubble.js';

const form = document.querySelector('form');
const raffleButton = document.querySelector('button');
const cardDeck = document.querySelector('[card-deck]');
const cardTemplate = document.querySelector('[card-template]');
const bubbleContainer = document.querySelector('[bubble-container]');

const addCard = () => {
  const { name, multiplier } = form;
  cardManager.addCard(name.value, multiplier.value);
  name.value = '';
};

const getRandomCard = () => {
  const winner = cardManager.getRandomCard();
  console.log(winner);
};

const cardManager = new CardManager(cardTemplate, cardDeck, raffleButton);
const bubble = new Bubble(bubbleContainer);

raffleButton.addEventListener('click', getRandomCard);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addCard();
});
