import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="h-[70px] bg-dark/80 backdrop-blur-md border-b border-glass flex items-center justify-between px-8 sticky top-0 z-[90]">
      <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-glass w-[300px]">
        <Search size={18} className="text-slate-secondary" />
        <input 
          type="text" 
          placeholder="Search products..." 
          className="bg-transparent border-none text-slate-primary outline-none w-full text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-6">
        <button className="p-2 rounded-lg text-slate-secondary hover:bg-white/10 hover:text-slate-primary transition-all">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-gradient shadow-lg shadow-accent-primary/20"></div>
          <span className="text-sm font-medium">Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
