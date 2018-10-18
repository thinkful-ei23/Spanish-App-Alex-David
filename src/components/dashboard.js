import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';
import UserGuessForm from './userGuessForm';

export class Dashboard extends React.Component {
  componentDidMount() {
    // if (this.props.wordList === null) {
    this.props.dispatch(fetchProtectedData());
    // }
  }

  render() {
    if (!this.props.protectedData || !this.props.protectedData.length) {
      console.log(this.props.protectedData);
      return <div>Loading...</div>;
    }

    return (
      <main className="dashboard">
        <p className="dashboard-name">Hello {this.props.name}</p>
        <p className="dashboard-protected-data">
          {this.props.protectedData[this.props.currentHead].spanish}
        </p>
        <UserGuessForm />
        <div className="message">{this.props.message}</div>
        <div className="progress">
          <p>Amount correct: {this.props.progress}</p>
          <p>Answer: {this.props.answer}</p>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    currentHead: state.auth.currentUser.head,
    answer: state.auth.answer,
    progress: state.auth.correctCount,
    message: state.auth.message,
    wordList: state.auth.wordlist,
    name: currentUser.name,
    index: state.protectedData.index,
    protectedData: state.protectedData.data.wordList
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
