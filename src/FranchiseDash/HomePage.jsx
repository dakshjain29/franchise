import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, Receipt, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

function HomePage() {
  const [sales, setSales] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  const today = new Date().toISOString().split('T')[0];
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

  useEffect(() => {
    api.post('/franchise/fetchSales', { fromdate: monthStart, todate: `${today}T23:59:59.999Z` })
      .then((response) => setSales(response.data.appdata || []))
      .catch((error) => setState({ loading: false, error: error.response?.data?.msg || 'Unable to load your overview.' }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, [monthStart, today]);

  const total = sales.reduce((sum, sale) => sum + Number(sale.amount || 0), 0);
  const latest = [...sales].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const cards = [{ label: 'This month', value: `₹${total.toLocaleString()}`, icon: TrendingUp }, { label: 'Sales entries', value: sales.length, icon: Receipt }, { label: 'Last recorded', value: latest[0] ? new Date(latest[0].date).toLocaleDateString() : 'None yet', icon: CalendarDays }];

  return <section className="space-y-7"><div><p className="text-sm text-[#718078]">A calm view of your latest numbers</p><h2 className="mt-1 text-3xl font-semibold tracking-tight">Good morning</h2></div>{state.error && <p className="rounded-lg border border-[#e6caca] bg-[#fff3f1] p-4 text-sm text-[#9a3f3b]">{state.error}</p>}<div className="grid gap-4 md:grid-cols-3">{cards.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-5"><Icon size={19} className="text-[#b06d52]" /><p className="mt-5 text-sm text-[#718078]">{label}</p><p className="mt-1 text-2xl font-semibold">{state.loading ? '...' : value}</p></div>)}</div><div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-[#718078]">Recent activity</p><h3 className="mt-1 text-xl font-semibold">Latest sales</h3></div><Link to="/frDashboard/history" className="flex items-center gap-1 text-sm font-semibold text-[#356b59]">View history <ArrowRight size={16} /></Link></div>{!state.loading && latest.length === 0 ? <p className="mt-8 text-sm text-[#718078]">Your recorded sales will appear here.</p> : <ul className="mt-6 divide-y divide-[#e5e9e5]">{latest.map((sale) => <li key={sale._id} className="flex items-center justify-between py-3 text-sm"><span className="text-[#718078]">{new Date(sale.date).toLocaleDateString()}</span><span className="font-semibold text-[#35554a]">₹{Number(sale.amount).toLocaleString()}</span></li>)}</ul>}</div><div className="rounded-xl bg-[#35554a] p-6 text-[#f7f6ef]"><p className="text-sm text-[#cbded0]">Keep your records current</p><h3 className="mt-2 text-2xl font-semibold">Add today&apos;s sales</h3><p className="mt-3 text-sm leading-6 text-[#dbe7dc]">Small, consistent updates make your performance view more useful.</p><Link to="/frDashboard/sales" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#e7b27f] px-4 py-2.5 text-sm font-semibold text-[#23312d]">Record a sale <ArrowRight size={16} /></Link></div></div></section>;
}

export default HomePage;
