import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Form from './components/form/Form';
import Graph from './components/graphs/Graph';

import './styles/App.scss';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-container">
       <Form />
       <Graph />
      </div>
    </div>
  );
}

export default App;
