const axios = require('axios');

const BASE_URL =
  process.env.NODE_ENV !== 'development' ? '/api' : '//localhost:3000/api';
var eventsDB = [];
export default {
  query,
  getEventById,
  saveEvent,
  remove,
  getImage
};

function query(filter = null, sort = null) {
  var urlEnd = '/event'
  console.log(filter,'filter')
  if (filter) {
    urlEnd += `?genre=${filter.byGenre}&instrument=${filter.byInstrument}
                &name=${filter.byName}&status=${filter.byStatus}`
  }
  if (sort) {
    urlEnd += `&sortBy=${sort.sorter}&order=${sort.order}`
  }
  console.log('heroku' ,  `${BASE_URL}${urlEnd}`);
  
  return axios.get(BASE_URL + urlEnd)
    .then(res => res.data);
}

function getEventById(eventId) {
  return axios.get(`${BASE_URL}/event/${eventId}`)
    .then(res => res.data);
}

function remove(eventId) {
  return axios.delete(`${BASE_URL}/event/${eventId}`);
}

function saveEvent(event) {
  if (event._id) {
    return axios.put(`${BASE_URL}/event/${event._id}`, event);
  } else {
    return axios.post(`${BASE_URL}/event`, event);
  }
}

function getImage(){
  var randNum = getRandomIntInclusive(0,17)
  console.log(randNum);
  return imgs[randNum];
}

var imgs = [
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98bfb6da87072431cb1d54750bf2e638&auto=format&fit=crop&w=300&q=60",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=96b6eb1c3bac5a2a548d7f90020bef2f&auto=format&fit=crop&w=300&q=60",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f9f0fdc18a215ec725f8ca61dc6fcbdf&auto=format&fit=crop&w=300&q=60",
  "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a2e3abeff94d9a95db8c3b25e84f3718&auto=format&fit=crop&w=300&q=60",
  "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=40ad7b124b789719a70c867561138701&auto=format&fit=crop&w=300&q=60",
  "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=40ad7b124b789719a70c867561138701&auto=format&fit=crop&w=300&q=60",
  "https://images.unsplash.com/photo-1497616987741-7fba8102046e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6dff81312f05df6377b3c70ec70c1de7&auto=format&fit=crop&w=300&q=60",
  "https://images.unsplash.com/photo-1509335919466-c196457ea95a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd7953dd1357165f722daaa392708fad&auto=format&fit=crop&w=300&q=60",
  "https://images.unsplash.com/photo-1471614654469-512ee6a4397a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=322bab809d5e040ea3b53739f3112ae9&auto=format&fit=crop&w=300&q=60",
  "https://images.unsplash.com/photo-1489641493513-ba4ee84ccea9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fab3b3d2e5d190a842b4c0986053e0fc&auto=format&fit=crop&w=300&q=60",
  "https://images.unsplash.com/photo-1473646590311-c48e1bc77b44?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5f56bc362c40c2d2458a6279036f8f61&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506423456648-c11ccb27338d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2d54a7e04988455d150a1c22a350eb0&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1488376739361-ed24c9beb6d0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f710279c1f806a301f5abd87c7c06d84&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1466232373731-46205f0b668e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=618a357670b6ca99b9eca7f09884cbcc&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1481886756534-97af88ccb438?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=647d9bcf339347ac2104b4ef7868a9da&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1471523835123-1172efe5eaa1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba7eb656530e6747854f7be86119e721&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1457960784918-ea479c62a2c5?ixlib=rb-0.3.5&s=5708eaa0d507085dd294394e7aca7423&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1470784591255-6c7c80d419c8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6e957cd463132b7fc85f9ecdc45b1f2c&auto=format&fit=crop&w=800&q=60",

]


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}