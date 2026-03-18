import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import Login from './pages/Login';
import Home from './pages/home';
import Signup from './pages/Signup';
import { ConfigProvider, Statistic} from 'antd';
import {AuthContext} from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

import Overview from './pages/Dashboard/Overview';
import RecentActivity from './pages/Dashboard/RecentActivity';
import Statistics from './pages/Dashboard/Statistics';

import AllBookings from './pages/Bookings/AllBookings';
import Pending from './pages/Bookings/Pending';

import AllEvents from './pages/Events/AllEvents';
import PastEvents from './pages/Events/PastEvents';
import UpcomingEvents from './pages/Events/UpcomingEvents';

import PendingPayments from './pages/Payments/PendingPayments';
import Refunds from './pages/Payments/Refunds';
import Transactions from './pages/Payments/Transactions';


import GeneralSettings from './pages/Settings/GeneralSettings';
import Security from './pages/Settings/Security';

import Clients from './pages/Users/Clients';
import UserReports from './pages/Users/UserReports';
import AddUser from './pages/Users/AddUser';
import UsersList from './pages/Users/UsersList';
import EditUser from './pages/Users/EditUser';
import Profile from './pages/Users/Profile';
import ChangePassword from './pages/Users/ChangePassword';


function App() {

  const {token}=useContext(AuthContext);

  return (
    <ConfigProvider

      theme={{
        "token": {
          "colorPrimary": "#25c5ff",
          "colorInfo": "#25c5ff"
        }

      }}

    >
      
      <BrowserRouter>
        <Routes>

          <Route path='Signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          {token &&
          <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          
          <Route path='/user/profile' element={<Profile/>}/>
          <Route path='/change-password' element={<ChangePassword/>}/>
          <Route path='/user/clients' element={<Clients/>}/>
          <Route path='/user/reports' element={<UserReports/>}/>
          <Route path='/user/adduser' element={<AddUser />} />
          <Route path='/user/edit/:id' element={<EditUser/>}/>
          <Route path='/user/' element={<UsersList />} />
          
          <Route path='/overview' element={<Overview/>}/>
          <Route path='/activity' element={<RecentActivity/>}/>
          <Route path='/stats' element={<Statistics/>}/>

          <Route path='/bookings/all' element={<AllBookings/>}/>
          <Route path='/bookings/pending' element={<Pending/>}/>

          <Route path='/events/all' element={<AllEvents/>}/>
          <Route path='/events/past' element={<PastEvents/>}/>
          <Route path='/events/upcoming' element={<UpcomingEvents/>}/>
          
          <Route path='/payments/pending' element={<PendingPayments/>}/>
          <Route path='/payments/refunds' element={<Refunds/>}/>
          <Route path='/payments/transactions' element={<Transactions/>}/>
          
          <Route path='/settings/general' element={<GeneralSettings/>}/>
          <Route path='/settings/security' element={<Security/>}/>
          
          
          </Route>
  }
          {token&&<Route path='/' element={<Home />} />}
          {!token&&<Route path='*' element={<Login/>}/>}

        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App;