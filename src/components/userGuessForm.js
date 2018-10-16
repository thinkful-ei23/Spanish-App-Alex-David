import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { postGuess } from '../actions/guess';
import { required, nonEmpty } from '../validators';
import Input from './input';

export class GuessForm extends React.Component {
  state = {
    formSubmitted: false
  };

  onSubmit(guess) {
    return this.props.dispatch(postGuess(guess))
      .then(() => {
        if (!this.props.error) {
          this.setState({formSubmitted: true});
        }
      });
  }

  render() {
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
        onSubmit={this.props.handleSubmit(values => this.onsubmit(values))}
      >
      {error}
      <label htmlFor="userGuess">User Guess</label>
      <Field
        component={Input}
        type="string"
        name="userGuess"
        validate={[required, nonEmpty]}
        >
      </Field>
      <button 
        type="submit"
        disabled={this.}
      >
        Submit
      </button>

      </form>
    )
  }


}