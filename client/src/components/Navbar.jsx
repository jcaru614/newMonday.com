import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "@reach/router";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';

const Navbar = (props) => {

    const styles = {
        container: {
            background: '#FFF',
            padding: '10px',
        },
        logo: {
            padding: '10px',
            
        }
    }

    return (
        <div style={styles.container}>
        <a style={styles.logo} href={props.link} target="blank">the new monday.com</a>
            {/* <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home"><Link to="position"><DashboardIcon /></Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1"><Link to="/"><AddIcon /></Link></Nav.Link>
                </Nav.Item>
            </Nav> */}
        </div>
    );
}

export default Navbar;