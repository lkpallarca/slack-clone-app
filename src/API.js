import axios from 'axios';
import { getLoggedUser } from './utils/storage';

const baseURL = 'http://206.189.91.54/api/v1';

export async function userSignUp(newUser) {
  return await axios
    .post(`${baseURL}/auth/`, newUser)
    .then(res => res.data);
}

export async function userLogIn(user) {
  return await axios.post(`${baseURL}/auth/sign_in`, user);
}

export async function fetchUsers() {
  return await axios
    .get(`${baseURL}/users`, {
      headers: getLoggedUser().headers
    })
    .then(res => res.data.data);
};

export async function fetchChannels() {
  return await axios
    .get(`${baseURL}/channels`, {
      headers: getLoggedUser().headers
    })
    .then(res => res.data);
};

export async function fetchOurMessages(ourId, category) {
  return await axios
    .get(`${baseURL}/messages?receiver_id=${ourId}&receiver_class=${category}`, {
      headers: getLoggedUser().headers
    })
    .then(res => res.data);
};

export async function fetchTheirMessages(theirId, theirCategory) {
  return await axios
    .get(`${baseURL}/messages?receiver_id=${theirId}&receiver_class=${theirCategory}`, {
      headers: getLoggedUser().headers
    })
    .then(res => res.data);
};

export async function sendMessage(message) {
  return await axios
    .post(`${baseURL}/messages`, message, {
      headers: getLoggedUser().headers
    })
    .then(res => res.data);
};

export async function createChannel(newChannel) {
  return await axios
    .post(`${baseURL}/channels`, newChannel, {
      headers: getLoggedUser().headers
    })
    .then(res => res.data);
};

export async function addMembers(memberArr, channelId) {
  let response;
  await Promise.all(memberArr.map(async (each) => {
    await axios.post(`${baseURL}/channel/add_member`, 
    {'id': channelId, 'member_id': each.id}, 
    {headers: getLoggedUser().headers
    })
    .then(res => {
      if(res.data.errors) {
        response = res.data.errors[0];
      } else {
        response = null;
      }
    });
  }));
  return response
};

export async function fetchChannelDetails(channelId) {
  return await axios
    .get(`${baseURL}/channels/${channelId}`, {
      headers: getLoggedUser().headers,
    })
    .then(res => res.data)
};
