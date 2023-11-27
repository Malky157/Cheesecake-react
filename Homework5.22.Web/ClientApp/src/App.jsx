import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Order from './Order';
import AddItem from './AddItem';
import OrderConfirmation from './OrderConfirmation';
import ViewOrders from './ViewOrders';
import OrderDetails from './OrderDetails';

class App extends React.Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/order' element={<Order />} />
                    <Route exact path='/addItem' element={<AddItem />} />
                    <Route exact path='/orderconfirmation' element={<OrderConfirmation />} />
                    <Route exact path='/vieworders' element={<ViewOrders />} />
                    <Route exact path='/orderdetails' element={<OrderDetails />} />

                </Routes>
            </Layout>
        );
    }
};

export default App;