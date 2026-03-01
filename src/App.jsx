import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar    from './components/Navbar';
import Login     from './pages/Login';
import Dashboard from './pages/Dashboard';
import Checkout  from './pages/Checkout';
import History   from './pages/History';
import Reports   from './pages/Reports';
import Support   from './pages/Support';

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
        <Route path="/history"   element={<WithNav><Navbar /><History   /></WithNav>} />
        <Route path="/reports"   element={<WithNav><Navbar /><Reports   /></WithNav>} />
        <Route path="/support"   element={<WithNav><Navbar /><Support   /></WithNav>} />

        {/* Redirect root → Login, unknown → Dashboard */}
        <Route path="/"  element={<Navigate to="/login" replace />} />
        <Route path="*"  element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
