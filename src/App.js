import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';
import Login from './components/views/Login/Login';
import Tables from './components/views/Tables/Tables';
import Booking from './components/views/Tables/Booking/Booking';
import BookingNew from './components/views/Tables/BookingNew/BookingNew';
import Events from './components/views/Tables/Events/Events';
import Waiter from './components/views/Waiter/Waiter';
import Order from './components/views/Waiter/Order/Order';
import OrderNew from './components/views/Waiter/OrderNew/OrderNew';
import Kitchen from './components/views/Kitchen/Kitchen';

function App() {
  return (
    <BrowserRouter basename={'/panel'}>
      <MainLayout>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage} />
          <Route exact path={process.env.PUBLIC_URL + '/login'} component={Login} />
          <Route exact path={`${process.env.PUBLIC_URL}/tables`} component={Tables} />
          <Route exact path={`${process.env.PUBLIC_URL}/tables/booking/new`} component={BookingNew} />
          <Route exact path={`${process.env.PUBLIC_URL}/tables/bookings/booking/:id`} component={Booking} />
          <Route exact path={`${process.env.PUBLIC_URL}/tables/events/event/:id`} component={Events} />
          <Route exact path={`${process.env.PUBLIC_URL}/waiter`} component={Waiter} />
          <Route exact path={`${process.env.PUBLIC_URL}/waiter/order/new`} component={OrderNew} />
          <Route exact path={`${process.env.PUBLIC_URL}/waiter/order/:id`} component={Order} />
          <Route exact path={`${process.env.PUBLIC_URL}/kitchen`} component={Kitchen} />
        </Switch>
      </MainLayout>
    </BrowserRouter>    
  );
}

export default App;
