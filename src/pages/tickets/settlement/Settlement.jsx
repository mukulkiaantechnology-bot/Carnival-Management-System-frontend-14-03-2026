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
  { label: 'Total Cash Collected', value: '$8,450.00', icon: Wallet, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
  { label: 'Total Online Payments', value: '$4,000.00', icon: CreditCard, color: 'text-brand-red', bg: 'bg-brand-red/10' },
  { label: 'Total Tickets Sold', value: '1,284', icon: Ticket, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
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
          <h1 className="text-3xl font-black text-brand-red flex items-center gap-4 italic uppercase tracking-tight">
            <div className="p-3 bg-brand-red/5 rounded-2xl text-brand-red shadow-xl shadow-brand-red/10">
               <HandCoins size={36} strokeWidth={2.5} />
            </div>
            Daily Settlement
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-black uppercase tracking-widest opacity-60 ml-1 leading-none">Financial Hub</p>
        </div>
        <button className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-gold text-brand-text rounded-[1.2rem] transition-all font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-brand-gold/20 active:scale-95 cursor-pointer">
          <Printer size={22} strokeWidth={3} /> Export Metrics
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SETTLEMENT_SUMMARY.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center gap-8 group cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className={`p-6 rounded-[1.8rem] ${stat.bg} ${stat.color} group-hover:rotate-6 transition-transform shadow-lg`}>
              <stat.icon size={40} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none mb-3">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-brand-red transition-colors">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <Card className="rounded-[3rem] border-none shadow-2xl shadow-slate-200 overflow-hidden">
        <CardHeader 
           title="Box Reconciliation" 
           subtitle="Opening and closing balance verification" 
           action={
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-full border bg-brand-gold/10 text-brand-text border-brand-gold/20 shadow-sm italic">
                 <Clock size={16} className="animate-spin text-brand-red" strokeWidth={3} /> {pendingCount} Pending Reconciliation
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
                    <td className="px-4 py-6 text-center text-brand-red text-xl tracking-tighter font-black group-hover:scale-110 transition-transform">{row.closing}</td>
                    <td className="px-4 py-6 text-center">
                       <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase ring-1 ring-inset shadow-sm ${
                         row.status === 'Completed' ? 'bg-brand-red/5 text-brand-red ring-brand-red/10' : 'bg-brand-gold/10 text-brand-text ring-brand-gold/20'
                       }`}>
                          {row.status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {row.status === 'Pending' ? (
                         <button 
                          onClick={() => handleComplete(row.id)}
                          className="px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-text rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-gold/20 active:scale-95 cursor-pointer"
                        >
                          Settle Now
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
            <div className="flex items-center gap-8">
               <div className="p-6 bg-brand-red rounded-[2rem] text-white shadow-2xl shadow-brand-red/30 transform -rotate-3">
                  <TrendingUp size={40} strokeWidth={3} />
               </div>
               <div>
                 <p className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-gold mb-3">Grand Total Revenue</p>
                 <p className="text-xs font-bold text-slate-400 tracking-widest leading-none italic uppercase">Verified system-wide financial integrity</p>
               </div>
            </div>
            <div className="text-center md:text-right">
               <p className="text-5xl font-black tracking-tighter text-white tabular-nums">$12,450.00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col xl:flex-row items-stretch justify-between gap-8 px-2 pb-10">
         <div className="flex-1 bg-brand-gold/5 border border-brand-gold/10 rounded-[3rem] p-10 flex gap-8 items-center shadow-inner">
             <AlertCircle className="text-brand-red shrink-0" size={32} strokeWidth={3} />
             <div>
                <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.3em] mb-2">CRITICAL FINANCIAL NOTICE</p>
                <p className="text-sm text-slate-600 font-bold opacity-80 leading-relaxed italic">
                   Settlement is an irreversible financial operation. Please verify all box registries and cash flows before final confirmation.
                </p>
             </div>
         </div>
         <button 
            onClick={finalizeAll}
            disabled={pendingCount === 0}
            className={`min-w-[320px] px-14 py-8 rounded-[3rem] font-black text-[12px] uppercase tracking-[0.5em] shadow-2xl transition-all active:scale-95 cursor-pointer ${
                pendingCount === 0 
                ? 'bg-slate-100 text-slate-300 shadow-none border border-slate-200' 
                : 'bg-brand-red hover:bg-brand-red-dark text-white shadow-brand-red/30'
            }`}
         >
            Finalize Daily Ledger
         </button>
      </div>
    </div>
  );
}
