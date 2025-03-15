import React from 'react'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
  
function HomePage() {

    const salesData = [
    { month: 'Jan', sales: 4000, profit: 2400, target: 3000 },
    { month: 'Feb', sales: 3000, profit: 1398, target: 3000 },
    { month: 'Mar', sales: 5000, profit: 3300, target: 3000 },
    { month: 'Apr', sales: 2780, profit: 3908, target: 3000 },
    { month: 'May', sales: 1890, profit: 4800, target: 3000 },
    { month: 'Jun', sales: 2390, profit: 3800, target: 3000 },
    { month: 'Jul', sales: 3490, profit: 4300, target: 3000 },
  ];

  const salesByCategory = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Food', value: 20 },
    { name: 'Books', value: 10 },
    { name: 'Other', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-12 mx-auto w-full">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Line Chart: Trend Analysis Over Time</h2>
        <p className="text-gray-600">Best for showing continuous data changes and trends over time.</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="target" stroke="#ff7300" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Bar Chart: Comparing Sales by Period</h2>
        <p className="text-gray-600">Excellent for comparing discrete values across categories or time periods.</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="profit" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Area Chart: Showing Cumulative Trends</h2>
        <p className="text-gray-600">Ideal for emphasizing the volume of data and showing cumulative values.</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="profit" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Pie Chart: Sales Distribution by Category</h2>
        <p className="text-gray-600">Best for showing proportional distribution or composition of data.</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {salesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Composed Chart: Multiple Metrics Visualization</h2>
        <p className="text-gray-600">Combines different chart types to show multiple metrics in one view.</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={salesData}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="profit" stroke="#ff7300" />
              <Line type="monotone" dataKey="target" stroke="#4BC0C0" strokeDasharray="5 5" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
  
}

export default HomePage