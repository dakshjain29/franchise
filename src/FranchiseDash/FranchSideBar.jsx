import { useState } from 'react';
import { BarChart3, ChevronLeft, ChevronRight, History, Home, LogOut, Menu, Settings, TrendingUp, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuth, getAuth } from '../lib/auth';

const navItems = [
  { id: '/frDashboard', label: 'Overview', icon: Home },
  { id: '/frDashboard/sales', label: 'Record sales', icon: TrendingUp },
  { id: '/frDashboard/history', label: 'Sales history', icon: History },
  { id: '/frDashboard/charts', label: 'Performance', icon: BarChart3 },
  { id: '/frDashboard/settings', label: 'Settings', icon: Settings },
];

function FranchSideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  return <>
    <button onClick={() => setMobileOpen(true)} className="fixed left-4 top-4 z-20 rounded-lg border border-[#ccd7d0] bg-[#fbfcf9] p-2 text-[#35554a] shadow-sm lg:hidden" title="Open navigation"><Menu size={20} /></button>
    {mobileOpen && <button onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-[#23312d]/30 lg:hidden" aria-label="Close navigation" />}
    <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[#dce2dc] bg-[#fbfcf9] transition-transform lg:static lg:translate-x-0 ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}>
      <div className="flex items-center justify-between border-b border-[#dce2dc] px-5 py-5">
        {!collapsed && <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#668077]">FranchiseHub</p><p className="mt-1 font-semibold">Partner portal</p></div>}
        <button onClick={() => mobileOpen ? setMobileOpen(false) : setCollapsed(!collapsed)} className="rounded-lg p-2 text-[#668077] hover:bg-[#edf2ed]" title={mobileOpen ? 'Close navigation' : 'Collapse navigation'}>{mobileOpen ? <X size={18} /> : collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button>
      </div>
      <div className="border-b border-[#dce2dc] px-5 py-5"><p className="text-xs uppercase tracking-[0.16em] text-[#8a9890]">Signed in as</p>{!collapsed && <p className="mt-1 truncate text-sm font-medium text-[#35554a]">{auth?.email}</p>}</div>
      <nav className="flex-1 px-3 py-5"><ul className="space-y-1">{navItems.map(({ id, label, icon: Icon }) => { const active = location.pathname === id || (id === '/frDashboard' && location.pathname === '/frDashboard/'); return <li key={id}><Link onClick={() => setMobileOpen(false)} to={id} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${active ? 'bg-[#dcebe0] text-[#2f604d]' : 'text-[#718078] hover:bg-[#edf2ed] hover:text-[#35554a]'}`} title={collapsed ? label : undefined}><Icon size={19} />{!collapsed && label}</Link></li>; })}</ul></nav>
      <div className="border-t border-[#dce2dc] p-3"><button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#8b5146] hover:bg-[#fff0ed]" title="Log out"><LogOut size={19} />{!collapsed && 'Log out'}</button></div>
    </aside>
  </>;
}

export default FranchSideBar;
