import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowLeft, Building2, Check, ClipboardList, LogOut, Settings, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import AppCard from './AppCard';
import api from '../lib/api';
import { sendCustomEmail } from '../Emails/email';
import FranchiseEmailBody from '../Emails/FranchiseEmail';

const tabs = [
  { id: 'applicants', label: 'Applicants', icon: ClipboardList },
  { id: 'franchises', label: 'Franchises', icon: Building2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('applicants');
  const [applicants, setApplicants] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sales, setSales] = useState([]);
  const [dates, setDates] = useState({ fromdate: '', todate: '' });
  const [status, setStatus] = useState({ loading: true, error: '', message: '' });

  const auth = JSON.parse(localStorage.getItem('auth') || 'null');

  useEffect(() => {
    if (!auth?.token || auth.role !== 'admin') navigate('/login');
  }, [auth?.role, auth?.token, navigate]);

  const loadApplicants = async () => {
    setStatus((current) => ({ ...current, loading: true, error: '' }));
    try {
      const response = await api.get('/admin/fetchdata');
      setApplicants(response.data.appdata || []);
    } catch (error) {
      setStatus((current) => ({ ...current, error: error.response?.data?.msg || 'Unable to load applicants.' }));
    } finally {
      setStatus((current) => ({ ...current, loading: false }));
    }
  };

  const loadFranchises = async () => {
    setStatus((current) => ({ ...current, loading: true, error: '' }));
    try {
      const response = await api.get('/admin/franchises');
      setFranchises(response.data.appdata || []);
    } catch (error) {
      setStatus((current) => ({ ...current, error: error.response?.data?.msg || 'Unable to load franchises.' }));
    } finally {
      setStatus((current) => ({ ...current, loading: false }));
    }
  };

  useEffect(() => { loadApplicants(); }, []);
  useEffect(() => { if (tab === 'franchises') loadFranchises(); }, [tab]);

  const updateStatus = async (endpoint, email) => {
    try {
      await api.post(`/admin/${endpoint}`, { email });
      setStatus((current) => ({ ...current, message: 'Applicant status updated.', error: '' }));
      await loadApplicants();
    } catch (error) {
      setStatus((current) => ({ ...current, error: error.response?.data?.msg || 'Action could not be completed.' }));
    }
  };

  const grantFranchise = async (email) => {
    try {
      await api.post('/admin/grantapp', { email });
      const response = await api.post('/admin/addfranchise', { email });
      if (!response.data.status || !response.data.pwd) {
        throw new Error(response.data.msg || 'Franchise credentials could not be created.');
      }
      try {
        await sendCustomEmail({
          to_email: email,
          subject: 'Your FranchiseHub login credentials',
          message: ReactDOMServer.renderToStaticMarkup(
            <FranchiseEmailBody pwd={response.data.pwd} email={email} />,
          ),
        });
      } catch (emailError) {
        throw new Error(`Franchise created, but credentials could not be emailed: ${emailError.message}`);
      }
      setStatus((current) => ({ ...current, message: 'Franchise created and credentials emailed.', error: '' }));
      await Promise.all([loadApplicants(), loadFranchises()]);
    } catch (error) {
      setStatus((current) => ({ ...current, error: error.response?.data?.msg || error.message || 'Franchise could not be created.' }));
    }
  };

  const openSales = async (franchise) => {
    setSelected(franchise);
    setStatus((current) => ({ ...current, loading: true, error: '' }));
    try {
      const response = await api.post('/admin/franchise-sales', { email: franchise.email, ...dates });
      setSales(response.data.appdata || []);
    } catch (error) {
      setStatus((current) => ({ ...current, error: error.response?.data?.msg || 'Unable to load sales.' }));
    } finally {
      setStatus((current) => ({ ...current, loading: false }));
    }
  };

  const chartData = useMemo(() => sales.map((item) => ({ date: new Date(item.date).toLocaleDateString(), amount: item.amount })), [sales]);
  const total = sales.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('LoginObj');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <main className="min-h-screen bg-[#f4f5f2] text-[#23312d]">
      <header className="border-b border-[#dce2dc] bg-[#fbfcf9]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#668077]">FranchiseHub</p><h1 className="mt-1 text-2xl font-semibold tracking-tight">Admin workspace</h1></div>
          <div className="flex items-center gap-3 text-sm text-[#668077]"><ShieldCheck size={18} /> {auth?.email}<button onClick={logout} className="rounded-lg border border-[#ccd7d0] p-2 text-[#35554a] hover:bg-[#edf2ed]" title="Log out"><LogOut size={18} /></button></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
        <nav className="mb-8 flex gap-2 overflow-x-auto border-b border-[#dce2dc]">
          {tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setTab(id); setSelected(null); }} className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium ${tab === id ? 'border-[#356b59] text-[#356b59]' : 'border-transparent text-[#718078] hover:text-[#35554a]'}`}><Icon size={17} />{label}</button>)}
        </nav>
        {status.message && <div className="mb-5 flex items-center gap-2 rounded-lg border border-[#c7dfd0] bg-[#eef8f0] px-4 py-3 text-sm text-[#28613c]"><Check size={17} />{status.message}</div>}
        {status.error && <div className="mb-5 flex items-center gap-2 rounded-lg border border-[#e6caca] bg-[#fff3f1] px-4 py-3 text-sm text-[#9a3f3b]"><X size={17} />{status.error}</div>}
        {tab === 'applicants' && <section><div className="mb-6"><p className="text-sm text-[#718078]">Review the application pipeline</p><h2 className="text-3xl font-semibold">Applicants</h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{applicants.map((item) => <AppCard key={item._id || item.email} {...item} onAccept={(email) => updateStatus('acceptapp', email)} onReject={(email) => updateStatus('rejectapp', email)} onFranchise={grantFranchise} />)}</div>{!status.loading && applicants.length === 0 && <p className="rounded-xl border border-dashed border-[#cbd7cf] p-12 text-center text-[#718078]">No applicants found.</p>}</section>}
        {tab === 'franchises' && <section><div className="mb-6"><p className="text-sm text-[#718078]">Monitor approved locations</p><h2 className="text-3xl font-semibold">Franchises</h2></div>{selected ? <div><button onClick={() => setSelected(null)} className="mb-5 flex items-center gap-2 text-sm font-medium text-[#356b59]"><ArrowLeft size={16} /> Back to franchises</button><div className="mb-6 rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-6"><p className="text-sm text-[#718078]">Selected franchise</p><h3 className="text-2xl font-semibold">{selected.name}</h3><p className="text-sm text-[#668077]">{selected.email} · {selected.city}</p><div className="mt-5 flex flex-wrap items-end gap-3"><label className="text-sm text-[#668077]">From<input type="date" value={dates.fromdate} onChange={(event) => setDates({ ...dates, fromdate: event.target.value })} className="mt-1 block rounded-lg border border-[#ccd7d0] bg-white px-3 py-2" /></label><label className="text-sm text-[#668077]">To<input type="date" value={dates.todate} onChange={(event) => setDates({ ...dates, todate: event.target.value })} className="mt-1 block rounded-lg border border-[#ccd7d0] bg-white px-3 py-2" /></label><button onClick={() => openSales(selected)} className="rounded-lg bg-[#356b59] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2c594a]">Apply dates</button></div></div><div className="mb-6 grid gap-4 sm:grid-cols-3"><div className="rounded-xl bg-[#dcebe0] p-5"><p className="text-sm text-[#527262]">Total sales</p><p className="mt-2 text-2xl font-semibold">₹{total.toLocaleString()}</p></div><div className="rounded-xl bg-[#e9e4d5] p-5"><p className="text-sm text-[#756b4d]">Entries</p><p className="mt-2 text-2xl font-semibold">{sales.length}</p></div><div className="rounded-xl bg-[#dce4e9] p-5"><p className="text-sm text-[#566b79]">Average entry</p><p className="mt-2 text-2xl font-semibold">₹{sales.length ? Math.round(total / sales.length).toLocaleString() : 0}</p></div></div><div className="grid gap-5 lg:grid-cols-2"><div className="h-80 rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-5"><h3 className="mb-4 font-semibold">Sales trend</h3><ResponsiveContainer width="100%" height="90%"><LineChart data={chartData}><CartesianGrid stroke="#e3e9e3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="amount" stroke="#356b59" strokeWidth={2} /></LineChart></ResponsiveContainer></div><div className="h-80 rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-5"><h3 className="mb-4 font-semibold">Daily sales</h3><ResponsiveContainer width="100%" height="90%"><BarChart data={chartData}><CartesianGrid stroke="#e3e9e3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Bar dataKey="amount" fill="#c48b5a" /></BarChart></ResponsiveContainer></div></div></div> : <div className="grid gap-4 md:grid-cols-2">{franchises.map((franchise) => <div key={franchise._id || franchise.email} className="flex items-center justify-between rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-5"><div><h3 className="font-semibold">{franchise.name}</h3><p className="text-sm text-[#718078]">{franchise.email}</p><p className="mt-1 text-sm text-[#668077]">{franchise.city}</p></div><button onClick={() => openSales(franchise)} className="rounded-lg border border-[#9bb6a7] px-3 py-2 text-sm font-semibold text-[#356b59] hover:bg-[#edf2ed]">View sales</button></div>)}</div>}</section>}
        {tab === 'settings' && <SettingsPanel onSuccess={(message) => setStatus({ loading: false, error: '', message })} onError={(error) => setStatus({ loading: false, error, message: '' })} />}
      </div>
    </main>
  );
}

// eslint-disable-next-line react/prop-types
function SettingsPanel({ onSuccess, onError }) {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const submit = async (event) => { event.preventDefault(); if (form.newPassword !== form.confirmPassword) return onError('New passwords do not match.'); try { const response = await api.post('/admin/changepwd', form); onSuccess(response.data.msg); setForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); } catch (error) { onError(error.response?.data?.msg || 'Password could not be updated.'); } };
  return <section className="max-w-xl"><div className="mb-6"><p className="text-sm text-[#718078]">Account security</p><h2 className="text-3xl font-semibold">Settings</h2></div><form onSubmit={submit} className="rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-6"><label className="mb-4 block text-sm font-medium">Current password<input required type="password" value={form.currentPassword} onChange={(event) => setForm({ ...form, currentPassword: event.target.value })} className="mt-1 w-full rounded-lg border border-[#ccd7d0] bg-white px-3 py-2.5" /></label><label className="mb-4 block text-sm font-medium">New password<input required minLength="8" type="password" value={form.newPassword} onChange={(event) => setForm({ ...form, newPassword: event.target.value })} className="mt-1 w-full rounded-lg border border-[#ccd7d0] bg-white px-3 py-2.5" /></label><label className="mb-6 block text-sm font-medium">Confirm new password<input required type="password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} className="mt-1 w-full rounded-lg border border-[#ccd7d0] bg-white px-3 py-2.5" /></label><button className="rounded-lg bg-[#356b59] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2c594a]">Update password</button></form></section>;
}

export default AdminDashboard;