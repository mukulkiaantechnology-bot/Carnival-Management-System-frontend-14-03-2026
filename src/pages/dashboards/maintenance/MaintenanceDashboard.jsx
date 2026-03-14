import { Users, ClipboardCheck, Wrench, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

const STATS = [
  { label: 'Equipment Status', value: '98%', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Work Orders', value: '8', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Critical Alerts', value: '1', icon: Wrench, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Completed Repairs', value: '42', icon: ClipboardCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export default function MaintenanceDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Maintenance Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-slate-800">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <Card>
          <CardContent className="p-6 min-h-[300px] flex items-center justify-center text-slate-400">
            Work Orders Feed Placeholder
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
