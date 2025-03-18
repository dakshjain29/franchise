import React from 'react';
import '../index.css';
import './cards.css';

function AppCards(obj) {
  // Get status text and color
  const getStatusDetails = (status) => {
    if (status == 1) return { text: "Accepted", color: "bg-green-100 text-green-800 border-green-500" };
    if (status == -1) return { text: "Rejected", color: "bg-red-100 text-red-800 border-red-500" };
    if (status == 2) return { text: "Franchise", color: "bg-purple-100 text-purple-800 border-purple-500" };
    return { text: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-500" };
  };
  
  const statusDetails = getStatusDetails(obj.status);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        {/* User Image */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src="./pics/img2.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            //   onError={(e) => {e.target.src = "https://via.placeholder.com/80"; e.target.onerror = null;}}
            />
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="flex justify-center mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusDetails.color}`}>
            {statusDetails.text}
          </span>
        </div>
        
        {/* User Details */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{obj.name}</h3>
          <p className="text-sm text-gray-600 mb-1">{obj.email}</p>
          <p className="text-sm text-gray-600 mb-1">{obj.city}</p>
          <p className="text-sm text-gray-600">{obj.contact}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {obj.status == 0 && (
            <button 
              onClick={() => obj.onAccept(obj.email)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              Accept
            </button>
          )}
          
          {(obj.status == 0 || obj.status == 1) && (
            <button 
              onClick={() => obj.onReject(obj.email)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
              Decline
            </button>
          )}
          
          {obj.status == 1 && (
            <button 
              onClick={() => obj.onFranchise(obj.email, 2)}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
            >
              Franchise
            </button>
          )}
          
          {obj.status == -1 && (
            <button 
              className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed text-sm"
              disabled
            >
              Applicant Rejected
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppCards;