import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { logoutAdmin } from '../../EndpontsLogics/authService';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleLogout = () => {
    logoutAdmin();
    window.location.reload();
  };

  const tabs = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', path: '/products', label: 'Products', icon: Package },
    { id: 'orders', path: '/orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', path: '/customers', label: 'Customers', icon: Users },
    { id: 'analytics', path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150] md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`w-[260px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-r border-slate-200 h-screen fixed flex flex-col p-6 z-[200] transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between mb-10">
          <div className="text-2xl font-extrabold bg-accent-gradient bg-clip-text text-transparent tracking-tight">
            DUMA ADMIN
          </div>
          <button onClick={toggleSidebar} aria-label="Close Sidebar" className="md:hidden p-2 text-slate-500 hover:text-slate-900">
            <Settings size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                onClick={() => {
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? 'bg-accent-gradient text-white shadow-lg shadow-accent-primary/30 font-semibold'
                      : 'text-slate-500 hover:bg-accent-primary/5 hover:text-accent-primary font-medium'
                  }`
                }
              >
                <Icon size={20} /> {tab.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all w-full text-red-500/70 hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
