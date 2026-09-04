import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CalendarDays, Filter, RefreshCw } from 'lucide-react';
import api from '../lib/api';

const currentDate = () => new Date().toISOString().split('T')[0];

function ChartsPage() {
  const [range, setRange] = useState({
    fromdate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    todate: currentDate(),
  });
  const [sales, setSales] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  const loadSales = async () => {
    setState({ loading: true, error: '' });
    try {
      const response = await api.post('/franchise/fetchSales', {
        fromdate: range.fromdate,
        todate: `${range.todate}T23:59:59.999Z`,
      });
      setSales(response.data.appdata || []);
    } catch (error) {
      setState({ loading: false, error: error.response?.data?.msg || 'Unable to load performance data.' });
    } finally {
      setState((current) => ({ ...current, loading: false }));
    }
  };

  // Load the initial date window once; later requests are explicit filter submits.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadSales(); }, []);

  const chartData = useMemo(() => Object.values(sales.reduce((days, sale) => {
    const date = new Date(sale.date).toLocaleDateString();
    days[date] = { date, amount: (days[date]?.amount || 0) + Number(sale.amount || 0) };
    return days;
  }, {})), [sales]);
  const total = chartData.reduce((sum, day) => sum + day.amount, 0);

  return <section><div className="mb-7"><p className="text-sm text-[#718078]">Understand the pace of your business</p><h2 className="mt-1 text-3xl font-semibold tracking-tight">Performance</h2></div><form onSubmit={(event) => { event.preventDefault(); loadSales(); }} className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-5"><label className="text-sm font-medium text-[#35554a]">From<div className="relative mt-2"><CalendarDays className="pointer-events-none absolute left-3 top-3 text-[#718078]" size={17} /><input required type="date" value={range.fromdate} max={range.todate} onChange={(event) => setRange({ ...range, fromdate: event.target.value })} className="rounded-lg border border-[#ccd7d0] bg-white py-2.5 pl-9 pr-3" /></div></label><label className="text-sm font-medium text-[#35554a]">To<div className="relative mt-2"><CalendarDays className="pointer-events-none absolute left-3 top-3 text-[#718078]" size={17} /><input required type="date" value={range.todate} min={range.fromdate} max={currentDate()} onChange={(event) => setRange({ ...range, todate: event.target.value })} className="rounded-lg border border-[#ccd7d0] bg-white py-2.5 pl-9 pr-3" /></div></label><button disabled={state.loading} className="flex items-center gap-2 rounded-lg bg-[#356b59] px-4 py-2.5 text-sm font-semibold text-white"><Filter size={16} />{state.loading ? 'Loading...' : 'Apply filter'}</button></form>{state.error && <p className="mb-5 rounded-lg bg-[#fff3f1] p-4 text-sm text-[#9a3f3b]">{state.error}</p>}{state.loading ? <div className="flex h-64 items-center justify-center text-[#718078]"><RefreshCw className="animate-spin" /></div> : <><div className="mb-6 grid gap-4 sm:grid-cols-3"><div className="rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-5"><p className="text-sm text-[#718078]">Filtered sales</p><p className="mt-2 text-2xl font-semibold">₹{total.toLocaleString()}</p></div><div className="rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-5"><p className="text-sm text-[#718078]">Active days</p><p className="mt-2 text-2xl font-semibold">{chartData.length}</p></div><div className="rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-5"><p className="text-sm text-[#718078]">Daily average</p><p className="mt-2 text-2xl font-semibold">₹{chartData.length ? Math.round(total / chartData.length).toLocaleString() : 0}</p></div></div>{chartData.length ? <div className="grid gap-5 lg:grid-cols-2"><ChartPanel title="Sales trend" Chart={LineChart} Mark={Line} data={chartData} color="#356b59" /><ChartPanel title="Daily totals" Chart={BarChart} Mark={Bar} data={chartData} color="#c48b5a" /></div> : <p className="rounded-xl border border-dashed border-[#cbd7cf] p-12 text-center text-sm text-[#718078]">No sales recorded for this period.</p>}</>}</section>;
}

// eslint-disable-next-line react/prop-types
function ChartPanel({ title, Chart, Mark, data, color }) {
  return <div className="h-80 rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-5"><h3 className="mb-4 font-semibold">{title}</h3><ResponsiveContainer width="100%" height="90%"><Chart data={data}><CartesianGrid stroke="#e3e9e3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Mark dataKey="amount" stroke={color} fill={color} strokeWidth={2} /></Chart></ResponsiveContainer></div>;
}

export default ChartsPage;
