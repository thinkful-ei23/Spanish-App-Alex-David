import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';
import { Redirect } from 'react-router-dom';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }
  componentWillUpdate() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
  }
  demoLogin(username, password) {
    return this.props.dispatch(login(username, password));
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
    return (
      <React.Fragment>
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          {error}
          <label htmlFor="username">Username</label>
          <Field
            component={Input}
            type="text"
            name="username"
            id="username"
            validate={[required, nonEmpty]
            }
          />
          <label htmlFor="password">Password</label>
          <Field
            component={Input}
            type="password"
            name="password"
            id="password"
            validate={[required, nonEmpty]}
          />
          <button disabled={this.props.pristine || this.props.submitting}>
            Log in
          </button>
        </form>
        <p>Or click the button below to log into a demo account.</p>
        <button onClick={() => this.demoLogin('demouser', 'thinkful123')}>Demo Account</button>
      </React.Fragment>
    );
  }
}


export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
