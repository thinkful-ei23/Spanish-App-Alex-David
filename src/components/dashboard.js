import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';

export class Dashboard extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        if(this.props.protectedData) {
            console.log('this.props: ', this.props);
            const first = this.props.protectedData.slice(0,1);
            console.log('first: ', first);
            console.log('first[0]: ', first[0]);
            // console.log('first.spanish: ', first[0].spanish);
        }
        const first = this.props.protectedData.slice(0,1);


        return (
            <div className="dashboard">
                <div className="dashboard-name">Hello {this.props.name}</div>
                <div className="dashboard-protected-data">
                    {/* Protected data: {first.spanish} */}
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
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));