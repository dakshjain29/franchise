import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FranchHome from './FranchiseDash/FranchHome';
import LoginForm from './Forms/LoginForm';
import StartHomepage from './OwnerDash/StartHomepage';
import Applicantdashh from './OwnerDash/Applicationdashh';
import Landingpage from './LandingPage/Landingpage';

// Placeholder components for each section

// Side Navigation component


// Main layout that combines sidebar with content area


// Root app component that sets up the router
const App = () => {
  return (
    <Router>
      
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Landingpage></Landingpage>}></Route>
          <Route path="/login" element={<LoginForm></LoginForm>} />
          <Route path="/frDashboard/*" element={<FranchHome></FranchHome>} />
          <Route path="/ownerDashboard/*" element={<Applicantdashh></Applicantdashh>} />
          
        </Routes>
      </div>

    </Router>
  );
};

export default App;