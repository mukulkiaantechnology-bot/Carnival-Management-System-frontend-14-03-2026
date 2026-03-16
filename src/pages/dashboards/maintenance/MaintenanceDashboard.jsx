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
    { label: 'Equipment Status', value: '98%', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Work Orders', value: '0', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Critical Alerts', value: '0', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Completed Repairs', value: '0', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
      { label: 'Equipment Status', value: '98%', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Active Work Orders', value: activeCount.toString(), icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Critical Alerts', value: criticalCount.toString(), icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
      { label: 'Completed Repairs', value: completedCount.toString(), icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ]);
  }, []);

  return (
    <div className="space-y-6 overflow-x-hidden">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight px-1">
        Maintenance Dashboard
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm h-full">
            <CardContent className="p-4 sm:p-6 flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} flex-shrink-0`}>
                <stat.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 truncate mb-0.5">{stat.label}</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4 px-1">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800">Recent Work Orders</h2>
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-slate-100 table-fixed sm:table-auto">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider w-24">ID</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider w-40">Equipment</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider w-48 sm:w-auto">Issue</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Technician</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider w-28">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-blue-600 whitespace-nowrap text-[11px] sm:text-sm">{order.id}</td>
                      <td className="px-4 py-3 text-slate-700 whitespace-nowrap font-medium text-[11px] sm:text-sm">{order.equipment}</td>
                      <td className="px-4 py-3 text-slate-600 truncate text-[11px] sm:text-sm">{order.issue}</td>
                      <td className="hidden sm:table-cell px-4 py-3 text-slate-600 whitespace-nowrap text-[11px] sm:text-sm">{order.technician}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
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
