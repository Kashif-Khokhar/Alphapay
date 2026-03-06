import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar    from './components/Navbar';
import Login     from './pages/Login';
import Dashboard from './pages/Dashboard';
import Checkout  from './pages/Checkout';
import History   from './pages/History';
import Reports   from './pages/Reports';
import Support   from './pages/Support';
import Cards     from './pages/Cards';
import RequestMoney from './pages/RequestMoney';
import PayBills from './pages/PayBills';
import AddMoney from './pages/AddMoney';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function WithNav({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"     element={<Login />} />
        <Route path="/dashboard" element={<WithNav><Navbar /><Dashboard /></WithNav>} />
        <Route path="/checkout"  element={<WithNav><Navbar /><Checkout  /></WithNav>} />
        <Route path="/card"      element={<WithNav><Navbar /><Cards     /></WithNav>} />
        <Route path="/history"   element={<WithNav><Navbar /><History   /></WithNav>} />
        <Route path="/reports"   element={<WithNav><Navbar /><Reports   /></WithNav>} />
        <Route path="/support"   element={<WithNav><Navbar /><Support   /></WithNav>} />
        <Route path="/request"   element={<WithNav><Navbar /><RequestMoney /></WithNav>} />
        <Route path="/bills"     element={<WithNav><Navbar /><PayBills /></WithNav>} />
        <Route path="/add-money" element={<WithNav><Navbar /><AddMoney /></WithNav>} />
        <Route path="/profile"   element={<WithNav><Navbar /><Profile  /></WithNav>} />
        <Route path="/settings"  element={<WithNav><Navbar /><Settings /></WithNav>} />

        {/* Redirect root → Dashboard, unknown → Dashboard */}
        <Route path="/"  element={<Navigate to="/dashboard" replace />} />
        <Route path="*"  element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
