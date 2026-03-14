import React from 'react';
import { 
  Ticket, 
  Store, 
  HandCoins, 
  TrendingUp, 
  CreditCard, 
  Clock, 
  ArrowRight,
  Search,
  Bell,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { label: 'Total Tickets Sold Today', value: '1,284', icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-400', path: '/tickets/tracking' },
  { label: 'Active Ticket Counters', value: '8', icon: Store, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-400', path: '/tickets/boxes' },
  { label: 'Pending Settlements', value: '3', icon: HandCoins, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-400', path: '/tickets/settlement' },
  { label: 'Total Revenue Today', value: '$12,450', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-400', path: '/tickets/settlement' },
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Ticket Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Real-time ticketing overview and sales tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-100 shadow-sm">
            <Activity size={16} className="animate-pulse" /> Live
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card 
            key={stat.label} 
            className={`border-l-4 ${stat.border} hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group`}
            onClick={() => navigate(stat.path)}
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] leading-tight">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800 mt-2 group-hover:text-blue-600 transition-colors tracking-tight">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:rotate-12 transition-transform`}>
                <stat.icon size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader 
            title="Sales Performance" 
            subtitle="Breakdown by location (Today)" 
            action={
               <button 
                onClick={() => navigate('/tickets/boxes')} 
                className="group flex items-center gap-2 text-xs font-black text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all uppercase tracking-widest"
               >
                 Boxes <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            }
          />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
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
                        <p className="font-black text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight">{row.box}</p>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-600">{row.sold}</span>
                      </td>
                      <td className="px-4 py-5 text-center text-slate-600 font-bold">{row.cash}</td>
                      <td className="px-4 py-5 text-center text-slate-600 font-bold">{row.online}</td>
                      <td className="px-6 py-5 text-right font-black text-slate-800 text-base">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <button 
              onClick={() => navigate('/tickets/settlement')}
              className="w-full p-5 bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-[2rem] shadow-xl shadow-emerald-200 transition-all flex items-center justify-between group active:scale-95"
            >
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl group-hover:bg-white group-hover:text-emerald-700 transition-all">
                    <HandCoins size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-base font-black tracking-tight leading-none uppercase tracking-[1px]">Settlement</p>
                    <p className="text-[10px] opacity-80 mt-1 font-bold">Close revenue today</p>
                  </div>
               </div>
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <Card className="rounded-[2rem] bg-slate-50/50">
              <CardHeader title="System Status" subtitle="Real-time monitoring" />
              <CardContent className="p-6 pt-0 space-y-5">
                 <div className="flex gap-4 items-center" onClick={() => navigate('/tickets/tracking')}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
                    <div className="flex-1">
                       <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Counters Online</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">8 Active Hubs</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => navigate('/tickets/tracking')}
                  className="w-full py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-[3px] text-slate-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                 >
                   Open Log
                 </button>
              </CardContent>
            </Card>
        </div>
      </div>

      <Card>
        <CardHeader 
          title="Recent Transactions" 
          subtitle="Real-time log of tickets sold" 
          action={
            <button onClick={() => navigate('/tickets/tracking')} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-blue-50 transition-all shadow-sm">
               <Search size={18} />
            </button>
          }
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
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
                    <td className="px-6 py-5 font-black text-slate-800 tracking-tight">{row.box}</td>
                    <td className="px-4 py-5 text-center font-bold text-slate-700">{row.sold}</td>
                    <td className="px-4 py-5 text-center font-black text-slate-800">{row.amount}</td>
                    <td className="px-4 py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase ring-1 ring-inset bg-blue-50 text-blue-700 ring-blue-200">
                        {row.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right font-black text-slate-400 text-[10px] uppercase">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-6 border-t border-slate-50 flex justify-center sm:justify-end">
            <button 
              onClick={() => navigate('/tickets/tracking')}
              className="group flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[3px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
            >
              Full History <ArrowRight size={18} />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
