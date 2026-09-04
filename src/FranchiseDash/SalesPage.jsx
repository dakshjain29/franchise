import { useState } from 'react';
import { CalendarDays, CheckCircle2, CircleDollarSign } from 'lucide-react';
import api from '../lib/api';

function SalesPage() {
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], amount: '' });
  const [state, setState] = useState({ saving: false, message: '', error: '' });

  const submit = async (event) => {
    event.preventDefault();
    setState({ saving: true, message: '', error: '' });
    try {
      await api.post('/franchise/saveSales', { date: new Date(`${form.date}T12:00:00`).toISOString(), amount: Number(form.amount) });
      setForm({ date: new Date().toISOString().split('T')[0], amount: '' });
      setState({ saving: false, message: 'Sales record saved.', error: '' });
    } catch (error) {
      setState({ saving: false, message: '', error: error.response?.data?.msg || 'Unable to save this record.' });
    }
  };

  return <section className="max-w-2xl"><div className="mb-7"><p className="text-sm text-[#718078]">Keep your daily numbers up to date</p><h2 className="mt-1 text-3xl font-semibold tracking-tight">Record sales</h2></div><form onSubmit={submit} className="rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-6 sm:p-8">{state.message && <p className="mb-5 flex items-center gap-2 rounded-lg bg-[#eef8f0] p-3 text-sm text-[#28613c]"><CheckCircle2 size={17} />{state.message}</p>}{state.error && <p className="mb-5 rounded-lg bg-[#fff3f1] p-3 text-sm text-[#9a3f3b]">{state.error}</p>}<label className="mb-5 block text-sm font-medium text-[#35554a]">Date<div className="relative mt-2"><CalendarDays className="pointer-events-none absolute left-3 top-3.5 text-[#718078]" size={18} /><input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="w-full rounded-lg border border-[#ccd7d0] bg-white py-3 pl-10 pr-3 outline-none focus:border-[#356b59] focus:ring-2 focus:ring-[#dcebe0]" /></div></label><label className="mb-7 block text-sm font-medium text-[#35554a]">Sales amount<div className="relative mt-2"><CircleDollarSign className="pointer-events-none absolute left-3 top-3.5 text-[#718078]" size={18} /><input required min="0" step="0.01" type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="0.00" className="w-full rounded-lg border border-[#ccd7d0] bg-white py-3 pl-10 pr-3 outline-none focus:border-[#356b59] focus:ring-2 focus:ring-[#dcebe0]" /></div></label><button disabled={state.saving} className="w-full rounded-lg bg-[#356b59] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2c594a] disabled:cursor-not-allowed disabled:opacity-60">{state.saving ? 'Saving...' : 'Save sales record'}</button></form></section>;
}

export default SalesPage;
