import { useState } from 'react';

const CandidateTopbar = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample candidate data
  const [candidates] = useState([
    { id: 1, name: "John Doe", status: "accepted", type: "direct" },
    { id: 2, name: "Jane Smith", status: "rejected", type: "direct" },
    { id: 3, name: "Mike Johnson", status: "pending", type: "direct" },
    { id: 4, name: "Sarah Williams", status: "accepted", type: "franchise" },
    { id: 5, name: "Robert Brown", status: "rejected", type: "franchise" },
    { id: 6, name: "Emily Davis", status: "pending", type: "franchise" },
  ]);
  
  // Filter candidates based on active tab
  const filteredCandidates = candidates.filter(candidate => {
    if (activeTab === 'all') return true;
    if (activeTab === 'accepted') return candidate.status === 'accepted';
    if (activeTab === 'rejected') return candidate.status === 'rejected';
    if (activeTab === 'franchises') return candidate.type === 'franchise';
    return true;
  });
  
  return (
    <div className="w-full p-4">
      {/* Topbar */}
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex border-b">
          <div 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-4 cursor-pointer text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'all' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            All Applicants
          </div>
          
          <div 
            onClick={() => setActiveTab('accepted')}
            className={`px-6 py-4 cursor-pointer text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'accepted' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Accepted
          </div>
          
          <div 
            onClick={() => setActiveTab('rejected')}
            className={`px-6 py-4 cursor-pointer text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'rejected' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Rejected
          </div>
          
          <div 
            onClick={() => setActiveTab('franchises')}
            className={`px-6 py-4 cursor-pointer text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'franchises' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Franchises
          </div>
        </div>
      </div>
      
      {/* Candidate display area */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">
          {activeTab === 'all' && 'All Applicants'}
          {activeTab === 'accepted' && 'Accepted Applicants'}
          {activeTab === 'rejected' && 'Rejected Applicants'}
          {activeTab === 'franchises' && 'Franchise Applicants'}
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({filteredCandidates.length})
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map(candidate => (
            <div 
              key={candidate.id} 
              className={`p-4 rounded-lg border-l-4 ${
                candidate.status === 'accepted' ? 'border-green-500 bg-green-50' : 
                candidate.status === 'rejected' ? 'border-red-500 bg-red-50' : 
                'border-yellow-500 bg-yellow-50'
              }`}
            >
              <p className="font-medium">{candidate.name}</p>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600">
                  {candidate.type === 'franchise' ? 'Franchise' : 'Direct'}
                </span>
                <span className={`text-sm font-medium ${
                  candidate.status === 'accepted' ? 'text-green-600' : 
                  candidate.status === 'rejected' ? 'text-red-600' : 
                  'text-yellow-600'
                }`}>
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateTopbar;