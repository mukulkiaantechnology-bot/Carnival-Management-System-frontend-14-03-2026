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
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-black text-brand-red tracking-tight uppercase italic leading-none">
          Maintenance Dashboard
        </h1>
        <p className="text-sm text-slate-500 font-bold mt-1 flex items-center gap-2">
          <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
          System health and equipment oversight.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="group hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 border border-brand-gold/20 shadow-2xl shadow-brand-gold/10 rounded-[2.2rem] overflow-hidden bg-white">
            <CardContent className="p-8 flex items-center space-x-6 relative text-brand-text">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light rounded-full blur-3xl group-hover:bg-brand-gold/10 transition-colors" />
               <div className={`p-5 rounded-[1.5rem] ${stat.bg} ${stat.color} group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shadow-inner relative z-10`}>
                <stat.icon size={32} strokeWidth={2.5} />
              </div>
              <div className="flex-1 relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-black text-brand-text leading-none italic">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-brand-red uppercase italic tracking-tight">Recent Work Orders</h2>
          <span className="text-[10px] font-black text-brand-orange bg-brand-orange/10 px-4 py-2 rounded-full uppercase tracking-widest leading-none border border-brand-orange/20">Live Updates</span>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block">
          <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-brand-light/50 border-b border-brand-gold/10">
                    <th className="px-8 py-6 text-left text-[10px] font-black text-brand-red uppercase tracking-widest">Protocol ID</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black text-brand-red uppercase tracking-widest">Equipment Asset</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black text-brand-red uppercase tracking-widest">Execution Lead</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black text-brand-red uppercase tracking-widest">Technician</th>
                    <th className="px-8 py-6 text-right text-[10px] font-black text-brand-red uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-brand-light/30 transition-all group">
                      <td className="px-8 py-6 font-black text-brand-red uppercase italic tracking-tighter text-xs">{order.id}</td>
                      <td className="px-8 py-6">
                        <p className="font-black text-brand-text tracking-tight uppercase italic">{order.equipment}</p>
                      </td>
                      <td className="px-8 py-6 text-slate-600 font-bold text-sm">{order.issue}</td>
                      <td className="px-8 py-6 text-slate-500 font-black uppercase tracking-widest text-[10px]">{order.technician}</td>
                      <td className="px-8 py-6 text-right">
                        <span className={`inline-flex px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-inner ${
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
          </Card>
        </div>

        {/* Mobile Modern List View */}
        <div className="sm:hidden space-y-6">
          {recentOrders.map((order) => (
            <Card key={order.id} className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden group active:scale-[0.98] transition-all bg-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-black text-[10px] text-brand-red uppercase italic tracking-tighter">{order.id}</span>
                  <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border shadow-inner ${
                    order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    order.status === 'In Progress' ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' :
                    'bg-brand-gold/10 text-brand-gold border-brand-gold/20'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <h3 className="font-black text-brand-text text-xl tracking-tight mb-1 group-hover:text-brand-red transition-colors uppercase italic">{order.equipment}</h3>
                <p className="text-xs text-slate-500 font-bold mb-6">{order.issue}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-light flex items-center justify-center text-[10px] font-black text-brand-red shadow-inner">
                      {order.technician.charAt(0)}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.technician}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                    order.priority === 'High' || order.priority === 'Emergency' ? 'bg-brand-red text-white shadow-brand-red/30' : 'bg-brand-gold text-brand-dark shadow-brand-gold/30'
                  }`}>
                    <AlertTriangle size={18} strokeWidth={2.5} />
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
