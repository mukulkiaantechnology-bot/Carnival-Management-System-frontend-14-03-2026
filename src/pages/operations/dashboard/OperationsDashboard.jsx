import { ClipboardCheck, Calendar, Users, FileText, CheckCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Link } from 'react-router-dom';

const STATS = [
  { label: 'Open Inspections', value: '12', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  { label: 'Active Events', value: '5', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { label: 'Employees On Duty', value: '87', icon: Users, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
  { label: 'Pending Reports', value: '6', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
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
  passed: { label: 'Passed', icon: CheckCircle, className: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  pending: { label: 'Pending', icon: Clock, className: 'bg-amber-50 text-amber-700 border-amber-100' },
  failed: { label: 'Failed', icon: AlertTriangle, className: 'bg-rose-50 text-rose-700 border-rose-100' },
};

export default function OperationsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Operations Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back, Operations Manager</p>
      </div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className={`border-l-4 ${stat.border.replace('100', '400')}`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inspections Table */}
        <Card className="lg:col-span-2">
          <CardHeader title="Recent Inspections" subtitle="Latest safety check-ups" />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Inspection Name</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Ride</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Inspector</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_INSPECTIONS.map((row, idx) => {
                    const cfg = STATUS_CONFIG[row.status];
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-4 font-medium text-slate-800">{row.name}</td>
                        <td className="px-5 py-4 text-slate-600">{row.ride}</td>
                        <td className="px-5 py-4 text-slate-600">{row.inspector}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.className}`}>
                            <cfg.icon size={11} />
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-500">{row.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-slate-100">
              <Link to="/operations/inspections" className="text-blue-600 hover:text-blue-800 text-xs font-semibold flex items-center gap-1 transition-colors">
                View all inspections <ArrowRight size={12} />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events List */}
        <Card>
          <CardHeader title="Upcoming Events" subtitle="Next scheduled activities" />
          <CardContent className="p-5 space-y-4">
            {UPCOMING_EVENTS.map((event, idx) => (
              <div key={idx} className="flex gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex flex-col items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <Calendar size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">{event.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5 truncate">{event.location}</p>
                  <p className="text-indigo-600 text-xs mt-1 font-semibold">{event.date}</p>
                </div>
              </div>
            ))}
            <Link to="/operations/events" className="block text-center text-blue-600 hover:text-blue-800 text-xs font-semibold pt-2 transition-colors">
              Show all events
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
