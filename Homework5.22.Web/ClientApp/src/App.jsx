import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Order from './Order';


class App extends React.Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/order' element={<Order />} />
                </Routes>
            </Layout>
        );
    }
};

export default App;