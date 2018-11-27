import { storageService } from "./storage.service.js";
import { utilService } from "./util.service.js";

const USERS_KEY = "users";
var playersDB = [];
generatePlayers()
// const API_KEY = "AIzaSyAy0MEnLAI1gBNxTT2DBtw440qGgNzZb8c";
export default {
  query,
};


function query() {
  return Promise.resolve(playersDB)

  // var users = storageService.load(USERS_KEY);
  // if (!users) {
  //   users = generateBooks();
  //   storageService.store(USERS_KEY, users);
  // }
  // usersDB = users;
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(usersDB);
  //   }, 500);
  // });
}

function generatePlayers() {
  playersDB = [
    {
      _id: 'abc',
      name: 'rocki',
      password: '123',
      pic: '',
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['guitar'],
      favGenres: ['rock', 'country'],
      level: 'professional',
    },
    {
      _id: 'def',
      name: 'mocki',
      password: '234',
      pic: '',
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['drums'],
      favGenres: ['rock'],
      level: 'amateur',
    },
  ]
}
// function createBook() {
//     var imgBaseUrl = 'http://coding-academy.org/users-photos/'
//     var user = {
//         id: utilService.makeId(),
//         title: utilService.makeLorem(10),
//         publishedDate: utilService.getRandomInt(1900, 2000),
//         thumbnail: imgBaseUrl + utilService.getRandomInt(1, 21) + '.jpg',
//     }
//     return user;
// }
