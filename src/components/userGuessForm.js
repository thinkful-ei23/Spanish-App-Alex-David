import React from 'react';
import { connect } from 'react-redux';
import { required, nonEmpty } from '../validators';
import { userGuess, nextQuestion } from '../actions/guess';

export class GuessForm extends React.Component {
  state = {
    formSubmitted: false
  };

  // componentDidUpdate(prevProps, prevState) {
  //   this._input.focus();
  // }

  onSubmit = e => {
    e.preventDefault();
    const val = this.userGuess.value;
    this.props.dispatch(userGuess(val));
  };

  onNext = e => {
    e.preventDefault();
    console.log(true);
    this.props.dispatch(nextQuestion(this.props.head));
  };

  handleOnClick(e) {
    window.responsiveVoice.speak(
      this.props.protectedData[this.props.currentHead].spanish,
      'Spanish Female',
      { rate: 0.7 }
    );
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }

    if (this.props.message !== null) {
      return (
        <button
          className="nextQuestion"
          type="submit"
          onClick={e => this.onNext(e)}
        >
          Next Question
        </button>
      );
    } else {
      return (
        <React.Fragment>
          <form className="guess-form" onSubmit={e => this.onSubmit(e)}>
            {error}
            <p id="question" className="dashboard-protected-data">
              What does{' '}
              {this.props.protectedData[this.props.currentHead].spanish} mean?
            </p>
            <input
              type="text"
              ref={input => (this.userGuess = input)}
              validate={[required, nonEmpty]}
              aria-label="userGuess"
              autofocus="true"
              // ref={c => (this._input = c)}
            />
            <button
              type="submit"
              disabled={this.props.pristine || this.props.submitting}
            >
              Submit
            </button>
          </form>
          <button
            onClick={this.handleOnClick(
              this.props.protectedData[this.props.currentHead].spanish
            )}
          >
            Click
          </button>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: currentUser.name,
    currentHead: state.auth.currentUser.head,
    protectedData: state.protectedData.data.wordList,
    message: state.auth.message,
    head: state.auth.currentUser.head
  };
};

export default connect(mapStateToProps)(GuessForm);
