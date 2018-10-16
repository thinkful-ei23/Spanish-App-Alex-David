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

export const userGuess = (guess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const answer = getState().protectedData.data[0].english;
  if (guess === answer) {
    let message = 'Well Done! Bien Hecho!'
    dispatch(userGuessSuccess(message))
  } else {
    let message = 'Incorrect! Incorrecto!'

    dispatch(userGuessFail(message));
  }
}