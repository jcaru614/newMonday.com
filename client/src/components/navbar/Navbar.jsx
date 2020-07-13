import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import './navbar.css'
import logo from '../../images/newMonday.png'
import Media from 'react-media';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { navigate } from '@reach/router';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { lightGreen, deepPurple } from '@material-ui/core/colors';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import BusinessIcon from '@material-ui/icons/Business';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const Navbar = (props) => {

    const useStyles = makeStyles((theme) => ({
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
        },
        green: {
            color: theme.palette.getContrastText(lightGreen[500]),
            backgroundColor: lightGreen[500],
        },
    }));

    const classes = useStyles();


    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
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
                                        <a href="#1" onClick={() => navigate('/addProject')}> <HomeIcon /> Home</a>
                                        <a href="#2" onClick={() => navigate('/position')}> <ListAltIcon /> Projects</a>
                                        <a href="#3" > <NotificationsActiveIcon /> Notifications </a>
                                        <a href="#1"> <PersonIcon /> Profile</a>
                                        <a href="#2">  <SettingsIcon />  Settings</a>
                                        <a onClick={logout} href="#3"> <ExitToAppIcon />Logout</a>
                                    </nav>
                                </CSSTransition>
                                <button onClick={toggleNav} className="Burger">
                                    {isNavVisible ? <CloseIcon fontSize="large" /> : <AccountCircleIcon fontSize="large" />} </button>
                            </>
                        )}
                    />
                    {/* full width has different classnames */}
                    <Media query="(min-width: 600px)" render={() =>
                        (
                            <>
                                <nav className="head">
                                    <a href="#1" onClick={() => navigate('/addProject')}> <HomeIcon /> Home</a>
                                    <a href="#2" onClick={() => navigate('/position')}> <ListAltIcon /> Projects</a>
                                    <a href="#3"> <NotificationsActiveIcon /> Notifications</a>

                                    <CSSTransition
                                        in={isNavVisible}
                                        timeout={350}
                                        classNames="fw-animation" unmountOnExit>
                                        <nav className="fw-head">
                                            <a href="#1"> <PersonIcon /> Profile </a>
                                            <a href="#2">  <SettingsIcon />  Settings</a>
                                            <a onClick={logout} href="#3"> <ExitToAppIcon />Logout</a>
                                        </nav>
                                    </CSSTransition>
                                    <button onClick={toggleNav} className="fw-burger">
                                        {isNavVisible ? <Avatar className={classes.green} ><CloseIcon fontSize="small" /></Avatar> : <Avatar className={classes.purple}>{firstName[0]}{lastName[0]}</Avatar>} </button>

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
                                        <a href="#1"> <ListAltIcon /> Product</a>
                                        <a href="#2"> <BusinessIcon /> Enterprise</a>
                                        <a href="#3"> <AttachMoneyIcon /> Pricing</a>
                                    </nav>
                                </CSSTransition>
                                <button onClick={toggleNav} className="Burger">
                                    {isNavVisible ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />} </button>
                            </>
                        )}
                    />

                    <Media query="(min-width: 600px)" render={() =>
                        (
                                <nav className="head">
                                    <a href="#1"> <ListAltIcon /> Product</a>
                                    <a href="#2"> <BusinessIcon /> Enterprise</a>
                                    <a href="#3"> <AttachMoneyIcon /> Pricing</a>
                                </nav>
                        )}
                    />
                </>

            }


        </div>
    );
}

export default Navbar;

