const axios = require("axios")
const BASE_URL = (process.env.NODE_ENV !== "development")
                    ? ""
                    : "//localhost:3000";

var playersDB = [];
generatePlayers()
// const API_KEY = "AIzaSyAy0MEnLAI1gBNxTT2DBtw440qGgNzZb8c";
export default {
  query,
  getById,
  signupUser,
  updateUser,
  login
};

function getById(id) {
  return playersDB.find(player => player._id === id)
}

function signupUser(user){
  return axios.post(`${BASEURL}/signup`, user)
}

function login ({ userName, password }) {
  return axios.put(`${BASE_URL}/login`, { userName, password })
    .then(res => res.data)
}

function updateUser(user) {
  console.log('after axios update', user)
  const userId = user._id
  return axios.put(`${BASE_URL}/player/${userId}`, user)
  .then(res => consoelo.log('after axios update', res.data))
}

// function login(loginData) {
// // login data is obj with userName & password
// // need to go to server, find user, compare passwords, return success or fail
//   // console.log(loginData)
//   return Promise.resolve()

// }

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
