import { Clock, ClipboardCheck, Calendar, FileText } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

const STATS = [
  { label: 'Current Shift Status', value: 'Clocked In', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Hours This Week', value: '32h', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Upcoming Tasks', value: '3', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Documents Pending', value: '0', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Employee Portal</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-xl font-semibold text-slate-800">{stat.value}</p>
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
