import React from 'react';
import './App.css';

function App(props) {
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
}

export default App;
