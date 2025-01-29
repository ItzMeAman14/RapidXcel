import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Module1/Home';
import ResetPassword from './pages/Module1/ResetPassword';
import Login from "./pages/Module1/Login";
import Register from "./pages/Module1/Register";

import ForgetPasswordModal from "./pages/Module1/ForgetPasswordModal"
import Logout from './components/Logout';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register /> } /> 
        <Route path="/forget-password" element={<ForgetPasswordModal /> } /> 
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        {/* Logout Route */}
        <Route path="logout" element={<Logout />} />
      </Routes>
      <ToastContainer position='bottom-right' />
    </>
  );
}

export default App;
