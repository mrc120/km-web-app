import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import "botstrap/dist/cs/bootstrap.min.css";
import { Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="Ksiega przypraw Alberta"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


class App extends Component {
  render(){
    return(
      <div>
        <nav className="navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            Adres
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                tutorials
                </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />
      
          </Switch>
        </div>
      </div>
    );
  }
}


export default App;
