import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const StatCard = ({ label, value, icon, color, delay }) => {
  // Generate a slightly lighter version of the color for the gradient
  const getGradient = (baseColor) => {
    // A simplified way to create a dynamic gradient using the base hex color
    return `linear-gradient(135deg, ${baseColor} 0%, ${baseColor}dd 100%)`;
  };

  return (
    <motion.div 
      className="relative overflow-hidden p-6 rounded-[24px] transition-all duration-300 hover:scale-[1.02] text-white"
      style={{ 
        background: getGradient(color),
        boxShadow: `0 10px 20px -5px ${color}60`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {/* Background Icon Watermark */}
      <div className="absolute -right-4 -bottom-4 opacity-[0.15] text-white pointer-events-none">
        {React.cloneElement(icon, { size: 120 })}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner border border-white/20">
            {React.cloneElement(icon, { size: 24, className: "text-white" })}
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-sm font-semibold">
            <ArrowUpRight size={16} />
            <span>+12%</span>
          </div>
        </div>
        
        <div>
          <div className="text-[36px] font-extrabold mb-1 tracking-tight drop-shadow-md">{value}</div>
          <div className="text-white/90 text-sm font-semibold uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
