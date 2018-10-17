import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const USER_GUESS_SUCCESS = 'USER_GUESS_SUCCESS';
export const userGuessSuccess = (message, correctCount) => ({
  type: USER_GUESS_SUCCESS,
  message,
  correctCount
})

export const USER_GUESS_FAIL = 'USER_GUESS_FAIL';
export const userGuessFail = (message, answer) => ({
  type: USER_GUESS_FAIL,
  message,
  answer
})

export const SET_NEXT_QUESTION = 'SET_NEXT_QUESTION';
export const setNextQuestion = () => ({
  type: SET_NEXT_QUESTION
})






export const userGuess = (guess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const user = getState().auth.currentUser;
  const userId = user.id;
  const currentHead = user.head;
  let correctCount = getState().auth.correctCount;
  let wordList = getState().protectedData.data.wordList;
  const answer = wordList[currentHead].english;
  let mValue = wordList[currentHead].mVal;
  let nodeJustAnswered = wordList[currentHead];
  let newHead = nodeJustAnswered.next;

  function insertAt(nthPosition, itemToInsert) {
    if (nthPosition < 0) {
      throw new Error('Position error');
    }
    // Find the node which we want to insert after
    const node = this._findNthElement(nthPosition - 1);
    const newNode = new _Node(itemToInsert, null);
    newNode.next = node.next;
    node.next = newNode;
  }
  
  function _findNthElement(position) {
  let node = wordList[0]
  for (let i = 0; i < position; i++) {
    node = node.next;
  }
  return node;
  }

  if (guess === answer) {
    mValue *= 2;
    correctCount++
    let message = 'Well Done! Bien Hecho!'

    console.log(mValue);
    console.log(wordList);

    // mval is now 2
    // next is 1





    return fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: {}
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      dispatch(userGuessSuccess(message, correctCount));
    })

  } else {
    mValue = 1;
    let message = 'Incorrect! Incorrecto!'
    dispatch(userGuessFail(message, answer));
  }
}

export const nextQuestion = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  dispatch(setNextQuestion());
  
}