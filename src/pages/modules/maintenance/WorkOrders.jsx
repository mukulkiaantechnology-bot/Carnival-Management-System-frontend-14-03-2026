import { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Filter, X } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const INITIAL_WORK_ORDERS = [
  { id: 'WO-2024-001', equipment: 'Ferris Wheel', issue: 'Motor Vibration', technician: 'John Doe', priority: 'High', status: 'In Progress', createdAt: '2024-03-14 09:30 AM' },
  { id: 'WO-2024-002', equipment: 'Bumper Cars', issue: 'Electrical Short', technician: 'Mike Smith', priority: 'Medium', status: 'Pending', createdAt: '2024-03-14 10:15 AM' },
  { id: 'WO-2024-003', equipment: 'Roller Coaster', issue: 'Track Lubrication', technician: 'Sarah Wilson', priority: 'Low', status: 'Completed', createdAt: '2024-03-13 02:45 PM' },
  { id: 'WO-2024-004', equipment: 'Carousel', issue: 'Lighting Failure', technician: 'John Doe', priority: 'Medium', status: 'In Progress', createdAt: '2024-03-14 11:30 AM' },
  { id: 'WO-2024-005', equipment: 'Tilt-A-Whirl', issue: 'Hydraulic Leak', technician: 'Mike Smith', priority: 'Emergency', status: 'Open', createdAt: '2024-03-14 01:20 PM' },
];

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    equipment: '',
    issue: '',
    technician: '',
    priority: 'Medium',
    status: 'Open'
  });

  useEffect(() => {
    const savedOrders = localStorage.getItem('carnival_work_orders');
    if (savedOrders) {
      setWorkOrders(JSON.parse(savedOrders));
    } else {
      setWorkOrders(INITIAL_WORK_ORDERS);
      localStorage.setItem('carnival_work_orders', JSON.stringify(INITIAL_WORK_ORDERS));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      ...formData,
      id: `WO-${new Date().getFullYear()}-${String(workOrders.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toLocaleString(),
    };
    
    const updatedOrders = [newOrder, ...workOrders];
    setWorkOrders(updatedOrders);
    localStorage.setItem('carnival_work_orders', JSON.stringify(updatedOrders));
    setIsModalOpen(false);
    setFormData({ equipment: '', issue: '', technician: '', priority: 'Medium', status: 'Open' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Work Orders</h1>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 w-full sm:w-auto text-sm py-2.5 shadow-md shadow-blue-500/20"
        >
          <Plus size={18} />
          Create Order
        </Button>
      </div>

      <Card className="p-3 sm:p-4 border-none shadow-sm bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs sm:text-sm transition-all"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
              <Filter size={16} />
              Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Desktop Table (Visible on MD+) */}
      <Card className="hidden md:block border-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-slate-100 table-fixed sm:table-auto">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-44">Equipment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-64 sm:w-auto">Issue</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-40">Technician</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider w-20">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 text-sm">
                {workOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group text-slate-600">
                    <td className="px-6 py-4 font-bold text-blue-600 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium whitespace-nowrap">{order.equipment}</td>
                    <td className="px-6 py-4 truncate">{order.issue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.technician}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 group-hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Mobile Card List (Visible below MD) */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {workOrders.map((order) => (
          <Card key={order.id} className="p-4 border-none shadow-sm space-y-4 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-tight">{order.id}</span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                order.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">{order.equipment}</h4>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{order.issue}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[11px] font-bold text-blue-600 uppercase">
                  {order.technician.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-700 font-bold">{order.technician}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{order.createdAt.split(' ')[0]}</span>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </Card>
        ))}
      </div>


      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Create Work Order</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Equipment Name</label>
                <input
                  required
                  type="text"
                  value={formData.equipment}
                  onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  placeholder="e.g. Ferris Wheel"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Issue Description</label>
                <textarea
                  required
                  value={formData.issue}
                  onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none h-24 resize-none"
                  placeholder="Describe the issue..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Technician</label>
                  <input
                    required
                    type="text"
                    value={formData.technician}
                    onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="Technician name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Emergency</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-10 sm:h-12 text-xs sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-blue-600 text-white hover:bg-blue-700 h-10 sm:h-12 text-xs sm:text-sm shadow-md shadow-blue-500/20 font-bold">
                  Save Work Order
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
