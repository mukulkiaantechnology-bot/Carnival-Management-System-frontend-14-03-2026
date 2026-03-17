import { useState, useEffect, useRef } from 'react';
import { Plus, Search, MoreVertical, Filter, X, Eye, Pencil, Trash2, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const INITIAL_WORK_ORDERS = [
  { id: 'WO-2024-001', equipment: 'Ferris Wheel', issue: 'Motor Vibration', technician: 'John Doe', priority: 'High', status: 'In Progress', createdAt: '2024-03-14 09:30 AM' },
  { id: 'WO-2024-002', equipment: 'Bumper Cars', issue: 'Electrical Short', technician: 'Mike Smith', priority: 'Medium', status: 'Pending', createdAt: '2024-03-14 10:15 AM' },
  { id: 'WO-2024-003', equipment: 'Roller Coaster', issue: 'Track Lubrication', technician: 'Sarah Wilson', priority: 'Low', status: 'Completed', createdAt: '2024-03-13 02:45 PM' },
  { id: 'WO-2024-004', equipment: 'Carousel', issue: 'Lighting Failure', technician: 'John Doe', priority: 'Medium', status: 'In Progress', createdAt: '2024-03-14 11:30 AM' },
  { id: 'WO-2024-005', equipment: 'Tilt-A-Whirl', issue: 'Hydraulic Leak', technician: 'Mike Smith', priority: 'Emergency', status: 'Open', createdAt: '2024-03-14 01:20 PM' },
];

const STATUSES = ['All Status', 'Open', 'Pending', 'In Progress', 'Completed'];
const PRIORITIES = ['All Priority', 'Low', 'Medium', 'High', 'Emergency'];

function ActionMenu({ order, onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((v) => !v)} className="p-2.5 rounded-xl text-slate-400 hover:bg-brand-red/5 hover:text-brand-red transition-all cursor-pointer active:scale-95">
        <MoreVertical size={18} strokeWidth={2.5} />
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-50 w-44 bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <button onClick={() => { setOpen(false); onView(order); }} className="w-full flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 hover:bg-brand-gold/5 hover:text-brand-text transition-colors cursor-pointer">
            <Eye size={15} className="text-brand-gold" strokeWidth={3} /> View
          </button>
          <button onClick={() => { setOpen(false); onEdit(order); }} className="w-full flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 hover:bg-brand-red/5 hover:text-brand-red transition-colors cursor-pointer">
            <Pencil size={15} className="text-brand-red" strokeWidth={3} /> Edit
          </button>
          <div className="border-t border-slate-50" />
          <button onClick={() => { setOpen(false); onDelete(order); }} className="w-full flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
            <Trash2 size={15} strokeWidth={3} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

const BADGE = (status) => {
  if (status === 'Completed') return 'bg-brand-red/5 text-brand-red ring-brand-red/20';
  if (status === 'In Progress') return 'bg-brand-gold/10 text-brand-text ring-brand-gold/30';
  if (status === 'Pending') return 'bg-brand-orange/10 text-brand-orange ring-brand-orange/20';
  return 'bg-slate-50 text-slate-400 ring-slate-200';
};

const inputCls = "w-full px-5 py-3.5 border border-brand-red/10 bg-slate-50 rounded-xl focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none font-bold text-slate-800 transition-all";

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);
  const [formData, setFormData] = useState({ equipment: '', issue: '', technician: '', priority: 'Medium', status: 'Open' });
  const [editData, setEditData] = useState({});

  const filterRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('carnival_work_orders');
    if (saved) setWorkOrders(JSON.parse(saved));
    else { setWorkOrders(INITIAL_WORK_ORDERS); localStorage.setItem('carnival_work_orders', JSON.stringify(INITIAL_WORK_ORDERS)); }
  }, []);

  const save = (updated) => { setWorkOrders(updated); localStorage.setItem('carnival_work_orders', JSON.stringify(updated)); };

  /* ── Derived filtered list ── */
  const q = search.toLowerCase().trim();
  const filtered = workOrders.filter(o => {
    const matchSearch = !q || [o.id, o.equipment, o.issue, o.technician].some(v => v.toLowerCase().includes(q));
    const matchStatus = statusFilter === 'All Status' || o.status === statusFilter;
    const matchPriority = priorityFilter === 'All Priority' || o.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const hasActiveFilters = statusFilter !== 'All Status' || priorityFilter !== 'All Priority';

  const clearFilters = () => { setStatusFilter('All Status'); setPriorityFilter('All Priority'); };

  /* ── CRUD handlers ── */
  const handleCreate = (e) => {
    e.preventDefault();
    const newOrder = { ...formData, id: `WO-${new Date().getFullYear()}-${String(workOrders.length + 1).padStart(3, '0')}`, createdAt: new Date().toLocaleString() };
    save([newOrder, ...workOrders]);
    setIsModalOpen(false);
    setFormData({ equipment: '', issue: '', technician: '', priority: 'Medium', status: 'Open' });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    save(workOrders.map(o => o.id === editData.id ? { ...editData } : o));
    setEditOrder(null);
  };
  const handleDelete = () => { save(workOrders.filter(o => o.id !== deleteOrder.id)); setDeleteOrder(null); };
  const openEdit = (order) => { setEditData({ ...order }); setEditOrder(order); };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-black text-brand-red tracking-tight italic uppercase flex items-center gap-3">Work Orders</h1>
        <Button onClick={() => setIsModalOpen(true)} className="bg-brand-gold hover:bg-brand-gold-dark text-brand-text flex items-center justify-center gap-2 w-full sm:w-auto text-[10px] font-black uppercase tracking-[0.2em] py-4 px-10 rounded-2xl shadow-2xl shadow-brand-gold/20 active:scale-95 transition-all">
          <Plus size={20} strokeWidth={3} /> Create Order
        </Button>
      </div>

      {/* Search + Filter Bar */}
      <Card className="p-3 sm:p-4 border-none shadow-sm bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-red transition-colors" size={18} strokeWidth={2.5} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, equipment, issue, technician..."
              className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-brand-red/10 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red text-xs sm:text-sm transition-all font-bold placeholder:italic"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand-red transition-colors cursor-pointer">
                <X size={16} strokeWidth={3} />
              </button>
            )}
          </div>

          {/* Filter Button + Dropdown */}
          <div className="relative flex gap-2" ref={filterRef}>
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={`flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] py-3.5 px-6 rounded-xl border transition-all shadow-sm active:scale-95 cursor-pointer ${
                filterOpen || hasActiveFilters
                  ? 'bg-brand-red text-white border-brand-red shadow-brand-red/20'
                  : 'border-brand-red/10 text-brand-red hover:bg-brand-red/5 bg-white'
              }`}
            >
              <SlidersHorizontal size={17} strokeWidth={2.5} />
              Filters {hasActiveFilters && <span className="bg-white/30 text-xs rounded-full w-4 h-4 flex items-center justify-center font-black">{(statusFilter !== 'All Status' ? 1 : 0) + (priorityFilter !== 'All Priority' ? 1 : 0)}</span>}
            </button>

            {/* Filter Dropdown Panel */}
            {filterOpen && (
              <div className="absolute right-0 top-14 z-50 w-72 bg-white rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-50 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-brand-red uppercase tracking-[0.3em] italic">Filter Orders</p>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-brand-red transition-colors cursor-pointer">Clear All</button>
                  )}
                </div>

                {/* Status filter */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {STATUSES.map(s => (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`py-2 px-3 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] border transition-all cursor-pointer ${
                          statusFilter === s
                            ? 'bg-brand-red text-white border-brand-red shadow-md shadow-brand-red/20'
                            : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-brand-red/20 hover:text-brand-red'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority filter */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Priority</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRIORITIES.map(p => (
                      <button
                        key={p}
                        onClick={() => setPriorityFilter(p)}
                        className={`py-2 px-3 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] border transition-all cursor-pointer ${
                          priorityFilter === p
                            ? 'bg-brand-gold text-brand-text border-brand-gold shadow-md shadow-brand-gold/20'
                            : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-brand-gold/30 hover:text-brand-text'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => setFilterOpen(false)} className="w-full py-3 bg-brand-red text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] shadow-xl shadow-brand-red/20 active:scale-95 transition-all cursor-pointer">
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-50">
            {statusFilter !== 'All Status' && (
              <span className="flex items-center gap-2 px-4 py-1.5 bg-brand-red/5 text-brand-red rounded-full text-[9px] font-black uppercase tracking-widest border border-brand-red/10">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter('All Status')} className="hover:scale-125 transition-transform cursor-pointer"><X size={10} strokeWidth={3} /></button>
              </span>
            )}
            {priorityFilter !== 'All Priority' && (
              <span className="flex items-center gap-2 px-4 py-1.5 bg-brand-gold/10 text-brand-text rounded-full text-[9px] font-black uppercase tracking-widest border border-brand-gold/20">
                Priority: {priorityFilter}
                <button onClick={() => setPriorityFilter('All Priority')} className="hover:scale-125 transition-transform cursor-pointer"><X size={10} strokeWidth={3} /></button>
              </span>
            )}
          </div>
        )}
      </Card>

      {/* Result count */}
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
        {filtered.length} {filtered.length === 1 ? 'Record' : 'Records'} Found
        {(search || hasActiveFilters) && ` · Filtered from ${workOrders.length}`}
      </p>

      {/* Desktop Table */}
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
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No work orders found</p>
                      <p className="text-xs text-slate-300 font-bold mt-1 italic">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group text-slate-600">
                      <td className="px-6 py-5 font-black text-brand-red italic text-xs tracking-tighter whitespace-nowrap">{order.id}</td>
                      <td className="px-6 py-4 text-slate-700 font-medium whitespace-nowrap">{order.equipment}</td>
                      <td className="px-6 py-4 truncate">{order.issue}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.technician}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] shadow-sm ring-1 ring-inset ${BADGE(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ActionMenu order={order} onView={setViewOrder} onEdit={openEdit} onDelete={setDeleteOrder} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Mobile Card List */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No work orders found</p>
            <p className="text-xs text-slate-300 font-bold mt-1 italic">Try adjusting your search or filters</p>
          </div>
        ) : (
          filtered.map((order) => (
            <Card key={order.id} className="p-4 border-none shadow-sm space-y-4 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <span className="text-xs font-black text-brand-red italic tracking-tight">{order.id}</span>
                <span className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-sm ring-1 ring-inset ${BADGE(order.status)}`}>{order.status}</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">{order.equipment}</h4>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{order.issue}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-red/5 border border-brand-red/10 flex items-center justify-center text-[12px] font-black text-brand-red uppercase shadow-sm">
                    {order.technician.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-700 font-bold">{order.technician}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{order.createdAt.split(' ')[0]}</span>
                  </div>
                </div>
                <ActionMenu order={order} onView={setViewOrder} onEdit={openEdit} onDelete={setDeleteOrder} />
              </div>
            </Card>
          ))
        )}
      </div>

      {/* ── CREATE MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg animate-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-2xl font-black text-brand-red uppercase tracking-tighter italic">Create Work Order</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"><X size={24} /></button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Equipment Name</label>
                <input required type="text" value={formData.equipment} onChange={(e) => setFormData({ ...formData, equipment: e.target.value })} className={inputCls} placeholder="e.g. FERRIS WHEEL" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Issue Description</label>
                <textarea required value={formData.issue} onChange={(e) => setFormData({ ...formData, issue: e.target.value })} className={`${inputCls} h-28 resize-none`} placeholder="Describe the issue in detail..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Technician</label>
                  <input required type="text" value={formData.technician} onChange={(e) => setFormData({ ...formData, technician: e.target.value })} className={inputCls} placeholder="Technician name" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Priority</label>
                  <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className={`${inputCls} cursor-pointer`}>
                    <option>Low</option><option>Medium</option><option>High</option><option>Emergency</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" className="flex-1 h-14 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all border-slate-100 cursor-pointer" onClick={() => setIsModalOpen(false)}>Discard</Button>
                <Button type="submit" className="flex-1 bg-brand-gold text-brand-text h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-gold/20 active:scale-95 transition-all cursor-pointer">Generate Order</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ── VIEW MODAL ── */}
      {viewOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg animate-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] mb-1">{viewOrder.id}</p>
                <h3 className="text-2xl font-black text-brand-red uppercase tracking-tighter italic">{viewOrder.equipment}</h3>
              </div>
              <button onClick={() => setViewOrder(null)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                {[['Technician', viewOrder.technician], ['Priority', viewOrder.priority], ['Status', viewOrder.status], ['Created', viewOrder.createdAt]].map(([label, value]) => (
                  <div key={label} className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{label}</p>
                    <p className="text-sm font-black text-slate-800">{value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Issue Description</p>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">{viewOrder.issue}</p>
              </div>
              <button onClick={() => setViewOrder(null)} className="w-full h-14 bg-brand-red text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-red/20 active:scale-95 transition-all cursor-pointer">Close</button>
            </div>
          </Card>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg animate-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] mb-1">{editData.id}</p>
                <h3 className="text-2xl font-black text-brand-red uppercase tracking-tighter italic">Edit Order</h3>
              </div>
              <button onClick={() => setEditOrder(null)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"><X size={24} /></button>
            </div>
            <form onSubmit={handleEdit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Equipment Name</label>
                <input required type="text" value={editData.equipment} onChange={(e) => setEditData({ ...editData, equipment: e.target.value })} className={inputCls} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Issue Description</label>
                <textarea required value={editData.issue} onChange={(e) => setEditData({ ...editData, issue: e.target.value })} className={`${inputCls} h-28 resize-none`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Technician</label>
                  <input required type="text" value={editData.technician} onChange={(e) => setEditData({ ...editData, technician: e.target.value })} className={inputCls} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Status</label>
                  <select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} className={`${inputCls} cursor-pointer`}>
                    <option>Open</option><option>Pending</option><option>In Progress</option><option>Completed</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Priority</label>
                <select value={editData.priority} onChange={(e) => setEditData({ ...editData, priority: e.target.value })} className={`${inputCls} cursor-pointer`}>
                  <option>Low</option><option>Medium</option><option>High</option><option>Emergency</option>
                </select>
              </div>
              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" className="flex-1 h-14 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all border-slate-100 cursor-pointer" onClick={() => setEditOrder(null)}>Cancel</Button>
                <Button type="submit" className="flex-1 bg-brand-gold text-brand-text h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-gold/20 active:scale-95 transition-all cursor-pointer">Save Changes</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm animate-in zoom-in duration-200">
            <div className="p-8 text-center space-y-5">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                <Trash2 size={28} className="text-red-500" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Delete Order?</h3>
                <p className="text-sm text-slate-500 font-bold mt-2 italic">This action cannot be undone.</p>
                <p className="text-xs font-black text-brand-red mt-1">{deleteOrder.id} — {deleteOrder.equipment}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDeleteOrder(null)} className="flex-1 h-12 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all cursor-pointer border border-slate-100">Cancel</button>
                <button onClick={handleDelete} className="flex-1 h-12 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-red-200 active:scale-95 transition-all cursor-pointer">Confirm Delete</button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
