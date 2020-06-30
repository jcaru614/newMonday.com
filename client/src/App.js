import React from 'react';
import { Router } from '@reach/router'
import NewProject from './components/AddProject';
import Projects from './components/projects/Projects';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/auth/Auth';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';

function App() {
  const general = {
    marginTop: "50px",
}
  return (
    <div>
      <Navbar />
      <div  style={general} >
      <Router>
        <MainPage path="/" />
        <NewProject path="/addProject" />
        <Projects path="/position" />
      </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
