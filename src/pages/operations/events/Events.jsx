import { useState } from 'react';
import { Calendar, MapPin, Plus, X, Eye, Pencil, Trash2, Search, ChevronDown, Clock, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

const INITIAL_EVENTS = [
  { id: 'EVT-001', name: 'Summer Carnival Kickoff', location: 'Main Arena', startDate: '2026-07-04', endDate: '2026-07-06', status: 'upcoming', staff: 'James Carter (Lead), 12 others', desc: 'Opening ceremony and parade.' },
  { id: 'EVT-002', name: 'Kids Fun Day', location: 'Zone C – Family Area', startDate: '2026-07-07', endDate: '2026-07-07', status: 'upcoming', staff: 'Maria Lopez, 5 others', desc: 'Magic shows and face painting.' },
  { id: 'EVT-003', name: 'Night Lights Festival', location: 'Central Stage', startDate: '2026-06-21', endDate: '2026-06-23', status: 'ongoing', staff: 'David Kim, 20 others', desc: 'LED show and night food walk.' },
];

const STATUS_BADGE = {
  upcoming: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
  ongoing: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  completed: 'bg-slate-50 text-slate-500 ring-1 ring-slate-100',
};

export default function Events() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({ name: '', location: '', startDate: '', endDate: '', desc: '', status: 'upcoming' });

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setForm({ name: '', location: '', startDate: '', endDate: '', desc: '', status: 'upcoming' });
  };

  const handleEdit = (ev) => {
    setEditingEvent(ev);
    setForm({
      name: ev.name,
      location: ev.location,
      startDate: ev.startDate,
      endDate: ev.endDate,
      desc: ev.desc,
      status: ev.status
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingEvent) {
      setEvents(events.map(ev => ev.id === editingEvent.id ? { ...ev, ...form } : ev));
    } else {
      const newEvt = { ...form, id: `EVT-00${events.length + 1}`, staff: 'Unassigned' };
      setEvents([newEvt, ...events]);
    }
    closeModal();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="text-indigo-500" size={24} /> Events
          </h1>
          <p className="text-sm text-slate-500">Plan and track all scheduled activities.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold shadow-sm">
          <Plus size={18} /> Create Event
        </button>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader title="Events Management" subtitle="Manage upcoming and active schedules" />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] font-bold text-slate-400">
                  <th className="text-left px-5 py-3">Event Name</th>
                  <th className="text-left px-5 py-3">Location</th>
                  <th className="text-left px-5 py-3 text-center">Start Date</th>
                  <th className="text-left px-5 py-3 text-center">End Date</th>
                  <th className="text-left px-5 py-3 text-center">Status</th>
                  <th className="text-left px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-800">{ev.name}</td>
                    <td className="px-5 py-4 flex items-center gap-1.5"><MapPin size={13} className="text-slate-400" /> {ev.location}</td>
                    <td className="px-5 py-4 text-center whitespace-nowrap">{ev.startDate}</td>
                    <td className="px-5 py-4 text-center whitespace-nowrap">{ev.endDate}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_BADGE[ev.status]}`}>
                        {ev.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button 
                        onClick={() => handleEdit(ev)}
                        className="p-1 px-2 text-indigo-600 hover:bg-indigo-50 rounded-md text-xs font-bold transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Event Cards Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Event Details View</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((ev) => (
            <div key={ev.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4 hover:shadow-md transition-shadow group">
               <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Calendar size={20} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${STATUS_BADGE[ev.status]}`}>{ev.status}</span>
               </div>
               <div>
                  <h3 className="font-bold text-slate-800 text-base">{ev.name}</h3>
                  <p className="text-slate-500 text-xs mt-1 flex items-center gap-1.5"><MapPin size={12} /> {ev.location}</p>
               </div>
               <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                    <span>DATES</span>
                    <span className="text-slate-600">{ev.startDate} – {ev.endDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                    <span className="flex items-center gap-1"><Users size={12} /> STAFF</span>
                    <span className="text-slate-600">{ev.staff}</span>
                  </div>
               </div>
               <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed italic">"{ev.desc}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
               <h2 className="font-bold text-slate-800 text-lg">{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
               <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Event Name</label>
                <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none" placeholder="e.g. Grand Parade" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Location</label>
                  <input value={form.location} onChange={e=>setForm({...form, location: e.target.value})} type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none" placeholder="e.g. Arena B" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Status</label>
                  <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none">
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Start Date</label>
                  <input value={form.startDate} onChange={e=>setForm({...form, startDate: e.target.value})} type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">End Date</label>
                  <input value={form.endDate} onChange={e=>setForm({...form, endDate: e.target.value})} type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                <textarea value={form.desc} onChange={e=>setForm({...form, desc: e.target.value})} rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none resize-none" placeholder="Event details..." />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
               <button onClick={closeModal} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
               <button onClick={handleSave} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm">
                 {editingEvent ? 'Update Event' : 'Save & Launch'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
