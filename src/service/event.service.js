const axios = require("axios")

const BASE_URL = (process.env.NODE_ENV !== "development")
                    ? ""
                    : "//localhost:3000";
var eventsDB = [];
export default {
  query,
  getEventById,
  getEvents,
  loadEvents,
  saveEvent,
  updateEvent,
  remove

  // login
  // nextEvent,
  // prevEvent
};


function query(filter = {}) {
  // var queryParams  = new URLSearchParams()
  // if (filter.byGenre) {
  //   queryParams.append("genre", filter.byGenre)
  // }
  return axios.get(`${BASE_URL}/event`)
        .then(res => res.data)
  // return Promise.resolve(getEvents())
}

function getEventById(eventId) {
  return axios.get(`${BASE_URL}/event/${eventId}`)
        .then(res => res.data)
}

function remove(eventId) {
  return axios.delete(`${BASE_URL}/event/${eventId}`)
      // .then(res => res.data)
}

function saveEvent(event) {
  if (event._id) {
      return axios.put(`${BASE_URL}/event/${event._id}`, event)
  } else {
      return axios.post(`${BASE_URL}/event`, event)
  }
}

// function updateEvent(event){
//   //return axios.put('url', event)
//   console.log('from axios put: ',event)
//   return Promise.resolve()
// }

function loadEvents(searchKey) {
  // GET https://www.googleapis.com/events/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
  
  var prmRes = axios.get(
    `https://www.googleapis.com/events/v1/volumes?printType=events&q=${searchKey}&key=${API_KEY}`
    );
    var prmData = prmRes.then(res => res.data);
    return prmData;
  }
  

  function updateEvent(event){
    //return axios.put('url', event)
    console.log('from axios put:')
    return Promise.resolve()
  }
  
  function getEvents() {
    var events = [{
      adminId: "xyz",
      location: {address: "florentin 6", city:"tel aviv"},
      time: {day: "27/11",hour: "19:34"},
      title: "Playing Lez Deppelin",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
      genre: "rock",
      level: "professional",
      pic: "https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png",
      instruments:[{
        instrument: "guitar",
        amount: 2,
        playersIds: ["5bfe891f35e8263350ceccb3","5bfe891f35e8263350ceccb4"],
      },{
        instrument: "french horn",
        amount: 1,
        playersIds: [],
      }],
      freePlayers: {
        amount: 3,
        membersIds: []
      },
      allowedMembersCount: 6,
      joinedMembersCount: 2,
      cost: 0,
    },
    {
      adminId: "xyza",
      location: {address: "florentin 8", city:"tel aviv"},
      time: {day: "27/12",hour: "20:32"},
      title: "Playing Goola Boola",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
      genre: "country",
      level: "amateur",
      pic: "https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png",
      instruments:[{
        instrument: "drums",
        amount: 1,
        playersIds: ["abc"],
      },{
        instrument: "trombone",
        amount: 2,
        playersIds: ["bcd"],
      }],
      freePlayers: {
        amount: 4,
        membersIds: ["cde","def"]
      },
      allowedMembersCount: 7,
      joinedMembersCount: 7,
      cost: 45,
    },{
      adminId: "bcd",
      location: {address: "florentin 10, tel aviv"},
      time: {day: "29/11",hour: "21:34"},
      title: "Playing Little Jonathan",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
      genre: "children",
      level: "amateur",
      pic: "https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png",
      instruments:[{
        instrument: "flute",
        amount: 1,
        playersIds: ["bcd"],
      },{
        instrument: "clarinet",
        amount: 3,
        playersIds: ["def","efg"],
      }],
      freePlayers: {
        amount: 0,
        membersIds: []
      },
      allowedMembersCount: 7,
      joinedMembersCount: 6,
      cost: 20,
    },
    {
    adminId: "xyzb",
    location: {address: "mahne yehuda 112", city:"jerusalem", lat: 32.0853, lng: 34.7818},
    time: {day: "30/12",hour: "21:30"},
    title: "Playing Little Jonathan",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
    genre: "rock",
    level: "pro",
    pic: "../../public/img/events/3.jpg", 
    instruments:[{
      instrument: "guitar",
      amount: 1,
      playersIds: ["abc"],
    },{
      instrument: "drums",
      amount: 3,
      playersIds: ["def"],
    }],
    freePlayers: {
      amount: 2,
      membersIds: []
    },
    allowedMembersCount: 6,
    joinedMembersCount: 2,
    cost: 20,
  },
  {
    adminId: "abc",
    location: {address: "mahne yehuda 51", city:"jerusalem", lat: 32.0853, lng: 34.7818},
    time: {day: "30/11",hour: "21:30"},
    title: "Playing Little Jonathan",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
    genre: "rock",
    level: "pro",
    pic: "",
    instruments:[{
      instrument: "guitar",
      amount: 2,
      playersIds: ["abc"],
    },{
      instrument: "drums",
      amount: 1,
      playersIds: ["bcd"],
    }],
    freePlayers: {
      amount: 5,
      membersIds: []
    },
    allowedMembersCount: 8,
    joinedMembersCount: 2,
    cost: 20,
  },
  {
    adminId: "abc",
    location: {address: "5th avenue 1020", city:"new york", lat: 32.0853, lng: 34.7818},
    time: {day: "30/11",hour: "21:30"},
    title: "Playing Little Jonathan",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
    genre: "rock",
    level: "pro",
    pic: "",
    instruments:[{
      instrument: "guitar",
      amount: 2,
      playersIds: ["abc"],
    },{
      instrument: "flute",
      amount: 1,
      playersIds: ["bcd"],
    }],
    freePlayers: {
      amount: 5,
      membersIds: []
    },
    allowedMembersCount: 8,
    joinedMembersCount: 3,
    cost: 0,
  },
  {
    adminId: "abc",
    location: {address: "derech hayam 21", city:"haifa", lat: 32.0853, lng: 34.7818},
    time: {day: "30/11",hour: "21:30"},
    title: "Playing Little Jonathan",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
    genre: "rock",
    level: "pro",
    pic: "",
    instruments:[{
      instrument: "guitar",
      amount: 4,
      playersIds: ["abc"],
    },{
      instrument: "flute",
      amount: 1,
      playersIds: ["bcd"],
    }],
    freePlayers: {
      amount: 4,
      membersIds: []
    },
    allowedMembersCount: 9,
    joinedMembersCount: 2,
    cost: 0,
  },
  {
    adminId: "abc",
    location: {address: "reger 78", city:"beer sheva", lat: 32.0853, lng: 34.7818},
    time: {day: "30/11",hour: "21:30"},
    title: "Playing Little Jonathan",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
    genre: "rock",
    level: "pro",
    pic: "",
    instruments:[{
      instrument: "guitar",
      amount: 2,
      playersIds: ["abc"],
    },{
      instrument: "flute",
      amount: 1,
      playersIds: [],
    }],
    freePlayers: {
      amount: 2,
      membersIds: []
    },
    allowedMembersCount: 5,
    joinedMembersCount: 1,
    cost: 0,
  },
  {
    adminId: "abc",
    location: {address: "aba hillel 24", city:"ramat gan", lat: 32.0853, lng: 34.7818},
    time: {day: "30/11",hour: "21:30"},
    title: "Playing Little Jonathan",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
    genre: "jazz",
    level: "pro",
    pic: "",
    instruments:[{
      instrument: "sax",
      amount: 2,
      playersIds: ["abc"],
    },{
      instrument: "piano",
      amount: 1,
      playersIds: [],
    }],
    freePlayers: {
      amount: 2,
      membersIds: []
    },
    allowedMembersCount: 5,
    joinedMembersCount: 1,
    cost: 0,
  },
  {
      adminId: "abc",
      location: {address: "jessi cohen 69", city:"holon", lat: 32.0853, lng: 34.7818},
      time: {day: "30/11",hour: "21:30"},
      title: "Playing Little Jonathan",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
      genre: "jazz",
      level: "pro",
      pic: "",
      instruments:[{
        instrument: "sax",
        amount: 2,
        playersIds: ["abc"],
      },
      {
        instrument: "drums",
        amount: 1,
        playersIds: [],
      }],
      freePlayers: {
        amount: 0,
        membersIds: []
      },
      allowedMembersCount: 3,
      joinedMembersCount: 1,
      cost: 0,
    },
    {
        adminId: "abc",
        location: {address: "bialik 22", city:"ramat gan", lat: 32.0853, lng: 34.7818},
        time: {day: "30/11",hour: "21:30"},
        title: "Playing Little Jonathan",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
        genre: "jazz",
        level: "pro",
        pic: "",
        instruments:[{
          instrument: "sax",
          amount: 2,
          playersIds: ["abc"],
        },
        {
          instrument: "guitar",
          amount: 1,
          playersIds: ["bcd","efg","fgh"],
        }],
        freePlayers: {
          amount: 0,
          membersIds: []
        },
        allowedMembersCount: 3,
        joinedMembersCount: 2,
        cost: 0,
      },
      {
          adminId: "abc",
          location: {address: "mahne yehuda 182", city:"jerusalem", lat: 32.0853, lng: 34.7818},
          time: {day: "30/11",hour: "21:30"},
          title: "Playing Little Jonathan",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!",
          genre: "jazz",
          level: "pro",
          pic: "",
          instruments:[{
            instrument: "trumpet",
            amount: 1,
            playersIds: ["abc","bcd"],
          },
          {
            instrument: "sax",
            amount: 2,
            playersIds: ["efg"],
          },
          {
            instrument: "guitar",
            amount: 2,
            playersIds: ["def","fgh"],
          }],
          freePlayers: {
            amount: 0,
            membersIds: []
          },
          allowedMembersCount: 5,
          joinedMembersCount: 3,
          cost: 0,
        },
]

    return events
}

// function createEvent() {
//     var imgBaseUrl = "http://coding-academy.org/events-photos/"
//     var event = {
//         id: utilService.makeId(),
//         title: utilService.makeLorem(10),
//         publishedDate: utilService.getRandomInt(1900, 2000),
//         thumbnail: imgBaseUrl + utilService.getRandomInt(1, 21) + ".jpg",
//     }
//     return event;
// }



// function prevEvent(eventId) {
//   const eventIdx = eventsDB.findIndex(event => event.id === eventId);
//   const event = eventsDB[eventIdx - 1]? eventsDB[eventIdx - 1] : eventsDB[eventsDB.length - 1];

//   return Promise.resolve(event);
// }

// function nextEvent(eventId) {
//   const eventIdx = eventsDB.findIndex(event => event.id === eventId);
//   const event = eventsDB[eventIdx + 1] ? eventsDB[eventIdx + 1] : eventsDB[0];
  
//   return Promise.resolve(event);
// }

// function addReview(eventId, review) {
//   var event = eventsDB.find(event => event.id === eventId);
//   if (!event.reviews) event.reviews = [];
//   event.reviews.push(review);
//   storageService.store(EVENTS_KEY, eventsDB);
// }

// function removeReview(reviewIdx, eventId) {
//   var event = eventsDB.find(event => event.id === eventId);
//   event.reviews.splice(reviewIdx, 1);
//   storageService.store(EVENTS_KEY, eventsDB);
// }