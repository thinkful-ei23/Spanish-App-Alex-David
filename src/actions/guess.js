export const USER_GUESS_SUCCESS = 'USER_GUESS_SUCCESS';
export const userGuessSuccess = message => ({
  type: USER_GUESS_SUCCESS,
  message
})

export const USER_GUESS_FAIL = 'USER_GUESS_FAIL';
export const userGuessFail = message => ({
  type: USER_GUESS_FAIL,
  message
})

export const SET_NEXT_QUESTION = 'SET_NEXT_QUESTION';
export const setNextQuestion = index => ({
  type: SET_NEXT_QUESTION,
  index
})

export const userGuess = (guess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  let index = getState().protectedData.index;
  const answer = getState().protectedData.data[index].english;
  if (guess === answer) {
    let message = 'Well Done! Bien Hecho!'
    dispatch(userGuessSuccess(message))
  } else {
    let message = 'Incorrect! Incorrecto!'
    dispatch(userGuessFail(message));
  }
}

export const nextQuestion = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  let index = getState().protectedData.index;
  index++
  dispatch(setNextQuestion(index));
  
}