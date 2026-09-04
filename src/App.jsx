import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FranchHome from './FranchiseDash/FranchHome';
import LoginForm from './Forms/LoginForm';
import Applicantdashh from './OwnerDash/Applicationdashh';
import Landingpage from './LandingPage/Landingpage';
import { hasRole } from './lib/auth';

// Placeholder components for each section

// Side Navigation component


// Main layout that combines sidebar with content area


// Root app component that sets up the router
// eslint-disable-next-line react/prop-types
function ProtectedRoute({ role, children }) {
  return hasRole(role) ? children : <Navigate to="/login" replace />;
}

const App = () => {
  return (
    <Router>
      
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Landingpage></Landingpage>}></Route>
          <Route path="/login" element={<LoginForm></LoginForm>} />
          <Route path="/frDashboard/*" element={<ProtectedRoute role="franchise"><FranchHome /></ProtectedRoute>} />
          <Route path="/ownerDashboard/*" element={<ProtectedRoute role="admin"><Applicantdashh /></ProtectedRoute>} />
          
        </Routes>
      </div>

    </Router>
  );
};

export default App;