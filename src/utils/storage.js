const userKey = 'loggedUser';

export function getLoggedUser() {
  const user = localStorage.getItem(userKey);
  return user ? JSON.parse(user) : null;
}

export function setLoggedUser(user) {
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function clearLoggedUser() {
  localStorage.removeItem(userKey);
}