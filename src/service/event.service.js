import { storageService } from "./storage.service.js";
import { utilService } from "./util.service.js";

const EVENTS_KEY = "events";
var eventsDB = [];
const API_KEY = "AIzaSyAy0MEnLAI1gBNxTT2DBtw440qGgNzZb8c";
export const eventService = {
  query,
  getEventById,
  loadEvents,
  nextEvent,
  prevEvent
};


function query() {
  var events = storageService.load(EVENTS_KEY);
  if (!events) {
    events = generateEvents();
    storageService.store(EVENTS_KEY, events);
  }
  eventsDB = events;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(eventsDB);
    }, 500);
  });
}

function getEventById(eventId) {
  return query().then(events => events.find(event => event.id === eventId));
}


function loadEvents(searchKey) {
  // GET https://www.googleapis.com/events/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
  
  var prmRes = axios.get(
    `https://www.googleapis.com/events/v1/volumes?printType=events&q=${searchKey}&key=${API_KEY}`
    );
    var prmData = prmRes.then(res => res.data);
    return prmData;
  }
  
  
  
  function generateEvents() {
    var events = [{
      _id: 1,
      adminId: 'xyz',
      location: {address: 'florentin 6, tel aviv'},
      time: {day: '27/11',hour: '19:34'},
      title: 'Playing Lez Deppelin',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!',
      genre: 'Rock',
      level: 'Professional',
      pic: '',
      instruments:[{
        instrument: 'Guitar',
        amount: 2,
        playersIds: ['xyz','abc'],
      },{
        instrument: 'French horn',
        amount: 1,
        playersIds: [],
      }],
      crowd: {
        amount: 3,
        membersIds: []
      },
      cost: 0,
    },
    {
      _id: 2,
      adminId: 'xyza',
      location: {address: 'florentin 8, tel aviv'},
      time: {day: '27/12',hour: '20:32'},
      title: 'Playing Goola Boola',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!',
      genre: 'Country',
      level: 'amateur',
      pic: '',
      instruments:[{
        instrument: 'Drums',
        amount: 1,
        playersIds: [,'abcd'],
      },{
        instrument: 'Trombone',
        amount: 2,
        playersIds: ['raf'],
      }],
      crowd: {
        amount: 4,
        membersIds: ['asd','dsa']
      },
      cost: 45,
    },{
      _id: 3,
      adminId: 'xyzb',
      location: {address: 'florentin 10, tel aviv'},
      time: {day: '29/11',hour: '21:34'},
      title: 'Playing Little Jonathan',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!',
      genre: 'Children',
      level: 'Amateur',
      pic: '',
      instruments:[{
        instrument: 'Flute',
        amount: 1,
        playersIds: ['dfg'],
      },{
        instrument: 'Clarinet',
        amount: 3,
        playersIds: ['gfd','hgf'],
      }],
      crowd: {
        amount: 0,
        membersIds: []
      },
      cost: 20,
    }]

    return events
}

// function createEvent() {
//     var imgBaseUrl = 'http://coding-academy.org/events-photos/'
//     var event = {
//         id: utilService.makeId(),
//         title: utilService.makeLorem(10),
//         publishedDate: utilService.getRandomInt(1900, 2000),
//         thumbnail: imgBaseUrl + utilService.getRandomInt(1, 21) + '.jpg',
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