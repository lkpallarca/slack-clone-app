const userKey = 'loggedUser';

export function getLoggedUser() {
  const user = localStorage.getItem(userKey);
  return user ? JSON.parse(user) : null;
}

export function setLoggedUser(user) {
  const loggedUser = JSON.parse(localStorage.getItem(userKey));
  const dMessageList = JSON.parse(localStorage.getItem(`${user.data.id}d`));
  const channelList = JSON.parse(localStorage.getItem(`${user.data.id}c`));
  if(!loggedUser) {
    localStorage.setItem(userKey, JSON.stringify(user));
  }
  if(!dMessageList) {
    localStorage.setItem(`${user.data.id}d`, JSON.stringify([]));
  } 
  if(!channelList) {
    localStorage.setItem(`${user.data.id}c`, JSON.stringify([]));
  }
}

export function getDMessageHistoryList(currentUser) {
  let convoHistoryList = JSON.parse(localStorage.getItem(`${currentUser}d`));
  return convoHistoryList;
}

export function getChannelHistoryList(currentUser) {
  let convoHistoryList = JSON.parse(localStorage.getItem(`${currentUser}c`));
  return convoHistoryList;
}

export function addToDMessageHistoryList(loggedUserId, selectedConvoId) {
  let alreadyMessagedList = JSON.parse(localStorage.getItem(`${loggedUserId}d`));
  const findChat = alreadyMessagedList.find(each => each === selectedConvoId);
  if(!findChat) {
    alreadyMessagedList.push(selectedConvoId);
    localStorage.setItem(`${loggedUserId}d`, JSON.stringify(alreadyMessagedList));
  }
}

export function addToChannelHistoryList(loggedUserId, selectedConvoId) {
  let alreadyMessagedList = JSON.parse(localStorage.getItem(`${loggedUserId}c`));
  const findChat = alreadyMessagedList.find(each => each === selectedConvoId);
  if(!findChat) {
    alreadyMessagedList.push(selectedConvoId);
    localStorage.setItem(`${loggedUserId}c`, JSON.stringify(alreadyMessagedList));
  }
}

export function clearLoggedUser() {
  localStorage.removeItem(userKey);
}