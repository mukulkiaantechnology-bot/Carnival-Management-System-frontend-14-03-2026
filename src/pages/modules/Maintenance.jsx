import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMaintenance } from '../../context/MaintenanceContext';
import {
  Wrench, AlertTriangle, ClipboardList, PenTool, X, CheckCircle2,
  Clock, User, Settings, Info, ShieldCheck, ChevronRight,
  ArrowRight, Search, FileText, Download, CheckCircle, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

// Constants moved to context

// Local Modal Component
function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className={`bg-white rounded-[2rem] shadow-2xl w-full ${maxWidth} animate-in zoom-in-95 duration-200 overflow-hidden border border-white/20`}>
        <div className="p-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="p-7">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Maintenance() {
  const navigate = useNavigate();
  const { workOrders: contextWorkOrders, equipmentList: contextEquipment, addWorkOrder, updateWorkOrder } = useMaintenance();

  const [workOrders, setWorkOrders] = useState(contextWorkOrders);
  const [equipmentList, setEquipmentList] = useState(contextEquipment);
  const [activeModal, setActiveModal] = useState(null); // 'equipment', 'create', 'manage'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notification, setNotification] = useState(null);

  // Update local state when context changes
  useMemo(() => {
    setWorkOrders(contextWorkOrders);
  }, [contextWorkOrders]);

  useMemo(() => {
    setEquipmentList(contextEquipment);
  }, [contextEquipment]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleManageOrder = (order) => {
    navigate(String(order.id));
  };

  const handleStatusChange = (status) => {
    setWorkOrders(workOrders.map(wo =>
      wo.id === selectedOrder.id ? { ...wo, status } : wo
    ));
    setActiveModal(null);
    showNotification(`Work Order #${selectedOrder.id} status updated to ${status}`);
  };

  const handleCreateWorkOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newOrder = {
      id: workOrders.length + 1,
      idStr: `WO-00${workOrders.length + 1}`,
      equipment: formData.get('equipment'),
      issue: formData.get('issue'),
      assigned: formData.get('assigned'),
      priority: formData.get('priority'),
      status: 'Pending',
      lastService: new Date().toISOString().split('T')[0],
      description: formData.get('description'),
      details: formData.get('description'),
      updates: []
    };
    addWorkOrder(newOrder);
    setActiveModal(null);
    showNotification(`New Work Order for ${newOrder.equipment} created!`);
  };

  // Stats derived from state
  const stats = useMemo(() => ({
    urgent: workOrders.filter(wo => wo.priority === 'Critical' || wo.priority === 'High').filter(wo => wo.status !== 'Completed').length,
    pending: workOrders.filter(wo => wo.status === 'Pending').length,
    scheduled: equipmentList.filter(eq => eq.status === 'Operational').length,
  }), [workOrders, equipmentList]);

  return (
    <div className="space-y-6 relative px-1 pb-10">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-[110] animate-in slide-in-from-right duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 border border-slate-800">
            <div className="bg-blue-500/20 p-2 rounded-xl">
              <CheckCircle2 size={18} className="text-blue-400" />
            </div>
            <span className="text-sm font-black tracking-tight">{notification}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Maintenance</h1>
          <p className="text-slate-500 text-sm font-bold">Monitor equipment health and manage repair work orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="flex-1 flex items-center justify-center gap-2 font-black bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg h-10 sm:h-12 text-[10px] sm:text-xs px-6 rounded-xl" 
            onClick={() => setActiveModal('equipment')}
          >
            <ClipboardList size={18} />
            Equipment Status
          </button>
          <button 
            className="flex-1 flex items-center justify-center gap-2 font-black bg-brand-gold text-brand-text hover:bg-brand-gold-dark transition-all shadow-xl shadow-brand-gold/20 h-10 sm:h-12 text-[10px] sm:text-xs px-6 rounded-xl" 
            onClick={() => setActiveModal('create')}
          >
            <PenTool size={18} />
            Create Work Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-none shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-brand-red/10 transition-all group overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-red" />
          <CardContent className="p-8">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-brand-red/5 text-brand-red rounded-[1.25rem] group-hover:scale-110 transition-transform shadow-sm">
                <AlertTriangle size={28} />
              </div>
              <div>
                <p className="text-[11px] font-black text-brand-red/60 uppercase tracking-widest">Repair Alerts</p>
                <p className="text-3xl font-black text-slate-800 mt-1">{stats.urgent} Urgent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-brand-gold/10 transition-all group overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-gold" />
          <CardContent className="p-8">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-brand-gold/10 text-brand-gold-dark rounded-[1.25rem] group-hover:scale-110 transition-transform shadow-sm">
                <Wrench size={28} />
              </div>
              <div>
                <p className="text-[11px] font-black text-brand-gold-dark/60 uppercase tracking-widest">Pending Orders</p>
                <p className="text-3xl font-black text-slate-800 mt-1">{stats.pending} Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-emerald-100/50 transition-all group overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
          <CardContent className="p-8">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-[1.25rem] group-hover:scale-110 transition-transform shadow-sm">
                <ShieldCheck size={28} />
              </div>
              <div>
                <p className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">Active Units</p>
                <p className="text-3xl font-black text-slate-800 mt-1">{stats.scheduled} Operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl shadow-slate-100/50 border-none overflow-hidden">
        <CardHeader title="Live Work Orders" subtitle="Detailed list of current and past maintenance tasks." />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Equipment</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Issue Reported</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Technic</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Check</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {workOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="text-sm font-black text-slate-800 leading-tight">{order.equipment}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">WO-00{order.id}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm text-slate-700 font-bold leading-tight">{order.issue}</p>
                      <p className="text-[10px] font-black text-blue-500 uppercase mt-0.5">{order.priority} Priority</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[0.75rem] bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-500 shadow-sm">
                          {order.assigned.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-black text-sm text-slate-700 tracking-tight">{order.assigned}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                          order.status === 'In Progress' ? 'bg-brand-gold/10 text-brand-gold-dark' : 'bg-brand-red/5 text-brand-red'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-wider">{order.lastService}</td>
                    <td className="px-8 py-5 text-right">
                      <button
                        className="h-10 px-6 text-[10px] font-black uppercase tracking-widest bg-brand-red text-white hover:bg-brand-red-dark transition-all shadow-lg shadow-brand-red/20 rounded-xl"
                        onClick={() => handleManageOrder(order)}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <Modal isOpen={activeModal === 'equipment'} onClose={() => setActiveModal(null)} title="Equipment Health Status" maxWidth="max-w-xl">
        <div className="space-y-4">
          {equipmentList.map((eq) => (
            <div key={eq.name} className="p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm">
                    <Settings size={20} className="text-slate-400" />
                  </div>
                  <span className="font-black text-slate-800 text-lg tracking-tight">{eq.name}</span>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${eq.status === 'Operational' ? 'bg-emerald-500 text-white' :
                    eq.status === 'Warning' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                  }`}>{eq.status}</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  <span>System Health Score</span>
                  <span className={eq.health > 70 ? 'text-emerald-500' : eq.health > 40 ? 'text-amber-500' : 'text-rose-500'}>{eq.health}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                  <div className={`h-full transition-all duration-1000 ease-out shadow-sm ${eq.health > 70 ? 'bg-emerald-500' :
                      eq.health > 40 ? 'bg-amber-500' : 'bg-rose-500'
                    }`} style={{ width: `${eq.health}%` }}></div>
                </div>
                <div className="flex items-center justify-between mt-4 border-t border-slate-100 pt-3">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter italic">Last Service: {eq.lastService}</p>
                  <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                    Full Audit <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'create'} onClose={() => setActiveModal(null)} title="Create New Work Order">
        <form className="space-y-5" onSubmit={handleCreateWorkOrder}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Equipment</label>
            <select name="equipment" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold appearance-none shadow-sm shadow-slate-50">
              {equipmentList.map(eq => <option key={eq.name}>{eq.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Issue</label>
            <input name="issue" type="text" placeholder="e.g. Excessive noise from motor" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold shadow-sm shadow-slate-50" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority level</label>
              <select name="priority" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold appearance-none shadow-sm shadow-slate-50">
                <option>Normal</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assign Technician</label>
              <select name="assigned" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold appearance-none shadow-sm shadow-slate-50">
                <option>Sam Technic</option>
                <option>Will Fixit</option>
                <option>Alex Wright</option>
                <option>Jane Door</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Details</label>
            <textarea name="description" rows={3} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none font-bold shadow-sm shadow-slate-50" placeholder="Describe the fault or required maintenance in detail..."></textarea>
          </div>
          <button 
            className="w-full h-11 sm:h-14 font-black bg-brand-gold text-brand-text hover:bg-brand-gold-dark uppercase tracking-widest shadow-2xl shadow-brand-gold/20 rounded-2xl group flex items-center justify-center gap-3 text-xs sm:text-sm transition-all" 
            type="submit"
          >
            Publish Order <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </Modal>

    </div>
  );
}
