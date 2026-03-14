import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  RotateCcw,
  Ticket as TicketIcon,
  Download,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

const TICKET_ACTIVITY = [
  { id: 'TIC-10254', type: 'Adult - Day Pass', box: 'Main Entrance Box A', time: '10:30 AM', status: 'Used' },
  { id: 'TIC-10255', type: 'Child - Day Pass', box: 'Main Entrance Box A', time: '10:32 AM', status: 'Valid' },
  { id: 'TIC-10256', type: 'VIP Express', box: 'Zone B Counter 1', time: '10:35 AM', status: 'Valid' },
  { id: 'TIC-10257', type: 'Adult - Day Pass', box: 'Main Entrance Box B', time: '10:38 AM', status: 'Cancelled' },
  { id: 'TIC-10258', type: 'Adult - Day Pass', box: 'Zone B Counter 1', time: '10:40 AM', status: 'Valid' },
  { id: 'TIC-10259', type: 'Senior - Day Pass', box: 'Parking Gate Box', time: '10:42 AM', status: 'Used' },
];

const RECENT_SCANS = [
  { id: 'TIC-10254', ride: 'Cyclone Coaster', time: '10:35 AM' },
  { id: 'TIC-10259', ride: 'Wonder Wheel', time: '10:48 AM' },
  { id: 'TIC-10248', ride: 'Splash Mountain', time: '10:50 AM' },
];

export default function TicketTracking() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Activity className="text-blue-500" size={28} /> Activity Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Real-time ticket issuance and scan logs.</p>
        </div>
        
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-sm transition-all transition-all placeholder:text-slate-300"
            placeholder="Search ticket ID..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader 
            title="Issuance Log" 
            subtitle="Recent tickets generated at counters" 
            action={
               <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <Download size={20} />
               </button>
            }
          />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 uppercase text-[10px] font-black text-slate-400 tracking-widest leading-none">
                    <th className="text-left px-6 py-4">Ticket ID</th>
                    <th className="text-left px-6 py-4">Type</th>
                    <th className="text-left px-6 py-4">Box</th>
                    <th className="text-center px-4 py-4">Time</th>
                    <th className="text-right px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TICKET_ACTIVITY.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50/30 transition-all group">
                      <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <TicketIcon size={14} className="text-blue-500" />
                            <span className="font-mono text-xs font-black text-slate-800 tracking-tight">{ticket.id}</span>
                          </div>
                      </td>
                      <td className="px-6 py-5">
                          <p className="font-bold text-slate-700 text-xs tracking-tight">{ticket.type}</p>
                      </td>
                      <td className="px-6 py-5">
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none">{ticket.box}</p>
                      </td>
                      <td className="px-4 py-5 text-center">
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                            <Clock size={12} /> {ticket.time}
                          </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[9px] font-black uppercase ring-1 ring-blue-100">
                            {ticket.status}
                          </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-3 px-1">
             <RotateCcw size={18} className="text-emerald-500" /> Recent Scans
          </h2>
          
          <div className="space-y-4">
             {RECENT_SCANS.map((scan) => (
               <div key={scan.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 font-bold hover:shadow-lg transition-all border-l-4 border-l-emerald-500 cursor-pointer">
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">{scan.id}</p>
                   <p className="text-sm font-black text-slate-800 tracking-tight leading-tight">{scan.ride}</p>
                   <p className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-widest flex items-center gap-1">
                      <Clock size={12} /> {scan.time}
                   </p>
               </div>
             ))}
          </div>

          <button className="w-full py-4 bg-slate-50 text-slate-400 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-[3px] hover:bg-slate-100 transition-all">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
