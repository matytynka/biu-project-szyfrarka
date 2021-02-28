import React, { Component } from 'react';
import './App.css';
import Header from './components/site/Header';
import Footer from './components/site/Footer';
import HomePage from "./containers/HomePage";
import MorsePage from "./containers/MorsePage";
import AffinePage from "./containers/AffinePage";
import VigenerePage from "./containers/VigenerePage";

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <Header/>
                <Route exact path="/" component={HomePage}/>
                <Route path="/morse" component={MorsePage}/>
                <Route path="/affine" component={AffinePage}/>
                <Route path="/vigenere" component={VigenerePage}/>
                <Footer/>
            </Router>
        );
    }
}

export default App;
