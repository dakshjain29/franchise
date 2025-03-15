import React, { useState } from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import axios from 'axios';

function SalesPage({email}) {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        amount: ''
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [message, setMessage] = useState({ text: '', type: '' });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: '', type: '' });
    
        try {
          // Convert date string to MongoDB ISODate format
          const mongoDate = new Date(formData.date).toISOString();
          
          // Create the data object for MongoDB
          const salesData = {
            email: email,
            date: mongoDate,
            amount: parseFloat(formData.amount)
          };
    
          // Simulate API call
          alert("inside the function handlesubmit sales")
          console.log(salesData);
          let url = `http://localhost:2008/franchise/saveSales`;
          let resp = await axios.post(url,salesData,{headers:{"Content-Type":"application/x-www-form-urlencoded"}});
        
          if(resp.data.status){
              alert("Done")
              setMessage({
                text: 'Sales record saved successfully!',
                type: 'success'
              });
              setFormData({
                date: new Date().toISOString().split('T')[0],
                amount: ''
              });
              setIsSubmitting(false);
          }
          
          // // Show success message (in a real app, this would be after the API response)
          // setTimeout(() => {
            
          // }, 1000);
          
        } catch (error) {
          setMessage({
            text: 'Error saving sales record. Please try again.',
            type: 'error'
          });
          setIsSubmitting(false);
        }
      };
    
  return (
    <div>
        <div className="p-6"><h2 className="text-2xl font-bold">Sales Overview</h2><p className="mt-4">Your sales data and metrics will appear here.</p></div>;
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
          Sales Management
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">New Sales Entry</h2>
        
        {message.text && (
          <div className={`p-4 mb-4 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="date"
                id="date"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border px-4"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Sales Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border px-4"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Sales Record'}
            </button>
          </div>
        </form>
      </div>
    </div>

    </div>
  )
}

export default SalesPage





 
   


