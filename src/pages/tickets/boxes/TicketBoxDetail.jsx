import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Store, 
  TrendingUp, 
  Users, 
  Ticket, 
  Clock, 
  DollarSign, 
  ArrowUpRight,
  ChevronRight,
  Calendar,
  Settings,
  ShieldCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const MOCK_DATA = {
  'BOX-001': { name: 'Main Entrance Box A', location: 'North Gate', staff: 'Robert Wilson', sales: '$7,700', tickets: 450, growth: '+12.5%' },
  'BOX-002': { name: 'Main Entrance Box B', location: 'North Gate', staff: 'Linda White', sales: '$4,200', tickets: 280, growth: '+5.2%' },
  'BOX-003': { name: 'Zone B Counter 1', location: 'Water Zone', staff: 'Michael Scott', sales: '$5,350', tickets: 310, growth: '+8.1%' },
  'BOX-004': { name: 'Zone B Counter 2', location: 'Water Zone', staff: 'Pam Beesly', sales: '$0.00', tickets: 0, growth: '0%' },
  'BOX-005': { name: 'Parking Gate Box', location: 'East Parking', staff: 'Dwight Schrute', sales: '$2,720', tickets: 180, growth: '+3.4%' },
  'BOX-006': { name: 'Kids Zone Kiosk', location: 'Zone C', staff: 'Angela Martin', sales: '$3,550', tickets: 215, growth: '+6.7%' },
};

const HOURLY_SALES = [
  { time: '09:00 AM', amount: '$450', count: 25 },
  { time: '10:00 AM', amount: '$820', count: 48 },
  { time: '11:00 AM', amount: '$1,200', count: 65 },
  { time: '12:00 PM', amount: '$950', count: 52 },
  { time: '01:00 PM', amount: '$600', count: 35 },
];

export default function TicketBoxDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const box = MOCK_DATA[id] || { name: 'Unknown Counter', location: 'N/A', staff: 'Unassigned', sales: '$0', tickets: 0, growth: '0%' };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExport = () => {
    showNotification(`Exporting report for ${id || 'this counter'}...`);
    // Simulated download logic would go here
  };

  return (
    <div className="space-y-8 pb-10 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-[110] animate-in slide-in-from-right duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 border border-slate-800">
            <div className="bg-blue-500/20 p-2 rounded-xl">
              <CheckCircle2 size={18} className="text-blue-400" />
            </div>
            <span className="text-sm font-black tracking-tight">{notification}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 sm:p-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl shadow-sm border border-slate-100 transition-all active:scale-95 flex-shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] sm:text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-widest">{id}</span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight truncate">{box.name}</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-bold flex items-center gap-2 mt-1 truncate">
              <Store size={14} className="text-slate-400 flex-shrink-0" /> {box.location} • Active Shift
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex-1 sm:flex-none font-black h-10 sm:h-12 px-5 sm:px-6 rounded-2xl bg-white shadow-sm border-none text-[10px] sm:text-xs" onClick={handleExport}>
            Export Report
          </Button>
          <Button variant="primary" className="flex-1 sm:flex-none font-black h-10 sm:h-12 px-5 sm:px-8 rounded-2xl shadow-xl shadow-blue-500/20 text-[10px] sm:text-xs" onClick={() => showNotification("Opening counter settings...")}>
            Open Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-slate-900 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <TrendingUp size={120} />
          </div>
          <CardContent className="p-8 relative z-10">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[2px] mb-4">Live Performance</p>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-4xl font-black tracking-tighter mb-1">{box.sales}</h3>
                <p className="text-xs font-bold text-slate-400">Total Revenue Today</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 font-black text-[10px]">
                <ArrowUpRight size={12} /> {box.growth}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white group">
          <CardContent className="p-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4">Tickets Distributed</p>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-1">{box.tickets}</h3>
                <p className="text-xs font-bold text-slate-400">Units Sold</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:rotate-12 transition-transform">
                <Ticket size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white group">
          <CardContent className="p-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4">Current Staff</p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-black text-slate-400 shadow-inner">
                {box.staff[0]}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 leading-none">{box.staff}</h3>
                <p className="text-xs font-bold text-slate-400 mt-1">Lead Seller</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hourly Breakdown */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem]">
          <CardHeader title="Hourly Momentum" subtitle="Revenue distribution throughout the day." />
          <CardContent>
            <div className="space-y-4">
              {HOURLY_SALES.map((sale, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-50 hover:bg-white hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-blue-500 transition-colors">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 leading-tight">{sale.time}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{sale.count} Tickets Issued</p>
                    </div>
                  </div>
                  <p className="text-lg font-black text-slate-800 tracking-tight">{sale.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Center */}
        <div className="space-y-6">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-3 px-1">
             <Settings size={18} className="text-blue-600" /> Utility Center
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            <button className="flex items-center justify-between p-6 bg-white rounded-[1.8rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <AlertCircle size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-800 leading-tight">Emergency Close</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Instant shutdown</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="flex items-center justify-between p-6 bg-white rounded-[1.8rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <ShieldCheck size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-800 leading-tight">Revenue Sync</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Final daily audit</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-200 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <Card className="bg-blue-600 border-none rounded-[2.2rem] shadow-xl shadow-blue-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 text-white/10 -mr-10 -mt-10">
              <Calendar size={120} />
            </div>
            <CardContent className="p-8 relative z-10">
              <h4 className="text-white font-black text-lg leading-tight mb-2">Shift Schedule</h4>
              <p className="text-blue-100 text-xs font-medium mb-6 leading-relaxed">Next shift starts at 4:30 PM with Sarah Jenkins.</p>
              <button className="w-full py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-[10px] font-black text-white uppercase tracking-[2px] transition-all">
                View Staff Rota
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
