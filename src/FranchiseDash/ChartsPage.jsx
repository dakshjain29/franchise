// // import React, { useState, useEffect } from 'react';
// // import { LineChart, BarChart, PieChart, AreaChart, Pie, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // import axios from 'axios';
// // const DateFilterDashboard = ({email}) => {
// //   // State for storing sales data
// //   const [salesData, setSalesData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
  
// //   // Date filter state
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [filteredData, setFilteredData] = useState([]);

// //   const fetchSalesData = async () => {
// //     setIsLoading(true);
// //     try {
// //       // Simulated sales data
// //       let url=`https://franchisebackend-production.up.railway.app/franchise/fetchSaleChart`
// //       let resp = await axios.post(url,{email:email},{headers:{"Content-Type":"application/x-www-form-urlencoded"}});
// //       const demoData = resp.data.appdata;
// //       if(resp.data.status==false){
// //         alert(resp.data.msg);
// //       }
// //       else{
// //       setSalesData(demoData);
// //       }
// //       // Set initial date range based on data
// //       if (demoData.length > 0) {
// //         setStartDate(demoData[0].date);
// //         setEndDate(demoData[demoData.length - 1].date);
// //       }
// //       setIsLoading(false);
// //     } catch (err) {
// //       console.error('Error fetching sales data:', err);
// //       setError('Failed to load sales data. Please try again later.');
// //       setIsLoading(false);
// //     }
// //   };
  

// //   // Fetch data from MongoDB (simulate API call)
// //   useEffect(() => {
    
// //     fetchSalesData();
// //   }, []);

// //   // Filter data when date range changes
// //   useEffect(() => {
// //     if (startDate && endDate) {
// //       const filtered = salesData.filter(
// //         item => item.date >= startDate && item.date <= endDate
// //       );
// //       setFilteredData(filtered);
// //     } else {
// //       setFilteredData(salesData);
// //     }
// //   }, [startDate, endDate, salesData]);

// //   // Calculate total sales for pie chart
// //   const getPieData = () => {
// //     if (filteredData.length === 0) return [];
    
// //     // Group sales by month for the pie chart
// //     const monthlyData = filteredData.reduce((acc, item) => {
// //       const month = new Date(item.date).toLocaleString('default', { month: 'short' });
      
// //       if (!acc[month]) {
// //         acc[month] = 0;
// //       }
      
// //       acc[month] += item.sales;
// //       return acc;
// //     }, {});
    
// //     return Object.entries(monthlyData).map(([month, sales]) => ({
// //       name: month,
// //       value: sales
// //     }));
// //   };

// //   // Calculate min and max dates from the dataset
// //   const minDate = salesData.length > 0 ? salesData[0].date : '';
// //   const maxDate = salesData.length > 0 ? salesData[salesData.length - 1].date : '';

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <p className="text-lg">Loading sales data...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <p className="text-lg text-red-500">{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-4 bg-gray-50 rounded-lg">
// //       <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
      
// //       {/* Date filter controls */}
// //       <div className="mb-6 p-4 bg-white rounded-lg shadow">
// //         <h2 className="text-lg font-semibold mb-2">Date Filter</h2>
// //         <div className="flex flex-wrap gap-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
// //             <input
// //               type="date"
// //               value={startDate}
// //               min={minDate}
// //               max={endDate}
// //               onChange={(e) => setStartDate(e.target.value)}
// //               className="border rounded p-2"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">End Date:</label>
// //             <input
// //               type="date"
// //               value={endDate}
// //               min={startDate}
// //               max={maxDate}
// //               onChange={(e) => setEndDate(e.target.value)}
// //               className="border rounded p-2"
// //             />
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Stats summary */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
// //           <p className="text-2xl font-bold">
// //             ${filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
// //           </p>
// //         </div>
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h3 className="text-sm font-medium text-gray-500">Average Weekly Sales</h3>
// //           <p className="text-2xl font-bold">
// //             ${filteredData.length > 0 
// //               ? Math.round(filteredData.reduce((sum, item) => sum + item.sales, 0) / filteredData.length).toLocaleString() 
// //               : 0}
// //           </p>
// //         </div>
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h3 className="text-sm font-medium text-gray-500">Highest Sales</h3>
// //           <p className="text-2xl font-bold">
// //             ${filteredData.length > 0 
// //               ? Math.max(...filteredData.map(item => item.sales)).toLocaleString() 
// //               : 0}
// //           </p>
// //         </div>
// //       </div>
      
// //       {/* Dashboard Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {/* Line Chart */}
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h2 className="text-lg font-semibold mb-2">Sales Trend</h2>
// //           <div className="h-64">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <LineChart data={filteredData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="date" />
// //                 <YAxis />
// //                 <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
// //                 <Legend />
// //                 <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
        
// //         {/* Bar Chart */}
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h2 className="text-lg font-semibold mb-2">Weekly Sales</h2>
// //           <div className="h-64">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <BarChart data={filteredData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="date" />
// //                 <YAxis />
// //                 <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
// //                 <Legend />
// //                 <Bar dataKey="sales" fill="#82ca9d" name="Sales" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
        
// //         {/* Area Chart */}
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h2 className="text-lg font-semibold mb-2">Cumulative Sales</h2>
// //           <div className="h-64">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <AreaChart data={filteredData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="date" />
// //                 <YAxis />
// //                 <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
// //                 <Legend />
// //                 <Area type="monotone" dataKey="sales" fill="#8884d8" stroke="#8884d8" name="Sales" />
// //               </AreaChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
        
// //         {/* Pie Chart */}
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h2 className="text-lg font-semibold mb-2">Monthly Sales Distribution</h2>
// //           <div className="h-64">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <PieChart>
// //                 <Pie
// //                   data={getPieData()}
// //                   cx="50%"
// //                   cy="50%"
// //                   labelLine={true}
// //                   outerRadius={80}
// //                   fill="#8884d8"
// //                   dataKey="value"
// //                   nameKey="name"
// //                   label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
// //                 >
// //                   {getPieData().map((entry, index) => (
// //                     <Pie key={`cell-${index}`} fill={
// //                       ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'][index % 6]
// //                     } />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Data Table */}
// //       {/* <div className="mt-6 bg-white p-4 rounded-lg shadow">
// //         <h2 className="text-lg font-semibold mb-2">Sales Data</h2>
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full bg-white">
// //             <thead>
// //               <tr>
// //                 <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
// //                 <th className="py-2 px-4 border-b border-gray-200 text-left">Sales</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredData.map((item, index) => (
// //                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
// //                   <td className="py-2 px-4 border-b border-gray-200">{item.date}</td>
// //                   <td className="py-2 px-4 border-b border-gray-200">${item.sales.toLocaleString()}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div> */}
// //     </div>
// //   );
// // };

// // export default DateFilterDashboard;

// import React, { useState, useEffect } from 'react';
// import { LineChart, BarChart, PieChart, AreaChart, Pie, Cell, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import axios from 'axios';

// const DateFilterDashboard = ({ email }) => {
//   // State for storing sales data
//   const [salesData, setSalesData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Date filter state
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [filteredData, setFilteredData] = useState([]);

//   const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

//   const fetchSalesData = async () => {
//     setIsLoading(true);
//     try {
//       // Prepare the form data
//       const formData = new URLSearchParams();
//       formData.append('email', email);
      
//       let resp = await axios.post(
//         'https://franchisebackend-production.up.railway.app/franchise/fetchSaleChart',
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//           }
//         }
//       );
      
//       console.log('API Response:', resp.data); // Debug log
      
//       if (resp.data && resp.data.status === false) {
//         setError(resp.data.msg || 'Failed to load data');
//         setIsLoading(false);
//         return;
//       }
      
//       if (resp.data && resp.data.appdata && Array.isArray(resp.data.appdata)) {
//         const demoData = resp.data.appdata;
//         setSalesData(demoData);
        
//         // Set initial date range based on data
//         if (demoData.length > 0) {
//           setStartDate(demoData[0].date);
//           setEndDate(demoData[demoData.length - 1].date);
//         }
//       } else {
//         setError('Invalid data format received from server');
//       }
//     } catch (err) {
//       console.error('Error fetching sales data:', err);
//       setError('Failed to load sales data. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Fetch data from MongoDB (simulate API call)
//   useEffect(() => {
//     if (email) {
//       fetchSalesData();
//     } else {
//       setError('Email is required to fetch data');
//       setIsLoading(false);
//     }
//   }, [email]);

//   // Filter data when date range changes
//   useEffect(() => {
//     if (startDate && endDate) {
//       const filtered = salesData.filter(
//         item => item.date >= startDate && item.date <= endDate
//       );
//       setFilteredData(filtered);
//     } else {
//       setFilteredData(salesData);
//     }
//   }, [startDate, endDate, salesData]);

//   // Calculate total sales for pie chart
//   const getPieData = () => {
//     if (filteredData.length === 0) return [];
    
//     // Group sales by month for the pie chart
//     const monthlyData = filteredData.reduce((acc, item) => {
//       const month = new Date(item.date).toLocaleString('default', { month: 'short' });
      
//       if (!acc[month]) {
//         acc[month] = 0;
//       }
      
//       acc[month] += item.sales;
//       return acc;
//     }, {});
    
//     return Object.entries(monthlyData).map(([month, sales]) => ({
//       name: month,
//       value: sales
//     }));
//   };

//   // Calculate min and max dates from the dataset
//   const minDate = salesData.length > 0 ? salesData[0].date : '';
//   const maxDate = salesData.length > 0 ? salesData[salesData.length - 1].date : '';

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-lg">Loading sales data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-lg text-red-500">{error}</p>
//       </div>
//     );
//   }

//   if (salesData.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-lg">No sales data available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 bg-gray-50 rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
      
//       {/* Date filter controls */}
//       <div className="mb-6 p-4 bg-white rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-2">Date Filter</h2>
//         <div className="flex flex-wrap gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
//             <input
//               type="date"
//               value={startDate}
//               min={minDate}
//               max={endDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="border rounded p-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date:</label>
//             <input
//               type="date"
//               value={endDate}
//               min={startDate}
//               max={maxDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="border rounded p-2"
//             />
//           </div>
//           <div className="mt-auto">
//             <button 
//               onClick={fetchSalesData}
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//             >
//               Refresh Data
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Stats summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
//           <p className="text-2xl font-bold">
//             ${filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-sm font-medium text-gray-500">Average Weekly Sales</h3>
//           <p className="text-2xl font-bold">
//             ${filteredData.length > 0 
//               ? Math.round(filteredData.reduce((sum, item) => sum + item.sales, 0) / filteredData.length).toLocaleString() 
//               : 0}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-sm font-medium text-gray-500">Highest Sales</h3>
//           <p className="text-2xl font-bold">
//             ${filteredData.length > 0 
//               ? Math.max(...filteredData.map(item => item.sales)).toLocaleString() 
//               : 0}
//           </p>
//         </div>
//       </div>
      
//       {/* Dashboard Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Line Chart */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2">Sales Trend</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={filteredData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
//                 <Legend />
//                 <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
        
//         {/* Bar Chart */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2">Weekly Sales</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={filteredData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
//                 <Legend />
//                 <Bar dataKey="sales" fill="#82ca9d" name="Sales" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
        
//         {/* Area Chart */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2">Cumulative Sales</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={filteredData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
//                 <Legend />
//                 <Area type="monotone" dataKey="sales" fill="#8884d8" stroke="#8884d8" name="Sales" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
        
//         {/* Pie Chart */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2">Monthly Sales Distribution</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={getPieData()}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={true}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   nameKey="name"
//                   label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {getPieData().map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DateFilterDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DataDisplayComponent = ({ email }) => {
//   // State for storing sales data
//   const [salesData, setSalesData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Date filter state
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [filteredData, setFilteredData] = useState([]);

//   const fetchSalesData = async () => {
//     setIsLoading(true);
//     try {
//       // Prepare the form data
//       const formData = new URLSearchParams();
//       formData.append('email', email);
      
//       let resp = await axios.post(
//         'https://franchisebackend-production.up.railway.app/franchise/fetchSaleChart',
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//           }
//         }
//       );
      
//       console.log('API Response:', resp.data); // Debug log
      
//       if (resp.data && resp.data.status === false) {
//         setError(resp.data.msg || 'Failed to load data');
//         setIsLoading(false);
//         return;
//       }
      
//       if (resp.data && resp.data.appdata && Array.isArray(resp.data.appdata)) {
//         const demoData = resp.data.appdata;
//         setSalesData(demoData);
        
//         // Set initial date range based on data
//         if (demoData.length > 0) {
//           setStartDate(demoData[0].date);
//           setEndDate(demoData[demoData.length - 1].date);
//         }
//       } else {
//         setError('Invalid data format received from server');
//       }
//     } catch (err) {
//       console.error('Error fetching sales data:', err);
//       setError('Failed to load sales data. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Fetch data from MongoDB
//   useEffect(() => {
//     if (email) {
//       fetchSalesData();
//     } else {
//       setError('Email is required to fetch data');
//       setIsLoading(false);
//     }
//   }, [email]);

//   // Filter data when date range changes
//   useEffect(() => {
//     if (startDate && endDate) {
//       const filtered = salesData.filter(
//         item => item.date >= startDate && item.date <= endDate
//       );
//       setFilteredData(filtered);
//     } else {
//       setFilteredData(salesData);
//     }
//   }, [startDate, endDate, salesData]);

//   // Calculate min and max dates from the dataset
//   const minDate = salesData.length > 0 ? salesData[0].date : '';
//   const maxDate = salesData.length > 0 ? salesData[salesData.length - 1].date : '';

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-lg">Loading sales data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-lg text-red-500">{error}</p>
//       </div>
//     );
//   }

//   if (salesData.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-lg">No sales data available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 bg-gray-50 rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">Sales Data</h1>
      
//       {/* Date filter controls */}
//       <div className="mb-6 p-4 bg-white rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-2">Date Filter</h2>
//         <div className="flex flex-wrap gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
//             <input
//               type="date"
//               value={startDate}
//               min={minDate}
//               max={endDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="border rounded p-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date:</label>
//             <input
//               type="date"
//               value={endDate}
//               min={startDate}
//               max={maxDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="border rounded p-2"
//             />
//           </div>
//           <div className="mt-auto">
//             <button 
//               onClick={fetchSalesData}
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//             >
//               Refresh Data
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Summary Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
//           <p className="text-2xl font-bold">
//             ${filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-sm font-medium text-gray-500">Records Found</h3>
//           <p className="text-2xl font-bold">
//             {filteredData.length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-sm font-medium text-gray-500">Date Range</h3>
//           <p className="text-lg font-bold">
//             {filteredData.length > 0 ? 
//               `${filteredData[0].date} - ${filteredData[filteredData.length - 1].date}` : 
//               'No data'}
//           </p>
//         </div>
//       </div>
      
//       {/* Data Table */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-2">Sales Data Table</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-100">
//               <tr>
//                 {filteredData.length > 0 && Object.keys(filteredData[0]).map((key) => (
//                   <th key={key} className="py-2 px-4 border-b border-gray-200 text-left font-medium text-gray-700">
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((item, index) => (
//                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                   {Object.entries(item).map(([key, value]) => (
//                     <td key={key} className="py-2 px-4 border-b border-gray-200">
//                       {key === 'sales' ? `$${Number(value).toLocaleString()}` : 
//                        typeof value === 'number' ? value.toLocaleString() : 
//                        String(value)}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataDisplayComponent;


import React, { useState, useEffect } from 'react';
import { Calendar, Filter, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ChartPage({email}) {
    const [dateRange, setDateRange] = useState({
        fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
        toDate: new Date().toISOString().split('T')[0]
    });
    const [salesData, setSalesData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [totalSales, setTotalSales] = useState(0);
    const [activeChart, setActiveChart] = useState('bar');
    
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
        
            let url = `https://franchisebackend-production.up.railway.app/franchise/fetchSales`;
            let resp = await axios.post(url, {
                email: email,
                fromdate: fromDateIso,
                todate: toDateIso
            }, {
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            });
            
            console.log(resp.data.appdata);
            if (resp.data.status == true) {
                setSalesData(resp.data.appdata);
                setTotalSales(resp.data.total || resp.data.appdata.reduce((sum, sale) => sum + sale.amount, 0));
                
                // Process data for charts
                const processedData = processDataForCharts(resp.data.appdata);
                setChartData(processedData);
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
    
    const processDataForCharts = (data) => {
        // Group by date and calculate daily totals
        const dateMap = {};
        
        data.forEach(sale => {
            const date = new Date(sale.date).toLocaleDateString();
            if (!dateMap[date]) {
                dateMap[date] = 0;
            }
            dateMap[date] += sale.amount;
        });
        
        // Convert to array sorted by date
        const chartData = Object.keys(dateMap).map(date => ({
            date,
            sales: dateMap[date]
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
        
        return chartData;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSalesData();
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
                                Showing data for <span className="font-medium">{chartData.length}</span> {chartData.length === 1 ? 'day' : 'days'}
                            </p>
                            <p className="text-sm text-gray-800">
                                Total Sales: <span className="font-bold text-green-600">${totalSales.toFixed(2)}</span>
                            </p>
                        </div>
                    )}

                    {/* Chart Type Toggle */}
                    {!isLoading && chartData.length > 0 && (
                        <div className="mb-4 flex justify-center">
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                <button
                                    type="button"
                                    onClick={() => setActiveChart('bar')}
                                    className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                                        activeChart === 'bar' 
                                            ? 'bg-blue-600 text-white border-blue-600' 
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    Bar Chart
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveChart('line')}
                                    className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                                        activeChart === 'line' 
                                            ? 'bg-blue-600 text-white border-blue-600' 
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    Line Chart
                                </button>
                            </div>
                        </div>
                    )}
                    
                    <div className="rounded-md border">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                            </div>
                        ) : chartData.length > 0 ? (
                            <div className="h-96 p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    {activeChart === 'bar' ? (
                                        <BarChart
                                            data={chartData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis 
                                                dataKey="date" 
                                                angle={-45} 
                                                textAnchor="end"
                                                height={70}
                                            />
                                            <YAxis 
                                                label={{ value: 'Sales ($)', angle: -90, position: 'insideLeft' }} 
                                            />
                                            <Tooltip 
                                                formatter={(value) => [`$${value.toFixed(2)}`, 'Sales']}
                                            />
                                            <Legend />
                                            <Bar dataKey="sales" name="Sales ($)" fill="#4f46e5" />
                                        </BarChart>
                                    ) : (
                                        <LineChart
                                            data={chartData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis 
                                                dataKey="date" 
                                                angle={-45} 
                                                textAnchor="end"
                                                height={70}
                                            />
                                            <YAxis 
                                                label={{ value: 'Sales ($)', angle: -90, position: 'insideLeft' }} 
                                            />
                                            <Tooltip 
                                                formatter={(value) => [`$${value.toFixed(2)}`, 'Sales']}
                                            />
                                            <Legend />
                                            <Line 
                                                type="monotone" 
                                                dataKey="sales" 
                                                name="Sales ($)" 
                                                stroke="#4f46e5" 
                                                activeDot={{ r: 8 }} 
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-32 text-gray-500">
                                No sales data found for the selected date range
                            </div>
                        )}
                    </div>

                    {/* Summary Cards */}
                    {!isLoading && chartData.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900">Total Sales</h3>
                                <p className="text-2xl font-bold text-green-600">${totalSales.toFixed(2)}</p>
                            </div>
                            
                            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900">Average Daily Sales</h3>
                                <p className="text-2xl font-bold text-blue-600">
                                    ${(totalSales / chartData.length).toFixed(2)}
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900">Highest Daily Sales</h3>
                                <p className="text-2xl font-bold text-purple-600">
                                    ${Math.max(...chartData.map(item => item.sales)).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChartPage