import CardManager from './card-manager.js';
import Bubble from './bubble.js';

const form = document.querySelector('form');
const raffleButton = document.querySelector('button');
const cardDeck = document.querySelector('[card-deck]');
const cardTemplate = document.querySelector('[card-template]');
const bubbleContainer = document.querySelector('[bubble-container]');
const resultPopup = document.querySelector('[result-popup]');
const result = document.querySelector('[result]');

const addCard = () => {
  const { name, multiplier } = form;
  cardManager.addCard(name.value, multiplier.value);
  name.value = '';
};

const cardManager = new CardManager(cardTemplate, cardDeck, raffleButton);
const bubble = new Bubble(bubbleContainer);

raffleButton.addEventListener('click', () => {
  const winner = cardManager.getRandomCard();
  result.textContent = winner.name;
  resultPopup.hidden = false;
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addCard();
});
resultPopup.addEventListener('click', () => {
  resultPopup.hidden = true;
});
