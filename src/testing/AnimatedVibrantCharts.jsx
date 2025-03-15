import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, ScatterChart, Scatter, 
  CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

// Vibrant color palette
const VIBRANT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFD166', '#6A0572', 
  '#AB83A1', '#F15BB5', '#00BBF9', '#80ED99',
  '#FCBF49', '#9B5DE5', '#F15BB5', '#FEE440'
];

const CHART_ANIMATION_DURATION = 1000;

function AnimatedVibrantCharts() {
  // State for managing animation
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Sales data with random values for demo
  const monthlyData = [
    { name: 'Jan', sales: 4000, revenue: 2400, profit: 1600 },
    { name: 'Feb', sales: 5000, revenue: 3700, profit: 2100 },
    { name: 'Mar', sales: 3780, revenue: 2500, profit: 980 },
    { name: 'Apr', sales: 7890, revenue: 5400, profit: 2600 },
    { name: 'May', sales: 6390, revenue: 4100, profit: 1800 },
    { name: 'Jun', sales: 8200, revenue: 5900, profit: 2800 },
  ];

  const pieData = [
    { name: 'Mobile', value: 35 },
    { name: 'Desktop', value: 40 },
    { name: 'Tablet', value: 15 },
    { name: 'Other', value: 10 },
  ];
  
  const scatterData = Array.from({ length: 30 }, (_, i) => ({
    x: Math.floor(Math.random() * 100) + 50,
    y: Math.floor(Math.random() * 100) + 50,
    z: Math.floor(Math.random() * 100) + 10,
  }));

  // Animation effect
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  // Custom gradient for area chart
  const gradientOffset = () => {
    const dataMax = Math.max(...monthlyData.map(i => i.profit));
    const dataMin = Math.min(...monthlyData.map(i => i.profit));
    
    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;
    
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '50px', 
      padding: '20px',
      background: 'linear-gradient(to bottom, #1a1a2e, #16213e)',
      color: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    }}>
      <h1 style={{ textAlign: 'center', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        Vibrant Animated Charts
      </h1>
      
      {/* 1. Animated Multi-Line Chart */}
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#4ECDC4', marginBottom: '20px' }}>Animated Line Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: '#16213e', border: 'none', borderRadius: '5px' }} />
            <Legend wrapperStyle={{ color: '#fff' }} />
            
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke={VIBRANT_COLORS[0]} 
              strokeWidth={3}
              dot={{ stroke: VIBRANT_COLORS[0], strokeWidth: 2, r: 6, fill: '#16213e' }}
              activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive={isAnimated}
              animationDuration={CHART_ANIMATION_DURATION}
              animationEasing="ease-in-out"
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke={VIBRANT_COLORS[1]} 
              strokeWidth={3}
              dot={{ stroke: VIBRANT_COLORS[1], strokeWidth: 2, r: 6, fill: '#16213e' }}
              activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive={isAnimated}
              animationDuration={CHART_ANIMATION_DURATION}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Animated Bar Chart with Gradient Bars */}
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#FF6B6B', marginBottom: '20px' }}>Glowing Bar Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: '#16213e', border: 'none', borderRadius: '5px' }} />
            <Legend wrapperStyle={{ color: '#fff' }} />
            <defs>
              <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={VIBRANT_COLORS[2]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={VIBRANT_COLORS[2]} stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={VIBRANT_COLORS[3]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={VIBRANT_COLORS[3]} stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <Bar 
              dataKey="profit" 
              fill="url(#barGradient1)" 
              radius={[10, 10, 0, 0]}
              isAnimationActive={isAnimated}
              animationDuration={CHART_ANIMATION_DURATION}
              animationEasing="ease-out"
            />
            <Bar 
              dataKey="revenue" 
              fill="url(#barGradient2)" 
              radius={[10, 10, 0, 0]}
              isAnimationActive={isAnimated}
              animationDuration={CHART_ANIMATION_DURATION + 300}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Animated Area Chart with Gradient */}
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#FFD166', marginBottom: '20px' }}>Gradient Area Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: '#16213e', border: 'none', borderRadius: '5px' }} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F15BB5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F15BB5" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="#F15BB5" 
              fillOpacity={1} 
              fill="url(#colorGradient)" 
              strokeWidth={3}
              isAnimationActive={isAnimated}
              animationDuration={CHART_ANIMATION_DURATION + 500}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 4. Animated Pie Chart with Custom Colors */}
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#9B5DE5', marginBottom: '20px' }}>Interactive Pie Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              isAnimationActive={isAnimated}
              animationDuration={CHART_ANIMATION_DURATION + 400}
              animationEasing="ease-out"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: 'rgba(255,255,255,0.3)', strokeWidth: 1 }}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#16213e', border: 'none', borderRadius: '5px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 5. Animated Scatter Plot with Colorful Dots */}
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#00BBF9', marginBottom: '20px' }}>Dynamic Scatter Plot</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis type="number" dataKey="x" name="value" stroke="#fff" />
            <YAxis type="number" dataKey="y" name="index" stroke="#fff" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#16213e', border: 'none', borderRadius: '5px' }}
            />
            <Scatter 
              name="Values" 
              data={scatterData} 
              fill={VIBRANT_COLORS[8]}
              isAnimationActive={isAnimated}
              animationDuration={CHART_ANIMATION_DURATION + 600}
              animationEasing="cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            >
              {scatterData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} 
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnimatedVibrantCharts;