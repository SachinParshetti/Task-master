import { Route,Routes,BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import HomePage from './component/home';
import UserRegister from './component/registration';
import UserDashboard from './component/dashboard';
import { ToastContainer } from 'react-toastify';


function App() {
  
  return (
    <>
      
          <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<UserRegister/>}/>
            <Route path="/dashboard" element={ <UserDashboard/>}/>
          </Routes>

          <ToastContainer position='top-right' autoClose={2000}>

          </ToastContainer>
          </BrowserRouter>

    </>
  )
}

export default App;
