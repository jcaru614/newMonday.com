import React from "react";
import logo from '../images/newMonday.png'

function Footer() {

    const styles = {
        footer: {
            background: '#C2C9CF',
            textAlign: 'center',
            width: '100%',
            height: '20%',
            boxShadow: '0 0 5px 0 gray',
            color: 'black',
            paddingTop: '10px'
        },
        logo: {
            width: '175px'
        },
        p: {
            paddingTop:'10px',
        }

    }

    const year = new Date().getFullYear();


    return (
        <footer style={styles.footer}>
            <img style={styles.logo} src={logo} alt="" />
            <p style={styles.p}>Copyright ⓒ {year}</p>
            <p >265 E 15th St. San Francisco, CA 35011, USA</p>
        </footer>
    );
}


export default Footer;