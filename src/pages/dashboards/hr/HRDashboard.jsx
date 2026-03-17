import { GraduationCap, Users, ClipboardCheck, Clock } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

const STATS = [
  { label: 'Total Staff', value: '142', icon: Users, color: 'text-brand-red', bg: 'bg-brand-red/10' },
  { label: 'New Hires', value: '5', icon: ClipboardCheck, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { label: 'Pending Training', value: '14', icon: GraduationCap, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
  { label: 'Active Shifts', value: '38', icon: Clock, color: 'text-brand-text', bg: 'bg-brand-light' },
];

export default function HRDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black text-brand-red tracking-tight uppercase italic leading-none">HR & Training Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <Card key={stat.label} className="border-brand-gold/10">
            <CardContent className="p-8 flex items-center space-x-6">
              <div className={`p-5 rounded-2xl ${stat.bg} ${stat.color} shadow-inner`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                <p className="text-2xl font-black text-brand-text tracking-tight italic leading-none">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <Card>
          <CardContent className="p-6 min-h-[300px] flex items-center justify-center text-slate-400">
            Training Progress Reporting Placeholder
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
