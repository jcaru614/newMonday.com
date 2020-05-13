import React from 'react';
import {Router} from '@reach/router'
import NewProject from './components/NewProject';
import Position from './components/Position';

function App() {
  return (
    <div>
      <Router>
        <NewProject path="/" />
        <Position path="position" />
      </Router>
    </div>
  );
}

export default App;
