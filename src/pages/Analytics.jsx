import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Package, ArrowUpRight, Calendar } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { AnalyticsSkeleton } from '../components/ui/Skeleton';

const Analytics = () => {
  const { orders, loading } = useAdmin();

  // Calculate monthly sales for the chart
  const getMonthlySales = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const sales = months.map(m => ({ month: m, amount: 0 }));
    
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const monthIndex = date.getMonth();
      sales[monthIndex].amount += order.totalPrice;
    });

    // Get only last 6 months including current
    const currentMonth = new Date().getMonth();
    return sales.slice(Math.max(0, currentMonth - 5), currentMonth + 1);
  };

  const monthlySales = getMonthlySales();
  const maxSales = Math.max(...monthlySales.map(m => m.amount)) || 1000;

  // Calculate top products
  const productSales = {};
  orders.forEach(order => {
    order.orderItems.forEach(item => {
      if (productSales[item.name]) {
        productSales[item.name].qty += item.qty;
        productSales[item.name].revenue += item.price * item.qty;
      } else {
        productSales[item.name] = { qty: item.qty, revenue: item.price * item.qty };
      }
    });
  });

  const topProductsSorted = Object.entries(productSales)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5)
    .map(([name, stats]) => ({ name, ...stats }));

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const avgOrderValue = orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : 0;

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1400px] mx-auto w-full"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] md:text-[32px] font-extrabold mb-1 md:mb-2 text-slate-900">Analytics & Reports</h1>
        <p className="text-slate-500 text-sm md:text-base font-medium">Deep dive into your store's performance metrics</p>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <DollarSign />, color: 'bg-indigo-500' },
          { label: 'Avg Order Value', value: `$${avgOrderValue}`, icon: <TrendingUp />, color: 'bg-emerald-500' },
          { label: 'Total Items Sold', value: orders.reduce((acc, o) => acc + o.orderItems.reduce((a, i) => a + i.qty, 0), 0), icon: <Package />, color: 'bg-amber-500' },
          { label: 'Conversion Rate', value: '3.2%', icon: <ArrowUpRight />, color: 'bg-violet-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
              {stat.icon}
            </div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Revenue Overview</h2>
              <p className="text-sm text-slate-500 font-medium">Monthly performance tracking</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-600 text-sm font-bold border border-slate-100">
              <Calendar size={16} /> Last 6 Months
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {monthlySales.map((data, i) => {
              const height = (data.amount / maxSales) * 100;
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: i * 0.1, duration: 1, ease: 'easeOut' }}
                      className="w-[60%] min-h-[4px] bg-accent-gradient rounded-t-xl relative group-hover:opacity-80 transition-all shadow-[0_5px_15px_rgba(67,24,255,0.2)]"
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        ${data.amount.toLocaleString()}
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-tighter">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Top Products</h2>
          <div className="space-y-6">
            {topProductsSorted.map((product, i) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-extrabold text-sm border border-indigo-100">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900">{product.name}</div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(product.revenue / (topProductsSorted[0]?.revenue || 1)) * 100}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-slate-900">${product.revenue.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-slate-400">{product.qty} sold</div>
                </div>
              </div>
            ))}
            {topProductsSorted.length === 0 && (
              <p className="text-center text-slate-400 py-10">No sales data available yet.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
