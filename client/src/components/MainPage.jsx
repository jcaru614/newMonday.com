import React from 'react';
import UserRegis from './UserRegis';
import UserLogin from './Login';
import Navbar from './Navbar';

function MainPage() {

    const container = {
        background: 'transparent',
        // padding: '50px 0',
        height: '100vh',
    }

    return (
        <div style={container}>
            <Navbar />
            <UserRegis />
            <UserLogin />
        </div>
    );
}

export default MainPage;