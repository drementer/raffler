/**
 * Shorthand for document.
 */
const doc = document;

/**
 * Shorthand for body.
 */
const body = doc.body;

/**
 * Shorthand for console log.
 * @param {*} log - Console logged value.
 */
const log = (log) => {
  console.log(log);
};

/**
 * Fast select item.
 * @param {string} selector - Css selector
 * @param {object} [scope = document] - The parent of the item to be selected
 * @return {object} Selected element
 */
const select = (selector, scope = document) => {
  return scope.querySelector(selector);
};

/**
 * Fast select items.
 * @param {string} selector - Css selector
 * @param {object} [scope = document] - The parent of the items to be selected
 * @returns {object} Selected elements
 */
const selects = (selector, scope = document) => {
  return scope.querySelectorAll(selector);
};

/**
 * Random Number.
 * @param {number} lenght - Number range
 * @return {number} Random number
 */
const randomNumber = (lenght) => {
  let index = Math.floor(Math.random() * lenght);
  return index;
};

/**
 * Inject Html.
 * @param {opbject} parent - Container of added elements
 * @param {string} inner - Injected string
 */
const injectHtml = (parent, inner) => {
  parent.insertAdjacentHTML('beforeend', inner);
};

/**
 * Delete spesific user of 'users' list.
 * @param {number} index - The index of the user to be deleted
 */
const deleteUser = (index) => {
  users.splice(index, 1);

  users.length == 0 ? disableRaffler() : getUsers();
};

/**
 * Disable to raffle system.
 */
const disableRaffler = () => {
  userList.innerHTML = '';

  let inner = `
		<h2 class="user-cards__error">No one can won because there is empty!!!</h2>
	`;
  injectHtml(userList, inner);

  raffleButton.setAttribute('disable', '');
};

/**
 * Update spesific user of 'users' list.
 * @param {number} index - The index of the user to be updated
 * @param {string} value - The value of the user to be updated
 */
const updateUser = (index, value) => {
  if (value == null || value.trim() == '') return deleteUser(index);
  users[index] = value;
};

/**
 * Print User to screen.
 */
const getUsers = () => {
  userList.innerHTML = '';

  users.forEach((user, index) => {
    let inner = `
		<div class="user-cards__user user-card">
			<input type="text" id="user-name-${index}" name="user-name" class="user-card__heading" maxlength="18" value="${user}" oninput="updateUser(${index},this.value)">
			<label for="user-name-${index}" class="user-card__edit-button button -icon"><ion-icon name="create-outline"></ion-icon></label>
			<div class="user-card__delete-button button -danger" onClick="deleteUser(${index})">delete</div>
		</div>
		`;
    injectHtml(userList, inner);
  });
};

/**
 * Variables
 */
const userInput = select('[user-input]');
const userList = select('[user-list]');
const winnerPopup = select('[winner-popup]');
const winner = select('[winner]', winnerPopup);
const raffleButton = select('[raffle-button]');
const addUserButton = select('[add-user-button');

// Default users
let users = ['wall-e', 'drementer'];

addUserButton.addEventListener('click', () => {
  if (userInput.value.trim() == '') return;
  if (users.lenght != 0) raffleButton.removeAttribute('disable');

  users.push(userInput.value);

  userInput.parentElement.setAttribute('disable', '');
  userInput.focus();
  userInput.value = '';

  getUsers();
});

winnerPopup.addEventListener('click', () => {
  winnerPopup.setAttribute('hidden', '');
});

raffleButton.addEventListener('click', () => {
  if (users.length == 0) {
    winnerPopup.removeAttribute('hidden');
    winner.innerHTML = `<h1>You cheater!!!</h1>`;
    return;
  }

  let index = randomNumber(users.length);
  winnerPopup.removeAttribute('hidden');
  winner.innerHTML = `<h1>${users[index]}</h1>`;
});

userInput.addEventListener('input', (e) => {
  e = e.target;
  let parentEl = e.parentElement;

  e.checkValidity()
    ? parentEl.removeAttribute('disable')
    : parentEl.setAttribute('disable', '');
});

userInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    e = e.target;
    let parentEl = e.parentElement;

    if (userInput.value.trim() == '') return;
    if (users.lenght != 0) raffleButton.removeAttribute('disable');

    users.push(userInput.value);

    userInput.parentElement.setAttribute('disable', '');
    userInput.focus();
    userInput.value = '';

    getUsers();

    e.checkValidity()
      ? parentEl.removeAttribute('disable')
      : parentEl.setAttribute('disable', '');
  }
});
// Init
getUsers();
