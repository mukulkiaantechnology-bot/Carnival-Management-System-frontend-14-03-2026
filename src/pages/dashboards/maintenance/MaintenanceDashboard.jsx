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
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-1 px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Maintenance
        </h1>
        <p className="text-sm text-slate-500 font-medium">System health and equipment oversight.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-0">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-all rounded-[1.5rem] md:rounded-[2rem]">
            <CardContent className="p-4 md:p-6 flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} flex-shrink-0 shadow-sm`}>
                <stat.icon size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 sm:px-0">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Recent Work Orders</h2>
          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-widest leading-none">Live Updates</span>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block px-4 sm:px-0">
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[2px]">ID</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Equipment</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Issue</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Technician</th>
                    <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                      <td className="px-6 py-5 font-mono text-xs font-black text-blue-600 uppercase tracking-tighter">{order.id}</td>
                      <td className="px-6 py-5">
                        <p className="font-black text-slate-800 tracking-tight">{order.equipment}</p>
                      </td>
                      <td className="px-6 py-5 text-slate-500 font-medium">{order.issue}</td>
                      <td className="px-6 py-5 text-slate-600 font-bold">{order.technician}</td>
                      <td className="px-6 py-5 text-right">
                        <span className={`inline-flex px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ring-1 ring-inset ${
                          order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
                          order.status === 'In Progress' ? 'bg-blue-50 text-blue-700 ring-blue-200' :
                          'bg-amber-50 text-amber-700 ring-amber-200'
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

        {/* Mobile Modern List View */}
        <div className="sm:hidden space-y-4 px-4">
          {recentOrders.map((order) => (
            <Card key={order.id} className="border-none shadow-lg shadow-slate-200/50 rounded-[2.5rem] overflow-hidden group active:scale-[0.98] transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-black text-blue-600 uppercase tracking-tighter">{order.id}</span>
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ring-1 ring-inset ${
                    order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
                    order.status === 'In Progress' ? 'bg-blue-50 text-blue-700 ring-blue-200' :
                    'bg-amber-50 text-amber-700 ring-amber-200'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <h3 className="font-black text-slate-800 text-lg tracking-tight mb-1 group-hover:text-blue-600 transition-colors">{order.equipment}</h3>
                <p className="text-xs text-slate-500 font-medium mb-4">{order.issue}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                      {order.technician.charAt(0)}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.technician}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.priority === 'High' || order.priority === 'Emergency' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    <AlertTriangle size={14} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
