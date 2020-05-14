import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link, navigate} from "@reach/router";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
const Navbar = (props) => {

    return (
        <div>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home"><Link to="position"><DashboardIcon/></Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1"><Link to="/"><AddIcon /></Link></Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default Navbar;