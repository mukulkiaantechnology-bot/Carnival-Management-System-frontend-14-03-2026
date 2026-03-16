import { useState } from 'react';
import { Wrench, AlertTriangle, ClipboardList, PenTool, X, CheckCircle2, Clock, User, Settings, Info, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_WORK_ORDERS = [
  { id: 1, equipment: 'Ferris Wheel', issue: 'Squeaking Sound', assigned: 'Sam Technic', status: 'In Progress', lastService: '2026-02-10', priority: 'High', description: 'Oiling needed for main axle bearings.' },
  { id: 2, equipment: 'Bumper Cars', issue: 'Steering Loose', assigned: 'Will Fixit', status: 'Pending', lastService: '2026-03-01', priority: 'Medium', description: 'Cable tension adjustment required on Unit 04.' },
  { id: 3, equipment: 'Roller Coaster', issue: 'Routine Check', assigned: 'Alex Wright', status: 'Completed', lastService: '2026-03-12', priority: 'Normal', description: 'Weekly structural and brake system audit.' },
  { id: 4, equipment: 'Generator A', issue: 'Oil Leak', assigned: 'Sam Technic', status: 'In Progress', lastService: '2026-01-20', priority: 'Critical', description: 'Primary seal failure detected during load test.' },
  { id: 5, equipment: 'Ticket Booth 2', issue: 'Lock Jammed', assigned: 'Jane Door', status: 'Completed', lastService: '2026-03-14', priority: 'Low', description: 'Replacing smart lock battery and re-aligning strike plate.' },
];

const MOCK_EQUIPMENT = [
  { name: 'Ferris Wheel', status: 'Operational', health: 85, lastService: '2026-02-10' },
  { name: 'Bumper Cars', status: 'Warning', health: 45, lastService: '2026-03-01' },
  { name: 'Roller Coaster', status: 'Operational', health: 98, lastService: '2026-03-12' },
  { name: 'Generator A', status: 'Critical', health: 20, lastService: '2026-01-20' },
  { name: 'Carousel', status: 'Operational', health: 92, lastService: '2026-02-15' },
];

// Local Modal Component
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function Maintenance() {
  const [activeModal, setActiveModal] = useState(null); // 'equipment', 'create', 'manage'
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleManageOrder = (order) => {
    setSelectedOrder(order);
    setActiveModal('manage');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Maintenance</h1>
          <p className="text-slate-500 text-sm">Monitor equipment health and manage repair work orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2" onClick={() => setActiveModal('equipment')}>
            <ClipboardList size={18} />
            Equipment Status
          </Button>
          <Button variant="primary" className="flex items-center gap-2" onClick={() => setActiveModal('create')}>
            <PenTool size={18} />
            Create Work Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white border-2 border-red-50 hover:border-red-200 transition-all shadow-sm group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl group-hover:scale-110 transition-transform">
                <AlertTriangle size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Repair Alerts</p>
                <p className="text-2xl font-extrabold text-red-600">3 Urgent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-amber-50 hover:border-amber-200 transition-all shadow-sm group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform">
                <Wrench size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Pending Orders</p>
                <p className="text-2xl font-extrabold text-amber-600">8 Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-emerald-50 hover:border-emerald-200 transition-all shadow-sm group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Regular Service</p>
                <p className="text-2xl font-extrabold text-emerald-600">12 Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader title="Work Orders" subtitle="Detailed list of current and past maintenance tasks." />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Equipment</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issue</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigned Technician</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Service</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_WORK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{order.equipment}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{order.issue}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-500">
                          {order.assigned.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-semibold text-slate-700">{order.assigned}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                        order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                        order.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-500">{order.lastService}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <Button variant="secondary" className="h-8 px-4 text-xs font-bold" onClick={() => handleManageOrder(order)}>Manage</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <Modal isOpen={activeModal === 'equipment'} onClose={() => setActiveModal(null)} title="Equipment Health Status">
        <div className="space-y-4">
          {MOCK_EQUIPMENT.map((eq) => (
            <div key={eq.name} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-800">{eq.name}</span>
                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  eq.status === 'Operational' ? 'bg-emerald-50 text-emerald-600' : 
                  eq.status === 'Warning' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                }`}>{eq.status}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase">
                  <span>Health</span>
                  <span>{eq.health}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${
                    eq.health > 70 ? 'bg-emerald-500' : 
                    eq.health > 40 ? 'bg-amber-500' : 'bg-red-500'
                  }`} style={{ width: `${eq.health}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'create'} onClose={() => setActiveModal(null)} title="Create Maintenance Work Order">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Equipment</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium">
              {MOCK_EQUIPMENT.map(eq => <option key={eq.name}>{eq.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Issue / Problem</label>
            <input type="text" placeholder="e.g. Excessive noise from motor" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Priority</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium">
                <option>Low</option>
                <option>Normal</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Assign To</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium">
                <option>Sam Technic</option>
                <option>Will Fixit</option>
                <option>Alex Wright</option>
                <option>Jane Door</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Description</label>
            <textarea rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Add more details..."></textarea>
          </div>
          <Button variant="primary" className="w-full py-2.5 font-bold" type="submit">Publish Work Order</Button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'manage'} onClose={() => setActiveModal(null)} title="Manage Work Order">
        {selectedOrder && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800">{selectedOrder.equipment}</h3>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">ID: WO-00{selectedOrder.id}</p>
              </div>
              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-full ${
                selectedOrder.priority === 'Critical' ? 'bg-red-600 text-white' : 
                selectedOrder.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
              }`}>{selectedOrder.priority} Priority</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={14} className="text-amber-600" />
                  <span className="text-[10px] font-bold text-amber-800 uppercase">Issue Reported</span>
                </div>
                <p className="text-sm font-bold text-slate-700">{selectedOrder.issue}</p>
                <p className="text-xs text-slate-500 mt-1 italic">"{selectedOrder.description}"</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Assigned To</p>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">{selectedOrder.assigned}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Last Service</p>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">{selectedOrder.lastService}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                  <Settings size={14} /> Update Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Pending', 'In Progress', 'Completed'].map(status => (
                    <button 
                      key={status} 
                      onClick={() => setActiveModal(null)}
                      className={`py-2 rounded-lg text-[10px] font-bold border transition-all ${
                        selectedOrder.status === status ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1 font-bold h-10" onClick={() => setActiveModal(null)}>Cancel</Button>
              <Button variant="primary" className="flex-1 font-bold h-10" onClick={() => setActiveModal(null)}>Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
