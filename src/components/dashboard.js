import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import UserGuessForm from './userGuessForm';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        if(!this.props.protectedData || !this.props.protectedData.length) {
            return <div>Loading...</div>
        }

        return (
            <div className="dashboard">
                <div className="dashboard-name">Hello {this.props.name}</div>
                <div className="dashboard-protected-data">
                    {this.props.protectedData[0].spanish}
                </div>
                <UserGuessForm />
                <div className='message'>
                    {this.props.message}
                </div>
            </div>
        );
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

export default requiresLogin()(connect(mapStateToProps)(Dashboard));