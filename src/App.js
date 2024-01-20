import './Components/Login.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import ForgetPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';
import Dashboard from './Components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { PrivateRoute } from './Components/Protect/ProtectedRoute';

function App() {
  return (
      <>
      <div className='container-fluid'>
      <Router>
      <Routes>
     <Route path='/' element={ <Login/>}></Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element ={<ForgetPassword/> }/>
      <Route path='reset-password/:token' element={<ResetPassword/>}/>
      {/* <Route element={<PrivateRoute/>}> */}
           <Route path='/dashboard' element={<Dashboard/>} />
      {/* </Route> */}
      </Routes>
      <ToastContainer />
      </Router>
      </div>
    </>
  );
}
//forgot-password
export default App;
