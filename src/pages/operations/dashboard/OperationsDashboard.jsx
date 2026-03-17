import { ClipboardCheck, Calendar, Users, FileText, CheckCircle, Clock, AlertTriangle, ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Link } from 'react-router-dom';

const STATS = [
  { label: 'Open Inspections', value: '12', icon: ClipboardCheck, color: 'text-brand-red', bg: 'bg-brand-red/10', border: 'border-brand-red/20' },
  { label: 'Active Events', value: '5', icon: Calendar, color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20' },
  { label: 'Staff On Duty', value: '87', icon: Users, color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20' },
  { label: 'Pending Reports', value: '6', icon: FileText, color: 'text-brand-text', bg: 'bg-brand-light', border: 'border-brand-gold/10' },
];

const RECENT_INSPECTIONS = [
  { name: 'Roller Coaster Daily Check', ride: 'Cyclone King', inspector: 'James Carter', status: 'passed', date: '2026-03-14' },
  { name: 'Food Zone Hygene', ride: 'Food Court A', inspector: 'Maria Lopez', status: 'pending', date: '2026-03-14' },
  { name: 'Ferris Wheel Gear Box', ride: 'Wonder Wheel', inspector: 'David Kim', status: 'failed', date: '2026-03-13' },
  { name: 'Water Slide Pump Test', ride: 'Splash Mountain', inspector: 'Tom Bradley', status: 'passed', date: '2026-03-13' },
];

const UPCOMING_EVENTS = [
  { name: 'Summer Festival Kickoff', location: 'Main Arena', date: 'Mar 15, 2026' },
  { name: 'Kids Magic Show', location: 'Zone C – Stage B', date: 'Mar 17, 2026' },
  { name: 'Night Carnival Parade', location: 'Central Walkway', date: 'Mar 18, 2026' },
  { name: 'Safety Drill Session', location: 'Staff Training Hub', date: 'Mar 20, 2026' },
];

const STATUS_CONFIG = {
  passed: { label: 'Passed', icon: CheckCircle, className: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  pending: { label: 'Pending', icon: Clock, className: 'bg-brand-gold/10 text-brand-gold border-brand-gold/20' },
  failed: { label: 'Failed', icon: AlertTriangle, className: 'bg-brand-red/10 text-brand-red border-brand-red/20' },
};

export default function OperationsDashboard() {
  return (
    <div className="space-y-6 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div>
          <h1 className="text-2xl font-black text-brand-red tracking-tight uppercase italic leading-none">Operations Dashboard</h1>
          <p className="text-slate-500 font-bold text-xs mt-2 uppercase tracking-widest leading-none">Real-time Performance & Safety Overview</p>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white border border-slate-100 px-4 py-2 rounded-xl shadow-sm">
          Welcome back, <span className="text-brand-red italic">Operations Manager</span>
        </p>
      </div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between group">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                <p className="text-3xl font-black text-brand-text tracking-tight italic leading-none">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inspections Table */}
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-sm">
          <CardHeader title="Recent Inspections" subtitle="Latest safety check-ups" />
          <CardContent className="p-0">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-slate-100 table-fixed sm:table-auto">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-48">Inspection Name</th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-36">Ride</th>
                      <th className="hidden sm:table-cell text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-36">Inspector</th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-28">Status</th>
                      <th className="hidden md:table-cell text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-28">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {RECENT_INSPECTIONS.map((row, idx) => {
                      const cfg = STATUS_CONFIG[row.status];
                      return (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4 font-bold text-slate-800 text-[11px] sm:text-sm truncate">{row.name}</td>
                          <td className="px-5 py-4 text-slate-600 text-[11px] sm:text-sm truncate">{row.ride}</td>
                          <td className="hidden sm:table-cell px-5 py-4 text-slate-600 text-[11px] sm:text-sm">{row.inspector}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.className}`}>
                              <cfg.icon size={10} />
                              {cfg.label}
                            </span>
                          </td>
                          <td className="hidden md:table-cell px-5 py-4 text-slate-500 text-[11px] sm:text-sm">{row.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-slate-50 bg-slate-50/30">
              <Link to="/operations/inspections" className="text-brand-red hover:text-brand-red-dark text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors group/link">
                View all inspections <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events List */}
        <Card>
          <CardHeader title="Upcoming Events" subtitle="Next scheduled activities" />
          <CardContent className="p-5 space-y-4">
            {UPCOMING_EVENTS.map((event, idx) => (
              <div key={idx} className="flex gap-4 p-3.5 rounded-2xl border border-slate-50 hover:bg-brand-red/5 hover:border-brand-red/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex flex-col items-center justify-center font-black text-xs flex-shrink-0 group-hover:bg-brand-red group-hover:text-white transition-all">
                  <Calendar size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-brand-text text-sm truncate uppercase italic tracking-tight">{event.name}</p>
                  <p className="text-slate-400 text-[10px] font-bold mt-1 truncate uppercase flex items-center gap-1"><MapPin size={10} className="text-brand-gold" /> {event.location}</p>
                  <p className="text-brand-red text-[10px] mt-1.5 font-black uppercase tracking-widest font-mono italic">{event.date}</p>
                </div>
              </div>
            ))}
            <Link to="/operations/events" className="block text-center text-brand-red hover:text-brand-red-dark text-[10px] font-black uppercase tracking-widest pt-2 transition-colors">
              Show all events
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
