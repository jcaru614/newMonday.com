import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../images/newMonday.png'
import Media from 'react-media';

const Navbar = (props) => {

    const [isNavVisible, setNavVisibility] = useState(false);

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };

    return (
        <div className="header">
            <img src={logo} className="logo" alt="" />

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



        </div>
    );
}

export default Navbar;

