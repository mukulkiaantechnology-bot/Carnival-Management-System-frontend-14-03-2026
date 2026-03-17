import { GraduationCap, Users, ClipboardCheck, Clock } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

const STATS = [
  { label: 'Total Staff', value: '142', icon: Users, color: 'text-brand-red', bg: 'bg-brand-red/10' },
  { label: 'New Hires', value: '5', icon: ClipboardCheck, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { label: 'Pending Training', value: '14', icon: GraduationCap, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
  { label: 'Active Shifts', value: '38', icon: Clock, color: 'text-brand-text', bg: 'bg-brand-light' },
];

const RECENT_ACTIVITY = [
  { id: 1, employee: 'John Doe', module: 'Safety Protocol 101', date: '2 hours ago', status: 'Completed' },
  { id: 2, employee: 'Jane Smith', module: 'Customer Service', date: '5 hours ago', status: 'Completed' },
  { id: 3, employee: 'Mike Johnson', module: 'First Aid basics', date: 'Yesterday', status: 'Completed' },
  { id: 4, employee: 'Sarah Wilson', module: 'Safety Protocol 101', date: 'Yesterday', status: 'Completed' },
];

export default function HRDashboard() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-red tracking-tight uppercase italic leading-none">HR & Training</h1>
          <p className="text-slate-500 font-bold text-sm mt-2 uppercase tracking-widest">Operational Pulse & Team Readiness</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white border border-slate-100 rounded-xl shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-400">
            March 2026
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 flex items-center space-x-5">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                <p className="text-2xl font-black text-brand-text tracking-tight italic leading-none">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Recent Activity */}
        <div>
          <Card className="border-none shadow-xl shadow-slate-100/50 h-full overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <h3 className="text-sm font-black text-brand-text uppercase tracking-widest flex items-center gap-2">
                <Clock size={16} className="text-brand-red" />
                Recent Training Activity
              </h3>
            </div>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Module</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {RECENT_ACTIVITY.map((activity) => (
                      <tr key={activity.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-black text-slate-700">{activity.employee}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-slate-500">{activity.module}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase italic">{activity.date}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-tight">
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

