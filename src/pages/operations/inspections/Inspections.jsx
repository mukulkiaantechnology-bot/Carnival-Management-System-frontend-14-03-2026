import { useState, useRef } from 'react';
import {
  ClipboardCheck, CheckCircle, AlertTriangle, Clock, Search, X, Eye, Pencil, Plus, Upload, 
  ChevronDown, CalendarDays, FileText, User, Layers, StickyNote, Info
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

const INITIAL_INSPECTIONS = [
  { id: 'INS-001', rideName: ' cyclone King', inspector: 'James Carter', status: 'passed', date: '2026-03-14', title: 'Daily Safety Routine', checklist: { seatBelts: true, emergencyStop: true, electrical: true, safetyBars: true }, notes: 'All clear.' },
  { id: 'INS-002', rideName: 'Wonder Wheel', inspector: 'Maria Lopez', status: 'pending', date: '2026-03-14', title: 'Bi-Weekly Audit', checklist: { seatBelts: true, emergencyStop: true, electrical: false, safetyBars: true }, notes: 'Check electrical Panel B.' },
  { id: 'INS-003', rideName: 'Splash Mountain', inspector: 'David Kim', status: 'failed', date: '2026-03-13', title: 'Pump Maintenance', checklist: { seatBelts: false, emergencyStop: true, electrical: true, safetyBars: false }, notes: 'Pump pressure too low.' },
];

const STATUS_CFG = {
  passed: { label: 'Passed', icon: CheckCircle, badge: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' },
  pending: { label: 'Pending', icon: Clock, badge: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' },
  failed: { label: 'Failed', icon: AlertTriangle, badge: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200' },
};

export default function Inspections() {
  const [inspections, setInspections] = useState(INITIAL_INSPECTIONS);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'view', 'edit'
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    title: '', rideName: '', inspector: '', date: '', notes: '',
    checklist: { seatBelts: false, emergencyStop: false, electrical: false, safetyBars: false }
  });

  const resetForm = () => setForm({
    title: '', rideName: '', inspector: '', date: '', notes: '',
    checklist: { seatBelts: false, emergencyStop: false, electrical: false, safetyBars: false }
  });

  const handleStart = () => {
    setModalMode('add');
    resetForm();
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      const newIns = { ...form, id: `INS-00${inspections.length + 1}`, status: 'pending' };
      setInspections([newIns, ...inspections]);
    } else if (modalMode === 'edit') {
      setInspections(inspections.map(i => i.id === selected.id ? { ...form, id: i.id, status: i.status } : i));
    }
    setShowModal(false);
  };

  const filtered = inspections.filter(i => 
    i.rideName.toLowerCase().includes(search.toLowerCase()) || 
    i.inspector.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ClipboardCheck className="text-amber-500" size={24} /> Inspections
          </h1>
          <p className="text-sm text-slate-500">Manage ride and equipment safety logs.</p>
        </div>
        <button onClick={handleStart} className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-semibold shadow-sm">
          <Plus size={18} /> Start Inspection
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ride or inspector..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-400/40 outline-none"
        />
      </div>

      <Card>
        <CardHeader title="Inspection Log" subtitle="Showing all recent records" />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] font-bold text-slate-400">
                  <th className="text-left px-5 py-3">Inspection ID</th>
                  <th className="text-left px-5 py-3">Ride Name</th>
                  <th className="text-left px-5 py-3">Inspector</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-left px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((item) => {
                  const cfg = STATUS_CFG[item.status];
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs">{item.id}</td>
                      <td className="px-5 py-4 font-semibold">{item.rideName}</td>
                      <td className="px-5 py-4">{item.inspector}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}>
                          <cfg.icon size={11} /> {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500">{item.date}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setSelected(item); setForm(item); setModalMode('view'); setShowModal(true); }}
                            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => { setSelected(item); setForm(item); setModalMode('edit'); setShowModal(true); }}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                          >
                            <Pencil size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800">
                {modalMode === 'add' ? 'Start New Inspection' : modalMode === 'edit' ? 'Edit Inspection' : 'View Inspection'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Inspection Title</label>
                  <input readOnly={modalMode === 'view'} value={form.title} onChange={e=>setForm({...form, title: e.target.value})} type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 disabled:opacity-60" placeholder="e.g. Daily Roller Coaster Log" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Ride / Equipment</label>
                  <input readOnly={modalMode === 'view'} value={form.rideName} onChange={e=>setForm({...form, rideName: e.target.value})} type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Inspector Name</label>
                  <input readOnly={modalMode === 'view'} value={form.inspector} onChange={e=>setForm({...form, inspector: e.target.value})} type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Inspection Date</label>
                  <input readOnly={modalMode === 'view'} value={form.date} onChange={e=>setForm({...form, date: e.target.value})} type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Safety Checklist</label>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {Object.keys(form.checklist).map(key => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        disabled={modalMode === 'view'}
                        type="checkbox" 
                        checked={form.checklist[key]} 
                        onChange={e => setForm({...form, checklist: {...form.checklist, [key]: e.target.checked}})}
                        className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-400" 
                      />
                      <span className="text-sm font-medium text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Notes</label>
                <textarea readOnly={modalMode === 'view'} value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})} rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 resize-none" placeholder="Add additional observations..." />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Upload Photos</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center group hover:border-amber-400 transition-colors cursor-pointer">
                  {modalMode === 'view' ? <div className="text-slate-400 text-xs italic">Read-only view</div> : <div className="flex flex-col items-center gap-1 text-slate-400"><Upload size={18} /> <span className="text-xs font-medium">Click to upload images</span></div>}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
               <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
               {modalMode !== 'view' && <button onClick={handleSave} className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-lg shadow-sm transition-all">
                 {modalMode === 'add' ? 'Create Log' : 'Save Changes'}
               </button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
