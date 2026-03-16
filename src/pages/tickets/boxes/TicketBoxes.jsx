import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  Plus,
  MapPin,
  User,
  Eye,
  Pencil,
  X,
  Circle,
  ArrowRight,
  TrendingUp,
  Download,
  CheckCircle,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

const INITIAL_BOXES = [
  { id: 'BOX-001', name: 'Main Entrance Box A', location: 'North Gate', staff: 'Robert Wilson', status: 'Open', sales: '$7,700' },
  { id: 'BOX-002', name: 'Main Entrance Box B', location: 'North Gate', staff: 'Linda White', status: 'Open', sales: '$4,200' },
  { id: 'BOX-003', name: 'Zone B Counter 1', location: 'Water Zone', staff: 'Michael Scott', status: 'Open', sales: '$5,350' },
  { id: 'BOX-004', name: 'Zone B Counter 2', location: 'Water Zone', staff: 'Pam Beesly', status: 'Closed', sales: '$0.00' },
  { id: 'BOX-005', name: 'Parking Gate Box', location: 'East Parking', staff: 'Dwight Schrute', status: 'Open', sales: '$2,720' },
  { id: 'BOX-006', name: 'Kids Zone Kiosk', location: 'Zone C', staff: 'Angela Martin', status: 'Open', sales: '$3,550' },
];

export default function TicketBoxes() {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState(INITIAL_BOXES);
  const [showModal, setShowModal] = useState(false);
  const [newBox, setNewBox] = useState({ name: '', location: '', staff: '' });

  const handleAddBox = () => {
    if (!newBox.name || !newBox.location) return;
    const box = {
      id: `BOX-00${boxes.length + 1}`,
      name: newBox.name,
      location: newBox.location,
      staff: newBox.staff || 'Unassigned',
      status: 'Open',
      sales: '$0.00'
    };
    setBoxes([...boxes, box]);
    setShowModal(false);
    setNewBox({ name: '', location: '', staff: '' });
  };

  const deleteBox = (id) => {
    setBoxes(boxes.filter(b => b.id !== id));
  };

  const toggleStatus = (id) => {
    setBoxes(boxes.map(b => b.id === id ? { ...b, status: b.status === 'Open' ? 'Closed' : 'Open' } : b));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-3">
            <Store className="text-blue-600" size={24} /> Manage Counters
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Control and monitor all ticket boxes.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all font-black shadow-xl shadow-blue-100 active:scale-95 text-xs uppercase tracking-widest"
        >
          <Plus size={20} /> Add Box
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 sm:px-0">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Active Counters Registry</h2>
          <button className="p-2 sm:p-2.5 bg-slate-100 text-slate-400 hover:text-blue-600 rounded-xl transition-all">
            <Download size={20} />
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block">
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 uppercase text-[10px] font-black text-slate-400 tracking-widest leading-none">
                    <th className="text-left px-6 py-4">ID</th>
                    <th className="text-left px-6 py-4">Box Name</th>
                    <th className="text-left px-6 py-4">Staff</th>
                    <th className="text-center px-4 py-4">Status</th>
                    <th className="text-right px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-bold">
                  {boxes.map((box) => (
                    <tr key={box.id} className="hover:bg-slate-50/30 transition-all group">
                      <td className="px-6 py-5 font-mono text-[10px] font-black text-slate-400 uppercase">{box.id}</td>
                      <td className="px-6 py-5">
                        <p className="text-slate-800 tracking-tight whitespace-nowrap">{box.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{box.location}</p>
                      </td>
                      <td className="px-6 py-5 text-slate-700 whitespace-nowrap">{box.staff}</td>
                      <td className="px-4 py-5 text-center">
                        <button
                          onClick={() => toggleStatus(box.id)}
                          className={`inline-flex items-center gap-2 px-3 py-1 ring-1 ring-inset rounded-full text-[9px] font-black uppercase transition-all ${box.status === 'Open' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-slate-50 text-slate-400 ring-slate-200'
                            }`}>
                          <Circle size={8} fill="currentColor" className={box.status === 'Open' ? 'animate-pulse' : ''} />
                          {box.status}
                        </button>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => deleteBox(box.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
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
          {boxes.map((box) => (
            <Card key={box.id} className="border-none shadow-lg shadow-slate-200/50 rounded-[2.5rem] overflow-hidden group active:scale-[0.98] transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-black text-slate-400 uppercase tracking-tighter">{box.id}</span>
                  <button
                    onClick={() => toggleStatus(box.id)}
                    className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ring-1 ring-inset ${box.status === 'Open' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-slate-50 text-slate-400 ring-slate-200'}`}
                  >
                    {box.status}
                  </button>
                </div>
                
                <h3 className="font-black text-slate-800 text-lg tracking-tight mb-1 group-hover:text-blue-600 transition-colors">{box.name}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{box.location}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                      <User size={12} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{box.staff}</span>
                  </div>
                  <button onClick={() => deleteBox(box.id)} className="p-2 text-slate-300 hover:text-rose-600 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map((box) => (
          <Card key={box.id} className="hover:shadow-2xl hover:-translate-y-1 transition-all group border-none shadow-xl shadow-slate-200/50">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg shadow-blue-50">
                  <Store size={24} />
                </div>
                <div className={`text-[10px] font-black uppercase tracking-[2px] px-3 py-1.5 rounded-full ${box.status === 'Open' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                  {box.status}
                </div>
              </div>

              <h3 className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors uppercase truncate">{box.name}</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{box.location}</p>

              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Sales</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tighter">{box.sales}</p>
                </div>
                <button 
                  onClick={() => navigate(`/tickets/boxes/${box.id}`)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-200 hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:shadow-blue-500/20 active:scale-90 cursor-pointer border-none"
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-10">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Create Box</h2>
              <button onClick={() => setShowModal(false)} className="p-3 text-slate-300 hover:text-slate-900 rounded-2xl transition-all">
                <X size={28} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-2 block mb-2">Display Name</label>
                <input
                  type="text"
                  value={newBox.name}
                  onChange={(e) => setNewBox({ ...newBox, name: e.target.value })}
                  className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-base font-black text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all"
                  placeholder="SOUTH GATE BOX"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-2 block mb-2">Location</label>
                <input
                  type="text"
                  value={newBox.location}
                  onChange={(e) => setNewBox({ ...newBox, location: e.target.value })}
                  className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all"
                  placeholder="ZONE A"
                />
              </div>
              <div className="pt-8 flex gap-4">
                <button onClick={() => setShowModal(false)} className="flex-1 h-16 bg-slate-50 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-[3px] hover:bg-slate-100 transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleAddBox}
                  className="flex-1 h-16 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-[3px] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-95 disabled:opacity-50"
                  disabled={!newBox.name || !newBox.location}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
