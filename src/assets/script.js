const form = document.querySelector('[form]');
const input = form.querySelector('[input]');
const button = form.querySelector('[button]');

const resultPopup = document.querySelector('[result-popup]');
const result = resultPopup.querySelector('[result]');

const raffleButton = document.querySelector('[raffle-button]');
const itemList = document.querySelector('[item-list]');

const items = ['wall-e', 'drementer'];

const showResult = () => {
  const index = Math.floor(Math.random() * items.length);
  result.innerHTML = `<h1>${items[index]}</h1>`;
  resultPopup.hidden = false;
};

const updateItem = (index, value) => {
  items[index] = value;
};

const deleteItem = (index) => {
  items.splice(index, 1);
  raffleButton.toggleAttribute('disable', !items.length);
  listItems();
};

const listItems = () => {
  itemList.innerHTML = '';

  items.forEach((user, index) => {
    itemList.insertAdjacentHTML(
      'beforeend',
      `
			<div class="item-list__item list-item">
				<input
					type="text"
					id="item-${index}"
					name="item-name"
					class="list-item__heading"
					maxlength="10"
					value="${user}"
					oninput="updateItem(${index}, this.value)"
				/>
				<label for="item-${index}" class="button -icon">
					<ion-icon name="create-outline"></ion-icon>
				</label>
				<div
					class="button -danger"
					onClick="deleteItem(${index})"
				>
					delete
				</div>
			</div>
			`
    );
  });
};

const addItem = () => {
  const value = input.value.trim();
  if (value === '') return;

  items.push(value);
  input.parentElement.setAttribute('disable', '');
  form.reset();
  input.focus();

  listItems();
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addItem();
});
resultPopup.addEventListener('click', () => (resultPopup.hidden = true));
button.addEventListener('click', addItem);
raffleButton.addEventListener('click', showResult);

listItems();
