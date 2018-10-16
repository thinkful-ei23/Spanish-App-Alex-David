import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';

export function LoginPage(props) {
  if(props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div >
      <h2>Login To The Spanish App</h2>
      <LoginForm />
      <Link to="/">Go Back</Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);