import React from 'react';
import { Router } from '@reach/router'
import NewProject from './components/NewProject';
import Position from './components/Position';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage';

function App() {
  return (
    <div>
      <Router>
        <MainPage path="/" />
        <NewProject path="/addProject" />
        <Position path="/position" />
      </Router>
    </div>
  );
}

export default App;
