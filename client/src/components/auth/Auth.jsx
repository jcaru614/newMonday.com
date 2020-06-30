import React from 'react';
import UserRegis from './Registration';
import UserLogin from './Login';


function Auth() {

    const container = {
        background: 'transparent',
        // padding: '50px 0',
        height: '100%',
    }

    return (
        <div style={container}>
            <UserRegis />
            <UserLogin />
        </div>
    );
}

export default Auth;