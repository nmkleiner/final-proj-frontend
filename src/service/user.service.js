// import { storageService } from "./storage.service.js";
// import { utilService } from "./util.service.js";

// const USERS_KEY = "users";
var playersDB = [];
generatePlayers()
// const API_KEY = "AIzaSyAy0MEnLAI1gBNxTT2DBtw440qGgNzZb8c";
export default {
  query,
  getById,
};

function getById(id) {
  return playersDB.find(player => player._id === id)
}

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
      pic: `https://api.adorable.io/avatars/64/rocki.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['guitar'],
      favGenres: ['rock', 'country'],
      level: 'professional',
    },
    {
      _id: 'bcd',
      name: 'mocki',
      password: '234',
      pic: `https://api.adorable.io/avatars/64/mocki.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['drums'],
      favGenres: ['rock'],
      level: 'amateur',
    },
    {
      _id: 'cde',
      name: 'bobo',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/bobo.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['flute'],
      favGenres: ['french'],
      level: 'amateur',
    },
    {
      _id: 'efg',
      name: 'robo',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/robo.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['whistler'],
      favGenres: ['irish'],
      level: 'professional',
    },
    {
      _id: 'fgh',
      name: 'michael',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/michael.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['trombone'],
      favGenres: ['folk'],
      level: 'amateur',
    },
    {
      _id: 'ghi',
      name: 'pichael',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/pichael.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['trumpet'],
      favGenres: ['jazz'],
      level: 'professional',
    },
    {
      _id: 'hij',
      name: 'leon',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/leon.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['bass'],
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
