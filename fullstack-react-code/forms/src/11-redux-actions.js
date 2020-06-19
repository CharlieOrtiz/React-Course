/* eslint-disable no-use-before-define */
export const FETCH_PEOPLE_REQUEST = 'FETCH_PEOPLE_REQUEST';
function fetchPeopleRequest () {
  return {type: FETCH_PEOPLE_REQUEST}; //Action to be invoked before our request to get data from the server has been completed. Changes the loading property to true
}

export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
//Action Creators
function fetchPeopleSuccess (people) {
  return {type: FETCH_PEOPLE_SUCCESS, people}; //After our get data request is completed we dispatch this action, changing the loading property to false and our people property equal to the data from the server
}

export const SAVE_PEOPLE_REQUEST = 'SAVE_PEOPLE_REQUEST';
function savePeopleRequest () {
  return {type: SAVE_PEOPLE_REQUEST}; //This action is dispatched just before to send data to the server and changes the status to SAVING...
}

export const SAVE_PEOPLE_FAILURE = 'SAVE_PEOPLE_FAILURE';
function savePeopleFailure (error) {
  return {type: SAVE_PEOPLE_FAILURE, error}; //If the request to save fails, we just dispatch this action to change status to ERROR...
}

export const SAVE_PEOPLE_SUCCESS = 'SAVE_PEOPLE_SUCCESS';
function savePeopleSuccess (people) {
  return {type: SAVE_PEOPLE_SUCCESS, people}; //If the request to save FULLFIL, we just dispatch this action to change status to SUCCESS...
}

//Async Action Creator
//This kind of functions returns a dispatch function with the respective dispatch actions inside
export function fetchPeople () {
  return function (dispatch) {
    //Call action creator
    dispatch(fetchPeopleRequest())
    //Make Async request (Get data from the server)
    apiClient.loadPeople().then((people) => {
      //Call another action creator after request
      dispatch(fetchPeopleSuccess(people))
    })
  }
}
//Async Action Creator
export function savePeople (people) {
  return function (dispatch) {
    //Call action creator
    dispatch(savePeopleRequest())
    //Make Async Request (send data to the server)
    apiClient.savePeople(people)
    //After our request is completed we call one of two action creators, depending on the response of the server
      .then((resp) => { dispatch(savePeopleSuccess(people)) })
      .catch((err) => { dispatch(savePeopleFailure(err)) })
  }
}

const apiClient = {
  loadPeople: function () {
    return {
      then: function (cb) {
        setTimeout( () => {
          cb(JSON.parse(localStorage.people || '[]'))
        }, 1000);
      }
    }
  },

  savePeople: function (people) {
    const success = !!(this.count++ % 2);

    return new Promise(function (resolve, reject) {
      setTimeout( () => {
        if (!success) return reject({success});

        localStorage.people = JSON.stringify(people);
        resolve({success});
      }, 1000);
    })
  },

  count: 1
}
