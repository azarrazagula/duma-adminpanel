import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { getAdminUser } from '../../EndpontsLogics/authService';

const Header = ({ searchTerm, setSearchTerm, toggleSidebar }) => {
  const admin = getAdminUser();

  return (
    <header className="h-[70px] bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-[90]">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          aria-label="Toggle Menu"
          className="p-2 md:hidden text-slate-500 hover:text-slate-900 transition-all"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 w-[160px] sm:w-[240px] md:w-[300px]">
          <Search size={18} className="text-slate-500 shrink-0" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none text-slate-900 outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <button aria-label="Notifications" className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-gradient shadow-lg shadow-accent-primary/20 shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
            {admin?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <span className="text-sm font-medium hidden sm:block">{admin?.name || 'Admin'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
