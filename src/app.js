import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoute from './route';

const App = ({ location }) => {
    return (
        <div className='container'>
            <Header/>
            <AppRoute location={location}/>
            <Footer/>
        </div>
    );
}

export default withRouter(App);
