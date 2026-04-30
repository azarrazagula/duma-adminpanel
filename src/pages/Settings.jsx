import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Store, Camera, Save, Eye, EyeOff, Bell, Globe, Palette } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const adminData = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const [profile, setProfile] = useState({
    name: adminData.name || 'Asker Admin',
    email: adminData.email || 'asker@gmail.com',
    phone: '+91 98765 43210',
    role: 'Super Admin',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'DUMA Store',
    storeEmail: 'support@duma.com',
    currency: 'USD',
    timezone: 'IST (UTC+5:30)',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'password', label: 'Change Password', icon: Lock },
    { id: 'store', label: 'Store Settings', icon: Store },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1400px] mx-auto w-full"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] md:text-[32px] font-extrabold mb-1 md:mb-2 text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm md:text-base font-medium">Manage your account and store preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-[24px] border border-slate-200 p-4">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-accent-gradient text-white shadow-lg shadow-accent-primary/30'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={18} /> {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-[24px] border border-slate-200 p-6 md:p-8">

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Admin Profile</h2>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-accent-gradient flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-accent-primary/30">
                      {profile.name.charAt(0)}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-500 hover:text-accent-primary transition-colors shadow-sm">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
                    <p className="text-sm text-slate-500">{profile.role}</p>
                    <p className="text-xs text-accent-primary font-semibold mt-1">{profile.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Role</label>
                    <input
                      type="text"
                      value={profile.role}
                      disabled
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Change Password</h2>
                <div className="max-w-lg space-y-5">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        placeholder="Enter current password"
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 pr-12 text-slate-900 outline-none focus:border-accent-primary transition-all"
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">New Password</label>
                    <input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      placeholder="Enter new password"
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      placeholder="Confirm new password"
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Store Settings Tab */}
            {activeTab === 'store' && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Store Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Store size={14} /> Store Name</label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Globe size={14} /> Store Email</label>
                    <input
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Palette size={14} /> Currency</label>
                    <select
                      value={storeSettings.currency}
                      onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:border-accent-primary transition-all appearance-none"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Bell size={14} /> Timezone</label>
                    <input
                      type="text"
                      value={storeSettings.timezone}
                      disabled
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Store Logo Upload */}
                <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-accent-gradient rounded-2xl flex items-center justify-center text-white text-xl font-extrabold shadow-lg">
                      D
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Store Logo</h3>
                      <p className="text-sm text-slate-500 mt-1">Upload your store logo (PNG, JPG, max 2MB)</p>
                      <button className="mt-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-2">
                        <Camera size={14} /> Upload Logo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleSave}
                className="bg-accent-gradient text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-[0_10px_20px_-5px_rgba(67,24,255,0.4)] flex items-center gap-2"
              >
                <Save size={18} /> {saved ? '✓ Saved!' : 'Save Changes'}
              </button>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-emerald-500 font-semibold text-sm"
                >
                  Changes saved successfully!
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
