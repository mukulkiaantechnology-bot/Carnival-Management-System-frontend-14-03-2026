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
          <h1 className="text-xl sm:text-2xl font-black text-brand-red flex items-center gap-3 italic uppercase tracking-tight">
            <Store className="text-brand-red" size={26} /> Manage Counters
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-bold">Control and monitor all ticket boxes.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-text rounded-2xl transition-all font-black shadow-2xl shadow-brand-gold/20 active:scale-95 text-[10px] uppercase tracking-[0.2em] cursor-pointer"
        >
          <Plus size={20} strokeWidth={3} /> Add Box
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 sm:px-0">
          <h2 className="text-lg font-black text-brand-red uppercase tracking-tighter italic">Active Counters Registry</h2>
          <button className="p-2.5 bg-white text-brand-red border border-brand-red/10 hover:bg-brand-red hover:text-white rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer">
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
                          className={`inline-flex items-center gap-2 px-4 py-1.5 ring-1 ring-inset rounded-full text-[9px] font-black uppercase transition-all shadow-sm cursor-pointer ${box.status === 'Open' ? 'bg-brand-gold/10 text-brand-text ring-brand-gold/30' : 'bg-slate-50 text-slate-400 ring-slate-200'
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
                    className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] ring-1 ring-inset shadow-sm cursor-pointer ${box.status === 'Open' ? 'bg-brand-gold/10 text-brand-text ring-brand-gold/30' : 'bg-slate-50 text-slate-400 ring-slate-200'}`}
                  >
                    {box.status}
                  </button>
                </div>
                
                <h3 className="font-black text-brand-red text-lg tracking-tight mb-1 group-hover:text-brand-orange transition-colors">{box.name}</h3>
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
                <div className="p-5 rounded-[1.5rem] bg-brand-red/5 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all shadow-2xl shadow-brand-red/10">
                  <Store size={26} strokeWidth={2.5} />
                </div>
                <div className={`text-[10px] font-black uppercase tracking-[2px] px-4 py-2 rounded-xl shadow-sm ${box.status === 'Open' ? 'bg-brand-gold text-brand-text' : 'bg-slate-100 text-slate-400'
                  }`}>
                  {box.status}
                </div>
              </div>

              <h3 className="font-black text-brand-red text-lg group-hover:text-brand-orange transition-colors uppercase truncate">{box.name}</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{box.location}</p>

              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Sales</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tighter">{box.sales}</p>
                </div>
                <button 
                  onClick={() => navigate(`/tickets/boxes/${box.id}`)}
                  className="w-12 h-12 rounded-[1.2rem] bg-brand-red/5 flex items-center justify-center text-brand-red hover:bg-brand-red hover:text-white transition-all shadow-xl hover:shadow-brand-red/20 active:scale-90 cursor-pointer border border-brand-red/10"
                >
                  <ArrowRight size={26} strokeWidth={3} />
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
              <div className="pt-10 flex gap-4">
                <button onClick={() => setShowModal(false)} className="flex-1 h-16 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all border border-slate-100 cursor-pointer">
                  Discard
                </button>
                <button
                  onClick={handleAddBox}
                  className="flex-1 h-16 bg-brand-red text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-red-dark transition-all shadow-2xl shadow-brand-red/20 active:scale-95 disabled:opacity-50 cursor-pointer"
                  disabled={!newBox.name || !newBox.location}
                >
                  Create Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
