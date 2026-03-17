import React, { useState } from 'react';
import {
  Ticket,
  Store,
  HandCoins,
  TrendingUp,
  ArrowRight,
  Search,
  Bell,
  Activity,
  X,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { id: 'sold', label: 'Total Tickets Sold Today', value: '1,284', icon: Ticket, color: 'text-brand-red', bg: 'bg-brand-red/10', border: 'border-brand-red/20', path: '/tickets/tracking' },
  { id: 'counters', label: 'Active Ticket Counters', value: '8', icon: Store, color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20', path: '/tickets/boxes' },
  { id: 'settlements', label: 'Pending Settlements', value: '3', icon: HandCoins, color: 'text-brand-red', bg: 'bg-brand-red/10', border: 'border-brand-red/20', path: '/tickets/settlement' },
  { id: 'revenue', label: 'Total Revenue Today', value: '$12,450', icon: TrendingUp, color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20', path: '/tickets/settlement' },
];

const SALES_SUMMARY = [
  { box: 'Main Entrance Box A', sold: 450, cash: '$4,500', online: '$3,200', total: '$7,700' },
  { box: 'Zone B Counter 1', sold: 320, cash: '$3,200', online: '$2,100', total: '$5,300' },
  { box: 'Parking Gate Box', sold: 180, cash: '$1,800', online: '$900', total: '$2,700' },
  { box: 'Kids Zone Kiosk', sold: 215, cash: '$2,150', online: '$1,400', total: '$3,550' },
  { box: 'Food Court Counter', sold: 119, cash: '$1,190', online: '$850', total: '$2,040' },
];

const RECENT_TRANSACTIONS = [
  { id: 'TXN-9842', box: 'Main Entrance Box A', sold: 4, amount: '$40.00', type: 'Cash', time: '10:45 AM' },
  { id: 'TXN-9841', box: 'Zone B Counter 1', sold: 2, amount: '$20.00', type: 'Credit Card', time: '10:44 AM' },
  { id: 'TXN-9840', box: 'Kids Zone Kiosk', sold: 5, amount: '$50.00', type: 'Online Pay', time: '10:42 AM' },
  { id: 'TXN-9839', box: 'Main Entrance Box A', sold: 1, amount: '$10.00', type: 'Cash', time: '10:40 AM' },
  { id: 'TXN-9838', box: 'Parking Gate Box', sold: 3, amount: '$30.00', type: 'Online Pay', time: '10:38 AM' },
];

export default function TicketDashboard() {
  const navigate = useNavigate();
  const [isSettling, setIsSettling] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSettlement = () => {
    setIsSettling(true);
    setTimeout(() => {
      setIsSettling(false);
      setToast('Settlement processed successfully!');
      setTimeout(() => setToast(null), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-brand-red text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-brand-red/20">
            <CheckCircle2 size={18} className="text-brand-gold" />
            <span className="text-sm font-black tracking-tight uppercase">{toast}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-red tracking-tight leading-none italic uppercase flex items-center gap-3">
             <Activity size={26} className="text-brand-red" /> Ticket Dashboard
          </h1>
          <p className="text-slate-500 text-sm font-bold mt-2">Real-time ticketing overview and sales tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border border-brand-red/10 rounded-2xl text-brand-red hover:bg-brand-red hover:text-white transition-all shadow-lg active:scale-95 cursor-pointer">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-text text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-gold/20">
            <Activity size={16} className="animate-pulse" /> Live Metrics
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className={`border-l-4 ${stat.border} hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group`}
            onClick={() => navigate(stat.path)}
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] leading-tight truncate">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800 mt-2 group-hover:text-brand-red transition-colors tracking-tight">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:rotate-12 transition-transform shrink-0`}>
                <stat.icon size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales Performance Table */}
        <Card className="xl:col-span-2">
          <CardHeader
            title="Sales Performance"
            subtitle="Breakdown by location (Today)"
            action={
              <button
                onClick={() => navigate('/tickets/boxes')}
                className="group flex items-center gap-2 text-[10px] font-black text-brand-red hover:bg-brand-red/5 px-4 py-2 rounded-xl transition-all uppercase tracking-widest cursor-pointer"
              >
                View Boxes <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            }
          />
          <CardContent className="p-0">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Counter Name</th>
                    <th className="text-center px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                    <th className="text-center px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cash</th>
                    <th className="text-center px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Online</th>
                    <th className="text-right px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {SALES_SUMMARY.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors group cursor-pointer" onClick={() => navigate('/tickets/boxes')}>
                      <td className="px-6 py-5">
                        <p className="font-black text-slate-800 group-hover:text-brand-red transition-colors tracking-tight truncate">{row.box}</p>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-600">{row.sold}</span>
                      </td>
                      <td className="px-4 py-5 text-center text-slate-600 font-bold whitespace-nowrap">{row.cash}</td>
                      <td className="px-4 py-5 text-center text-slate-600 font-bold whitespace-nowrap">{row.online}</td>
                      <td className="px-6 py-5 text-right font-black text-slate-800 text-base whitespace-nowrap">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Action Widgets */}
        <div className="space-y-6">
          <button
            disabled={isSettling}
            onClick={handleSettlement}
            className={`w-full p-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-[2.5rem] shadow-2xl shadow-brand-red/30 transition-all flex items-center justify-between group active:scale-95 cursor-pointer ${isSettling ? 'opacity-80' : ''}`}
          >
            <div className="flex items-center gap-5">
              <div className="p-4 bg-white/10 rounded-[1.5rem] group-hover:bg-white group-hover:text-brand-red transition-all shadow-inner">
                {isSettling ? <Loader2 size={24} className="animate-spin" /> : <HandCoins size={24} />}
              </div>
              <div className="text-left">
                <p className="text-lg font-black tracking-tight leading-none uppercase italic">{isSettling ? 'Settling...' : 'Settlement'}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mt-1">Close revenue today</p>
              </div>
            </div>
            {!isSettling && <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />}
          </button>

          {/* This section can be used for summary or another required view-only module widget */}
          <Card className="rounded-[2.5rem] bg-brand-gold/5 border-brand-gold/10 overflow-hidden border-2">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-[1.5rem] bg-brand-gold text-brand-text flex items-center justify-center shadow-2xl shadow-brand-gold/30 transform hover:rotate-6 transition-transform">
                <TrendingUp size={32} strokeWidth={3} />
              </div>
              <div>
                <p className="text-xs font-black text-brand-text uppercase tracking-[0.3em] mb-3">Market Trend</p>
                <p className="text-xs text-slate-500 font-bold leading-relaxed px-2">Sales are up by <span className="text-brand-red font-black text-sm italic">12%</span> compared to last Friday. Recommend opening extra counters at Gateway 2.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <Card>
        <CardHeader
          title="Recent Transactions"
          subtitle="Real-time log of tickets sold"
          action={
            <button onClick={() => navigate('/tickets/tracking')} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-blue-50 transition-all shadow-sm cursor-pointer">
              <Search size={18} />
            </button>
          }
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="text-center px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tickets</th>
                  <th className="text-center px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="text-center px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="text-right px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {RECENT_TRANSACTIONS.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/30 transition-all group cursor-pointer" onClick={() => navigate('/tickets/tracking')}>
                    <td className="px-6 py-5 font-mono text-[10px] font-black text-slate-400 group-hover:text-blue-600 uppercase">{row.id}</td>
                    <td className="px-6 py-5 font-black text-slate-800 tracking-tight truncate">{row.box}</td>
                    <td className="px-4 py-5 text-center font-bold text-slate-700">{row.sold}</td>
                    <td className="px-4 py-5 text-center font-black text-slate-800 whitespace-nowrap">{row.amount}</td>
                    <td className="px-4 py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase ring-1 ring-inset bg-blue-50 text-blue-700 ring-blue-200">
                        {row.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right font-black text-slate-400 text-[10px] uppercase whitespace-nowrap">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-8 border-t border-slate-50 flex justify-center sm:justify-end">
            <button
              onClick={() => navigate('/tickets/tracking')}
              className="group flex items-center justify-center gap-4 px-10 py-5 bg-brand-red text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-red-dark transition-all shadow-2xl shadow-brand-red/20 active:scale-95 cursor-pointer w-full sm:w-auto mt-2"
            >
              Full History <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
