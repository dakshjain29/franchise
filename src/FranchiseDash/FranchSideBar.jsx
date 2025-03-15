import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Users, 
  History, 
  BarChart2, 
  Settings, 
  LogOut 
} from 'lucide-react';

// Placeholder components for each section
 
// Side Navigation component
const FranchSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  var redirecter = useNavigate();
  function fnavigate(path)
  {
    redirecter(path);
  }
  // Navigation items configuration
  const navItems = [
    { id: '/frDashboard', label: 'Home', icon: <Home size={20} /> },
    { id: '/frDashboard/sales', label: 'Sales', icon: <TrendingUp size={20} /> },
    { id: '/frDashboard/employees', label: 'Employees', icon: <Users size={20} /> },
    { id: '/frDashboard/history', label: 'History', icon: <History size={20} /> },
    { id: '/frDashboard/charts', label: 'Charts', icon: <BarChart2 size={20} /> },
    { id: '/frDashboard/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  // Handle logout action
  const handleLogout = () => {
    fnavigate('/');
    localStorage.removeItem('email');
    
  };

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 h-screen ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-700 focus:outline-none"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => {
            const isActive = location.pathname === item.id || 
              (location.pathname === '' && item.id === '/');
            
            return (
                // another approach using links if we didnt want to use UseNavigate function 
                // in this approach  <link  to={path} >  tag is used which will be used to navigate to the page - similar to navigate function
              <li key={item.id} className="mb-2">
                <Link
                  to={item.id}
                  className={`flex items-center w-full px-4 py-3 transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-4">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>

                // ******************another approach using UseNavigate function ******************

                // <li key={item.id} className="mb-2">
                // <button
                // onClick={() => navigate(item.id)}
                // className={`flex items-center w-full px-4 py-3 transition-colors text-left ${
                //     isActive 
                //     ? 'bg-blue-600 text-white' 
                //     : 'text-gray-300 hover:bg-gray-700'
                // }`}
                // >
                // <span className="mr-4">{item.icon}</span>
                // {!collapsed && <span>{item.label}</span>}
                // </button>
                // </li>


            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-1 w-64 p-0 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-64 px-4 py-3 text-gray-300 transition-colors hover:bg-gray-700"
        >
          <span className="mr-4"><LogOut size={20} /></span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default FranchSideBar;