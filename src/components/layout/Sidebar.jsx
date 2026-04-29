import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-[260px] bg-dark-card border-r border-glass h-screen fixed flex flex-col p-6 z-[100] hidden md:flex">
      <div className="text-2xl font-extrabold bg-accent-gradient bg-clip-text text-transparent mb-10 tracking-tight">
        DUMA ADMIN
      </div>
      <nav className="flex flex-col gap-2">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-primary/10 text-accent-primary cursor-pointer transition-all">
          <LayoutDashboard size={20} /> Dashboard
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-secondary hover:bg-accent-primary/5 hover:text-accent-primary cursor-pointer transition-all">
          <Package size={20} /> Products
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-secondary hover:bg-accent-primary/5 hover:text-accent-primary cursor-pointer transition-all">
          <ShoppingCart size={20} /> Orders
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-secondary hover:bg-accent-primary/5 hover:text-accent-primary cursor-pointer transition-all">
          <Users size={20} /> Customers
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-secondary hover:bg-accent-primary/5 hover:text-accent-primary cursor-pointer transition-all">
          <Settings size={20} /> Settings
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
