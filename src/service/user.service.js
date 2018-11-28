const axios = require("axios")
var BASEURL = (process.env.NODE_ENV !== 'development') ? '/api' : '//localhost:3000/api'

var playersDB = [];
generatePlayers()
// const API_KEY = "AIzaSyAy0MEnLAI1gBNxTT2DBtw440qGgNzZb8c";
export default {
  query,
  getById,
<<<<<<< HEAD
  signupUser
=======
  login
>>>>>>> 998191a933da881546061094b15d92cbcfe93c87
};

function getById(id) {
  return playersDB.find(player => player._id === id)
}

<<<<<<< HEAD
function signupUser(user){
  playersDB.push(user);
  return Promise.resolve();
}

=======
function login ({ userName, password }) {
  return axios.put(`${BASEURL}/login`, { userName, password })
    .then(res => res.data)
}


// function login(loginData) {
// // login data is obj with userName & password
// // need to go to server, find user, compare passwords, return success or fail
//   // console.log(loginData)
//   return Promise.resolve()

// }

>>>>>>> 998191a933da881546061094b15d92cbcfe93c87
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
