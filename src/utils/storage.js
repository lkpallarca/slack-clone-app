const userKey = 'loggedUser';

export function getLoggedUser() {
  const user = localStorage.getItem(userKey);
  return user ? JSON.parse(user) : null;
}

export function setLoggedUser(user) {
  localStorage.setItem(userKey, JSON.stringify(user));
  const dMessageList = JSON.parse(localStorage.getItem(user.data.id));
  if(!dMessageList) {
    localStorage.setItem(JSON.stringify(user.data.id), JSON.stringify([]));
  } 
}

export function getDMessageHistoryList(currentUser) {
  let convoHistoryList = JSON.parse(localStorage.getItem(JSON.stringify(currentUser)));
  return convoHistoryList;
}

export function addToDMessageHistoryList(loggedUserId, selectedConvoId) {
  let alreadyMessagedList = JSON.parse(localStorage.getItem(JSON.stringify(loggedUserId)));
  console.log(alreadyMessagedList);
  const findChat = alreadyMessagedList.find(each => each === selectedConvoId);
  if(!findChat) {
    alreadyMessagedList.push(selectedConvoId);
    localStorage.setItem(JSON.stringify(loggedUserId), JSON.stringify(alreadyMessagedList));
  }
}

export function clearLoggedUser() {
  localStorage.removeItem(userKey);
}