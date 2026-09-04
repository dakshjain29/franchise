import { useState } from 'react';
import { CheckCircle2, LockKeyhole } from 'lucide-react';
import api from '../lib/api';

function SettingsPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [state, setState] = useState({ saving: false, message: '', error: '' });

  const submit = async (event) => {
    event.preventDefault();
    if (form.newPassword !== form.confirmPassword) return setState({ saving: false, message: '', error: 'New passwords do not match.' });
    setState({ saving: true, message: '', error: '' });
    try {
      const response = await api.post('/franchise/changepwd', form);
      setState({ saving: false, message: response.data.msg || 'Password updated.', error: '' });
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setState({ saving: false, message: '', error: error.response?.data?.msg || 'Unable to update password.' });
    }
  };

  return <section className="max-w-2xl"><div className="mb-7"><p className="text-sm text-[#718078]">Keep your account secure</p><h2 className="mt-1 text-3xl font-semibold tracking-tight">Settings</h2></div><form onSubmit={submit} className="rounded-xl border border-[#dce2dc] bg-[#fbfcf9] p-6 sm:p-8">{state.message && <p className="mb-5 flex items-center gap-2 rounded-lg bg-[#eef8f0] p-3 text-sm text-[#28613c]"><CheckCircle2 size={17} />{state.message}</p>}{state.error && <p className="mb-5 rounded-lg bg-[#fff3f1] p-3 text-sm text-[#9a3f3b]">{state.error}</p>}<p className="mb-6 flex items-center gap-2 text-sm text-[#718078]"><LockKeyhole size={17} />Use at least eight characters for a new password.</p>{[['currentPassword','Current password'],['newPassword','New password'],['confirmPassword','Confirm new password']].map(([name, label]) => <label key={name} className="mb-5 block text-sm font-medium text-[#35554a]">{label}<input required minLength={name === 'newPassword' ? 8 : undefined} type="password" value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} className="mt-2 w-full rounded-lg border border-[#ccd7d0] bg-white px-3 py-3 outline-none focus:border-[#356b59] focus:ring-2 focus:ring-[#dcebe0]" /></label>)}<button disabled={state.saving} className="rounded-lg bg-[#356b59] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2c594a] disabled:opacity-60">{state.saving ? 'Updating...' : 'Update password'}</button></form></section>;
}

export default SettingsPage;
