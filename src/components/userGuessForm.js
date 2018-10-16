import React from 'react';
import { connect } from 'react-redux';
import { required, nonEmpty } from '../validators';
import { userGuess } from '../actions/guess';

export class GuessForm extends React.Component {
  state = {
    formSubmitted: false
  };

  onSubmit = e => {
    e.preventDefault();
    const val = this.userGuess.value;
    this.props.dispatch(userGuess(val));
  }
  // onNext = e => {
  //   e.preventDefault();
  //   this.props.dispatch(nextQuestion());
  // }

  render() {

    let button;
    if(this.props.message !== null) {
        button = <button className="nextQuestion">Next Question</button>
    } else {
      button = 
      <button type="submit" disabled={this.props.pristine || this.props.submitting} >
        Submit
      </button>
    }

    let error;
    if (this.props.error) {
      error = (
        <div className='form-error' aria-live='polite'>
          {this.props.error}
        </div>
      );
    }
    return(
      <form
        className='guess-form'
        onSubmit={e => this.onSubmit(e)}
      >
        {error}
        <input
          type="text"
          ref={input => this.userGuess = input}
          validate={[required, nonEmpty]}
          />
        {button}
      </form>
    )
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      username: state.auth.currentUser.username,
      name: currentUser.name,
      protectedData: state.protectedData.data,
      message: state.auth.message
  };
};

export default connect(mapStateToProps)(GuessForm)