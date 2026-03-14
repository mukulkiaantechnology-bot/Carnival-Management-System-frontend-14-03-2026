import React, { useState } from 'react';
import { 
  HandCoins, 
  Wallet, 
  CreditCard, 
  Ticket, 
  CheckCircle, 
  Clock, 
  Printer, 
  TrendingUp, 
  Download, 
  AlertCircle, 
  Shield, 
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

const SETTLEMENT_SUMMARY = [
  { label: 'Total Cash Collected', value: '$8,450.00', icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Total Online Payments', value: '$4,000.00', icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Total Tickets Sold', value: '1,284', icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const INITIAL_SETTLEMENT_DATA = [
  { id: 1, box: 'Main Entrance Box A', opening: '$0.00', cash: '$4,500.00', online: '$3,200.00', closing: '$7,700.00', status: 'Completed' },
  { id: 2, box: 'Zone B Counter 1', opening: '$50.00', cash: '$3,200.00', online: '$2,100.00', closing: '$5,350.00', status: 'Pending' },
  { id: 3, box: 'Parking Gate Box', opening: '$20.00', cash: '$1,800.00', online: '$900.00', closing: '$2,720.00', status: 'Completed' },
  { id: 4, box: 'Kids Zone Kiosk', opening: '$0.00', cash: '$2,150.00', online: '$1,400.00', closing: '$3,550.00', status: 'Pending' },
  { id: 5, box: 'Food Court Counter', opening: '$10.00', cash: '$1,190.00', online: '$850.00', closing: '$2,050.00', status: 'Pending' },
];

export default function Settlement() {
  const [data, setData] = useState(INITIAL_SETTLEMENT_DATA);

  const handleComplete = (id) => {
    setData(data.map(item => item.id === id ? { ...item, status: 'Completed' } : item));
  };

  const finalizeAll = () => {
    setData(data.map(item => ({ ...item, status: 'Completed' })));
  };

  const pendingCount = data.filter(d => d.status === 'Pending').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 shadow-lg shadow-amber-100">
               <HandCoins size={32} />
            </div>
            Daily Settlement
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-black uppercase tracking-widest opacity-60 ml-1 leading-none">Financial Hub</p>
        </div>
        <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl transition-all font-black text-xs uppercase tracking-[3px]">
          <Printer size={20} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SETTLEMENT_SUMMARY.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-8 group cursor-pointer hover:shadow-xl transition-all">
            <div className={`p-5 rounded-3xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform shadow-lg shadow-slate-100`}>
              <stat.icon size={36} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[3px] leading-none mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <Card className="rounded-[3rem] border-none shadow-2xl shadow-slate-200 overflow-hidden">
        <CardHeader 
           title="Box Reconciliation" 
           subtitle="Opening and closing balance verification" 
           action={
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full border bg-amber-50 text-amber-500 border-amber-200">
                 <Clock size={16} className="animate-spin" /> {pendingCount} Pending
              </div>
           }
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 font-black text-slate-400 text-[10px] uppercase tracking-[2px]">
                  <th className="text-left px-8 py-5">Ticket Box</th>
                  <th className="text-center px-4 py-5">Opening</th>
                  <th className="text-center px-4 py-5">Flow</th>
                  <th className="text-center px-4 py-5">Closing</th>
                  <th className="text-center px-4 py-5">Status</th>
                  <th className="text-right px-8 py-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-black uppercase">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/30 transition-all">
                    <td className="px-8 py-6 text-slate-800 text-sm tracking-tight">{row.box}</td>
                    <td className="px-4 py-6 text-center text-slate-300 font-mono text-xs">{row.opening}</td>
                    <td className="px-4 py-6 text-center text-slate-700 text-xs">
                       <p>{row.cash} [Cash]</p>
                       <p className="opacity-40">{row.online} [Online]</p>
                    </td>
                    <td className="px-4 py-6 text-center text-blue-600 text-lg tracking-tighter font-black">{row.closing}</td>
                    <td className="px-4 py-6 text-center">
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ring-1 ring-inset ${
                         row.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-amber-50 text-amber-700 ring-amber-200'
                       }`}>
                          {row.status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {row.status === 'Pending' ? (
                        <button 
                          onClick={() => handleComplete(row.id)}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase transition-all shadow-xl shadow-blue-100"
                        >
                          Settle
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-2 text-slate-300 px-6">
                           <Shield size={18} />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-10 py-10 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5">
            <div className="flex items-center gap-6">
               <div className="p-5 bg-amber-500 rounded-[2rem] text-white shadow-2xl shadow-amber-900/20">
                  <TrendingUp size={32} />
               </div>
               <div>
                 <p className="text-[11px] font-black uppercase tracking-[4px] text-amber-400 mb-2">Grand Total</p>
                 <p className="text-xs font-bold text-slate-400 tracking-widest leading-none">Verified system-wide revenue</p>
               </div>
            </div>
            <div className="text-center md:text-right">
               <p className="text-5xl font-black tracking-tighter text-white tabular-nums">$12,450.00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col xl:flex-row items-stretch justify-between gap-8 px-2 pb-10">
         <div className="flex-1 bg-amber-50 border border-amber-200 rounded-[2.5rem] p-8 flex gap-6 items-center">
             <AlertCircle className="text-amber-500 shrink-0" size={28} />
             <div>
                <p className="text-sm font-black text-amber-800 uppercase tracking-widest mb-1">Notice</p>
                <p className="text-[13px] text-amber-700 font-bold opacity-80 leading-snug">
                   Settlement is irreversible. Please verify all cash flows before confirming.
                </p>
             </div>
         </div>
         <button 
            onClick={finalizeAll}
            disabled={pendingCount === 0}
            className={`min-w-[280px] px-12 py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[4px] shadow-2xl transition-all ${
                pendingCount === 0 
                ? 'bg-slate-100 text-slate-300 shadow-none' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
         >
            Finalize Day
         </button>
      </div>
    </div>
  );
}
