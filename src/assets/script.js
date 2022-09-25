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
 * Random Number
 * @param {number} lenght - Number range
 * @return {number} Random number
 */
const randomNumber = (lenght) => {
  let index = Math.floor(Math.random() * lenght);
  return index;
};

/**
 * Inject Html
 * @param {opbject} parent - Container of added elements
 * @param {string} inner - Injected string
 */
const injectHtml = (parent, inner) => {
  parent.insertAdjacentHTML('beforeend', inner);
};

/**
 * Delete spesific user of 'users' list
 * @param {number} index - The index of the user to be deleted
 */
const deleteUser = (index) => {
  users.splice(index, 1);
  getUsers();
};

/**
 * Update spesific user of 'users' list
 * @param {number} index - The index of the user to be updated
 * @param {string} value - The value of the user to be updated
 */
const updateUser = (index, value) => {
  if (value == null || value.trim() == '') return deleteUser(index);
  users[index] = value;
};

/**
 * Print User to screen
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
const result = select('[result]');
const raffleButton = select('[raffle-button]');
const addUserButton = select('[add-user-button');

// Default users
let users = ['wall-e', 'drementer'];

addUserButton.addEventListener('click', () => {
  if (userInput.value.trim() == '') return;

  users.push(userInput.value);
  userInput.value = '';
  getUsers();
});

raffleButton.addEventListener('click', () => {
  let index = randomNumber(users.length);
  result.innerHTML = users[index];
});

// Init
getUsers();
