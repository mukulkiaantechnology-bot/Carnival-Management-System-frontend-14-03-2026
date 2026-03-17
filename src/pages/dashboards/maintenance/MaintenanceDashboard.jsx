import { useState, useEffect } from 'react';
import { Wrench, ClipboardCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

const INITIAL_WORK_ORDERS = [
  { id: 'WO-2024-001', equipment: 'Ferris Wheel', issue: 'Motor Vibration', technician: 'John Doe', priority: 'High', status: 'In Progress' },
  { id: 'WO-2024-002', equipment: 'Bumper Cars', issue: 'Electrical Short', technician: 'Mike Smith', priority: 'Medium', status: 'Pending' },
  { id: 'WO-2024-003', equipment: 'Roller Coaster', issue: 'Track Lubrication', technician: 'Sarah Wilson', priority: 'Low', status: 'Completed' },
  { id: 'WO-2024-004', equipment: 'Carousel', icon: Wrench, issue: 'Lighting Failure', technician: 'John Doe', priority: 'Medium', status: 'In Progress' },
  { id: 'WO-2024-005', equipment: 'Tilt-A-Whirl', icon: Wrench, issue: 'Hydraulic Leak', technician: 'Mike Smith', priority: 'Emergency', status: 'Open' },
];

export default function MaintenanceDashboard() {
  const [stats, setStats] = useState([
    { label: 'Equipment Status', value: '98%', icon: Wrench, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
    { label: 'Active Work Orders', value: '0', icon: ClipboardCheck, color: 'text-brand-red', bg: 'bg-brand-red/10' },
    { label: 'Critical Alerts', value: '0', icon: AlertTriangle, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
    { label: 'Completed Repairs', value: '0', icon: CheckCircle, color: 'text-brand-text', bg: 'bg-brand-light' },
  ]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('carnival_work_orders');
    const orders = savedOrders ? JSON.parse(savedOrders) : INITIAL_WORK_ORDERS;
    
    setRecentOrders(orders.slice(0, 5));

    const activeCount = orders.filter(o => o.status !== 'Completed').length;
    const criticalCount = orders.filter(o => o.priority === 'Emergency' || o.priority === 'High').length;
    const completedCount = orders.filter(o => o.status === 'Completed').length;

    setStats([
      { label: 'Equipment Status', value: '98%', icon: Wrench, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
      { label: 'Active Work Orders', value: activeCount.toString(), icon: ClipboardCheck, color: 'text-brand-red', bg: 'bg-brand-red/10' },
      { label: 'Critical Alerts', value: criticalCount.toString(), icon: AlertTriangle, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
      { label: 'Completed Repairs', value: completedCount.toString(), icon: CheckCircle, color: 'text-brand-text', bg: 'bg-brand-light' },
    ]);
  }, []);

  return (
    <div className="space-y-6 overflow-x-hidden">
      <h1 className="text-xl sm:text-2xl font-black text-brand-red tracking-tight px-1 uppercase italic leading-none">
        Maintenance Dashboard
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-brand-gold/10 shadow-xl shadow-brand-gold/5 h-full">
            <CardContent className="p-4 sm:p-8 flex items-center space-x-6">
              <div className={`p-5 rounded-2xl ${stat.bg} ${stat.color} flex-shrink-0 shadow-inner`}>
                <stat.icon size={20} className="sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate mb-1.5 leading-none">{stat.label}</p>
                <p className="text-lg sm:text-3xl font-black text-brand-text leading-none italic tracking-tight">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4 px-1">
        <h2 className="text-base sm:text-lg font-black text-brand-red uppercase italic tracking-tight">Recent Work Orders</h2>
        <Card className="border-brand-gold/20 shadow-xl shadow-brand-gold/5 overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-brand-gold/20">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-brand-gold/10 table-fixed sm:table-auto">
                <thead className="bg-brand-light">
                  <tr>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-brand-red uppercase tracking-widest w-24">Protocol ID</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-brand-red uppercase tracking-widest w-40">Equipment Asset</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-brand-red uppercase tracking-widest w-48 sm:w-auto">Execution Lead</th>
                    <th className="hidden sm:table-cell px-6 py-5 text-left text-[10px] font-black text-brand-red uppercase tracking-widest">Technician</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-brand-red uppercase tracking-widest w-28 text-center">Status</th>
                  </tr>
                </thead>
                  <tbody className="bg-white divide-y divide-brand-gold/5">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-brand-light/50 transition-colors group">
                        <td className="px-6 py-5 font-black text-brand-red uppercase italic tracking-tighter text-[11px] sm:text-xs">{order.id}</td>
                        <td className="px-6 py-5 text-brand-text whitespace-nowrap font-black uppercase tracking-tight text-[11px] sm:text-xs italic">{order.equipment}</td>
                        <td className="px-6 py-5 text-slate-600 truncate text-[11px] sm:text-xs font-bold">{order.issue}</td>
                        <td className="hidden sm:table-cell px-6 py-5 text-slate-500 whitespace-nowrap text-[11px] sm:text-xs font-black uppercase tracking-widest">{order.technician}</td>
                        <td className="px-6 py-5 whitespace-nowrap text-center">
                          <span className={`inline-flex px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-inner ${
                            order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            order.status === 'In Progress' ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' :
                            'bg-brand-gold/10 text-brand-gold border-brand-gold/20'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
