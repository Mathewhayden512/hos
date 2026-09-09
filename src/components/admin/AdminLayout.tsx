import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  Building2, 
  CalendarCheck, 
  Users, 
  ShieldAlert, 
  Settings, 
  LogOut, 
  HeartHandshake,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<Props> = ({ activeTab, setActiveTab, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointment Master', icon: CalendarCheck },
    { id: 'doctors', label: 'Doctor Management', icon: UserCheck },
    { id: 'departments', label: 'Department Manager', icon: Building2 },
    { id: 'patients', label: 'Patient Directory', icon: Users },
    { id: 'facilities', label: 'Facility Manager', icon: ShieldAlert },
    { id: 'settings', label: 'Hospital Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950 border-r border-slate-800 p-6 justify-between shrink-0">
        <div className="space-y-8">
          {/* Header */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-hospital-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-md">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-white block leading-tight">St. Jude Hospital</span>
              <span className="text-[10px] text-hospital-400 font-semibold tracking-wider block uppercase">ADMIN PORTAL</span>
            </div>
          </Link>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    active
                      ? 'bg-hospital-600 text-white font-semibold shadow-lg shadow-hospital-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin info */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-hospital-600/30 text-hospital-400 border border-hospital-500/30 flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">{user?.email || 'admin@wisehospital.com'}</span>
              <span className="text-[10px] text-emerald-400 block font-semibold">Super Admin Role</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-800 text-rose-400 hover:bg-rose-950/40 hover:border-rose-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs font-semibold text-hospital-400 hover:text-hospital-300 underline"
            >
              ← View Public Hospital Website
            </Link>
          </div>
        </header>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm flex">
            <div className="w-4/5 max-w-xs bg-slate-950 h-full p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="w-6 h-6 text-hospital-400" />
                    <span className="font-bold text-white">St. Jude Admin</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm ${
                          activeTab === item.id ? 'bg-hospital-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button onClick={handleLogout} className="py-2.5 bg-rose-950/50 text-rose-400 rounded-xl text-xs font-bold">
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Page Content Body */}
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
