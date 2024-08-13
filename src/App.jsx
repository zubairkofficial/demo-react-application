import Home from './App/Pages/Home'
import './assets/plugins/custom/fullcalendar/fullcalendar.bundle.css'
import './assets/plugins/custom/datatables/datatables.bundle.css'
import './assets/plugins/global/plugins.bundle.css'
import './assets/css/style.bundle.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './App/Layout'
import Login from './App/Pages/Login'
import Helper from './App/Config/Helper'

const Auth = ({ children, isAuth = true }) => {
  let user = Helper.getItem('user', true);
  let token = Helper.getItem('token');
  if (isAuth) {
    if (!user || !token) {
      Helper.toast("error", "Please login to continue");
      return <Navigate to="/" />;
    }

    return children;
  } else {
    if (user && token) {
      return <Navigate to="/user/dashboard" />;
    }
    return children;
  }
}

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth isAuth={false}><Login /></Auth>} />
        <Route path="/user" element={<AppLayout />}>
          <Route path="/user/dashboard" element={<Auth><Home /></Auth>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App