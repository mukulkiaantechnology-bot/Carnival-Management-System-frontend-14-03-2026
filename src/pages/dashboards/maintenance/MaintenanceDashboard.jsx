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
    <div className="space-y-6 max-w-[100vw] overflow-hidden px-1 sm:px-2">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Maintenance Dashboard</h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="p-3 sm:p-6 flex flex-col xs:flex-row items-center xs:space-x-4 text-center xs:text-left">
              <div className={`p-2 sm:p-3 rounded-xl ${stat.bg} ${stat.color} flex-shrink-0 mb-2 xs:mb-0`}>
                <stat.icon size={18} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate mb-0.5">{stat.label}</p>
                <p className="text-base sm:text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 px-1">Recent Work Orders</h2>
        <Card className="border-none shadow-sm overflow-hidden min-h-[200px]">
          <div className="overflow-x-auto scrollbar-hide sm:scrollbar-default">
            <table className="w-full text-left border-collapse min-w-[550px] sm:min-w-[700px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Equipment</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Issue</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Technician</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] sm:text-sm">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-blue-600 whitespace-nowrap">{order.id}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-700 whitespace-nowrap font-medium">{order.equipment}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-600 whitespace-nowrap">{order.issue}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-600 whitespace-nowrap">{order.technician}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-wider ${
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
        </Card>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 400px) {
          .xs\\:flex-row { flex-direction: row !important; }
          .xs\\:text-left { text-align: left !important; }
          .xs\\:mb-0 { margin-bottom: 0 !important; }
          .xs\\:space-x-4 > :not([hidden]) ~ :not([hidden]) { margin-left: 1rem !important; }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
