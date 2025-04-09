export default class CardManager {
  static placeholderCards = [
    { name: 'Tom', multiplier: 1 },
    { name: 'Jerry', multiplier: 2 },
  ];

  constructor(template, container, button) {
    this.cards = [];
    this.id = 0;
    this.template = template.content;
    this.container = container;
    this.button = button;
    this.loadDefaultCards();
  }

  removeCard(cardElement) {
    const cardId = +cardElement.dataset.id;
    this.cards = this.cards.filter((card) => card.id !== cardId);
    this.updateRaffleButtonState();

    cardElement.remove();
  }

  updateCard(cardElement) {
    const cardId = +cardElement.dataset.id;
    const cardName = cardElement.querySelector('[card-name]').value;
    const cardMultiplier = cardElement.querySelector('[card-multiplier]').value;

    const cardObject = this.cards.find((card) => card.id === cardId);

    cardObject.multiplier = +cardMultiplier;
    cardObject.name = cardName;

    if (!cardObject.name) this.removeCard(cardElement);
  }

  createCard({ id, name, multiplier }) {
    const card = this.template.cloneNode(true);
    const element = card.querySelector('[card]');
    const deleteButton = card.querySelector('[delete-button]');
    const cardName = card.querySelector('[card-name]');
    const cardMultiplier = card.querySelector('[card-multiplier]');

    element.dataset.id = id;
    cardName.value = name;
    cardMultiplier.value = multiplier;

    deleteButton.addEventListener('click', () => this.removeCard(element));
    cardName.addEventListener('change', () => this.updateCard(element));
    cardMultiplier.addEventListener('change', () => this.updateCard(element));

    return card;
  }

  addCard(name, multiplier) {
    const cardInfo = {
      id: this.id++,
      name: name.trim(),
      multiplier: +multiplier,
    };

    if (!cardInfo.name) return;
    const cardElement = this.createCard(cardInfo);

    this.cards.push(cardInfo);
    this.updateRaffleButtonState();

    this.container.append(cardElement);
  }

  getRandomCard() {
    const tickets = this.cards.flatMap((card) => {
      return Array(card.multiplier).fill(card);
    });

    const winner = tickets[Math.floor(Math.random() * tickets.length)];
    this.saveToLocalStorage();
    return winner;
  }

  updateRaffleButtonState() {
    this.button.disabled = this.cards.length < 2;
  }

  saveToLocalStorage() {
    localStorage.setItem('raffle-cards', JSON.stringify(this.cards));
  }

  loadDefaultCards() {
    const savedCards = localStorage.getItem('raffle-cards');
    const cards = savedCards ? JSON.parse(savedCards) : CardManager.placeholderCards;

    cards.forEach((card) => {
      this.addCard(card.name, card.multiplier);
    });
  }
}