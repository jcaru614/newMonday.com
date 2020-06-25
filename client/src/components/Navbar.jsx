import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../images/newMonday.png'
import Media from 'react-media';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { navigate } from '@reach/router';

const Navbar = (props) => {

    const [isNavVisible, setNavVisibility] = useState(false);

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <div className="header">
            <img src={logo} className="logo" alt="" />

            {localStorage.getItem('user_id') ?
            <>
                <Media query="(max-width: 599px)" render={() =>
                    (
                        <>
                            <CSSTransition
                                in={isNavVisible}
                                timeout={350}
                                classNames="Animation" unmountOnExit>
                                <nav className="head">
                                    <a href="#1">Lorem Ipsum</a>
                                    <a href="#2">Lorem Ipsum</a>
                                    <a href="#3">Lorem Ipsum</a>
                                    <a href="#4">Profile</a>
                                    <a href="#5">Setting</a>
                                    <a onClick={logout} href="#6">Logout</a>
                                </nav>
                            </CSSTransition>
                            <button onClick={toggleNav} className="Burger"> {isNavVisible ? <CloseIcon /> : <AccountCircleIcon  />} </button>
                        </>
                    )}
                />

                <Media query="(min-width: 600px)" render={() =>
                    (
                        <>
                            <nav className="head">
                                <a href="#1">Lorem Ipsum</a>
                                <a href="#2">Lorem Ipsum</a>
                                <a href="#3">Lorem Ipsum</a>
                                <>
                            <CSSTransition
                                in={isNavVisible}
                                timeout={350}
                                classNames="Animation" unmountOnExit>
                                <nav className="head">
                                    <a href="#1">Profile</a>
                                    <a href="#2">Setting</a>
                                    <a onClick={logout} href="#3">Logout</a>
                                </nav>
                            </CSSTransition>
                            <button onClick={toggleNav} className="Burger"> {isNavVisible ? <CloseIcon /> : <AccountCircleIcon  />} </button>
                        </>
                            </nav>
                        </>
                    )}
                />
                </>
            :
            
            <>
                <Media query="(max-width: 599px)" render={() =>
                    (
                        <>
                            <CSSTransition
                                in={isNavVisible}
                                timeout={350}
                                classNames="Animation" unmountOnExit>
                                <nav className="head">
                                    <a href="#1">Product</a>
                                    <a href="#2">Enterprise</a>
                                    <a href="#3">Pricing</a>
                                </nav>
                            </CSSTransition>
                            <button onClick={toggleNav} className="Burger"> {isNavVisible ? <CloseIcon /> : <MenuIcon />} </button>
                        </>
                    )}
                />

                <Media query="(min-width: 600px)" render={() =>
                    (
                        <>
                            <nav className="head">
                                <a href="#1">Product</a>
                                <a href="#2">Enterprise</a>
                                <a href="#3">Pricing</a>
                            </nav>
                        </>
                    )}
                />
            </>
            
            }


        </div>
    );
}

export default Navbar;

