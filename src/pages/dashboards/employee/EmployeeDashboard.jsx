import { Clock, ClipboardCheck, Calendar, FileText } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

const STATS = [
  { label: 'Current Shift Status', value: 'Clocked In', icon: Clock, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { label: 'Hours This Week', value: '32h', icon: Clock, color: 'text-brand-red', bg: 'bg-brand-red/10' },
  { label: 'Upcoming Tasks', value: '3', icon: ClipboardCheck, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
  { label: 'Documents Pending', value: '0', icon: FileText, color: 'text-slate-400', bg: 'bg-slate-50' },
];

export default function EmployeeDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black text-brand-red tracking-tight uppercase italic leading-none">Employee Portal</h1>
      
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
            Time Clock and Daily Schedule Placeholder
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
