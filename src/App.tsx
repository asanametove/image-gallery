import React from 'react';
import Image from './Image/Image';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <p>Image Gallery</p>
        <a
          className="header__link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Image />
    </div>
  );
}

export default App;
