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
export const setNextQuestion = index => ({
  type: SET_NEXT_QUESTION,
  index
})

export const userGuess = (guess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  let index = getState().protectedData.index;
  const answer = getState().protectedData.data[index].english;
  let correctCount = getState().auth.correctCount;
  if (guess === answer) {
    correctCount++
    let message = 'Well Done! Bien Hecho!'
    dispatch(userGuessSuccess(message, correctCount));
  } else {
    let message = 'Incorrect! Incorrecto!'
    dispatch(userGuessFail(message, answer));
  }
}

export const nextQuestion = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  let index = getState().protectedData.index;
  index++
  dispatch(setNextQuestion(index));
  
}