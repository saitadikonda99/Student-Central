import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'

import Nav from './components/nav/page';
import Footer from './components/footer/page';

import Home from './pages/home/page';

import RequiredAuth from './components/auth/RequireAuth';

import Login from './pages/auth/login/Login';
import Register from './pages/auth/registration/page';
import PersistLogin from './components/auth/PersistLogin'
import ClubReg from './user_modules/student/pages/club/Registration';
import ViewReg from './user_modules/student/pages/club/ViewReg';
import StudentApp from './user_modules/student/studentApp';
import AdminApp from './user_modules/admin/adminApp';
import Layout from './components/auth/Layout';


function App() {

  // const [isLoading, setLoading] = useState(true);

  // function someRequest() {
  //   return new Promise((resolve) => setTimeout(() => resolve(), 4000));
  // }

  // useEffect(() => {
  //   someRequest().then(() => {
  //     const loaderElement = document.querySelector(".loader-container");
  //     if (loaderElement) {
  //       loaderElement.remove();
  //       setLoading(!isLoading);
  //     }
  //   });
  // });
  // if (isLoading) {
  //   return null;
  // }



  return (
   <div className="App">
      {/* <Nav/> */}
      <Routes>
            <Route path='/' element={<Layout/>}>
              <Route element={<PersistLogin/>}>


                  <Route element={<RequiredAuth allowedRoles={['Student']}/>}>
                    <Route path='/student/*' element={<StudentApp/>}/>  
                  </Route>

                  <Route element={<RequiredAuth allowedRoles={['Admin']}/>}>
                    <Route path='/admin/*' element={<AdminApp/>}/>
                  </Route>



                  <Route path='/' element={<Login/>}/>
                  <Route path='/auth/login' element={<Login/>}/>
                  <Route path='/auth/register' element={<Register/>}/>
              </Route>
            </Route>
        </Routes>
   </div>
  )
}

export default App
