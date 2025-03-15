import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  ScatterChart, Scatter, RadarChart, Radar, RadialBarChart, RadialBar,
  ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// Sample data
const monthlyData = [
  { name: 'Jan', sales: 4000, expenses: 2400 },
  { name: 'Feb', sales: 3000, expenses: 1398 },
  { name: 'Mar', sales: 2000, expenses: 9800 },
  { name: 'Apr', sales: 2780, expenses: 3908 },
  { name: 'May', sales: 1890, expenses: 4800 },
  { name: 'Jun', sales: 2390, expenses: 3800 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const radarData = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
  { subject: 'English', A: 86, B: 130, fullMark: 150 },
  { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
  { subject: 'History', A: 65, B: 85, fullMark: 150 },
];

const radialData = [
  { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
  { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
  { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
  { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
  { name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c' },
  { name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57' },
];

function ChartGallery() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
      {/* 1. Bar Chart */}
      <div>
        <h2>Bar Chart</h2>
        <BarChart width={600} height={300} data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
          <Bar dataKey="expenses" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* 2. Line Chart */}
      <div>
        <h2>Line Chart</h2>
        <LineChart width={600} height={300} data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
        </LineChart>
      </div>

      {/* 3. Area Chart */}
      <div>
        <h2>Area Chart</h2>
        <AreaChart width={600} height={300} data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="expenses" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </div>

      {/* 4. Pie Chart */}
      <div>
        <h2>Pie Chart</h2>
        <PieChart width={400} height={300}>
          <Pie dataKey="value" isAnimationActive={true} data={pieData} cx={200} cy={150} 
              outerRadius={80} fill="#8884d8" label />
          <Tooltip />
        </PieChart>
      </div>

      {/* 5. Scatter Chart */}
      <div>
        <h2>Scatter Chart</h2>
        <ScatterChart width={600} height={300}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="size" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A school" data={scatterData} fill="#8884d8" />
        </ScatterChart>
      </div>

      {/* 6. Radar Chart */}
      <div>
        <h2>Radar Chart</h2>
        <RadarChart outerRadius={150} width={600} height={300} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </div>

      {/* 7. Radial Bar Chart */}
      <div>
        <h2>Radial Bar Chart</h2>
        <RadialBarChart width={600} height={300} cx={300} cy={150} 
            innerRadius={20} outerRadius={140} barSize={10} data={radialData}>
          <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} 
              background clockWise dataKey="uv" />
          <Legend iconSize={10} width={120} height={140} layout="vertical" 
              verticalAlign="middle" align="right" />
        </RadialBarChart>
      </div>

      {/* 8. Composed Chart (Combination) */}
      <div>
        <h2>Composed Chart</h2>
        <ComposedChart width={600} height={300} data={monthlyData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="expenses" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="sales" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="sales" stroke="#ff7300" />
        </ComposedChart>
      </div>
    </div>
  );
}

export default ChartGallery;