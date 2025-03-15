import React, { useState, useEffect } from 'react';
import { Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import axios from 'axios';

function HistoryPage({email}) {
    const [dateRange, setDateRange] = useState({
        fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
        toDate: new Date().toISOString().split('T')[0]
      });
      const [salesData, setSalesData] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');
      const [totalSales, setTotalSales] = useState(0);
    
      const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const fetchSalesData = async () => {
        setIsLoading(true);
        setError('');
        
        try {
          // Convert dates to MongoDB ISODate format
          const fromDateIso = new Date(dateRange.fromDate).toISOString();
          const toDateIso = new Date(dateRange.toDate + 'T23:59:59').toISOString();
        
          let url = "http://localhost:2008/franchise/fetchSales";
          let resp = await axios.post(url,{email:email,fromdate:fromDateIso,todate:toDateIso},{headers:{"Content-Type":"application/x-www-form-urlencoded"}});
          console.log(resp.data.appdata);
          if (resp.data.status == true) {
            setSalesData(resp.data.appdata);
            setTotalSales(resp.data.total || resp.data.appdata.reduce((sum, sale) => sum + sale.amount, 0));
          } else {
            alert(resp.data.msg);
          }
          
          
        } catch (error) {
          setError('Failed to fetch sales data. Please try again later.');
          console.error('Error fetching sales data:', error);
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        fetchSalesData();
      };
    
      const downloadCSV = () => {
        if (salesData.length === 0) return;
        
        // Format headers and data rows
        const headers = ['Date', 'Amount'];
        const dataRows = salesData.map(sale => [
          new Date(sale.date).toLocaleDateString(),
          sale.amount.toFixed(2)
        ]);
        
        // Create CSV content
        const csvContent = [
          headers.join(','),
          ...dataRows.map(row => row.join(','))
        ].join('\n');
        
        // Create blob and download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.setAttribute('href', url);
        link.setAttribute('download', `sales_${dateRange.fromDate}_to_${dateRange.toDate}.csv`);
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
      // Initialize with data on first load
      useEffect(() => {
        fetchSalesData();
      }, []);
        
  return (
    <div>
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-6xl mx-auto my-8">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sales History</h2>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="fromDate"
                  id="fromDate"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border px-4"
                  value={dateRange.fromDate}
                  onChange={handleDateChange}
                  max={dateRange.toDate}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="toDate"
                  id="toDate"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border px-4"
                  value={dateRange.toDate}
                  onChange={handleDateChange}
                  min={dateRange.fromDate}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                <Filter className="mr-2 h-4 w-4" />
                {isLoading ? 'Loading...' : 'Filter'}
              </button>
              
              <button
                type="button"
                onClick={downloadCSV}
                disabled={salesData.length === 0 || isLoading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  salesData.length === 0 || isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>
        </form>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        {!isLoading && salesData.length > 0 && (
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{salesData.length}</span> records
            </p>
            <p className="text-sm text-gray-800">
              Total Sales: <span className="font-bold text-green-600">${totalSales.toFixed(2)}</span>
            </p>
          </div>
        )}
        
        <div className="overflow-x-auto rounded-md border">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
          ) : salesData.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.map((sale) => (
                  <tr key={sale._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(sale.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${sale.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center h-32 text-gray-500">
              No sales data found for the selected date range
            </div>
          )}
        </div>
      </div>
    </div>
  
    </div>
  )
}

export default HistoryPage





  