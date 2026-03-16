import { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Users, Plus, ChevronLeft, ChevronRight, List, X, LayoutGrid, CalendarDays, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_EVENTS = [
  { id: 1, name: 'Summer Carnival Opening', location: 'Main Plaza', start: '2026-06-01', end: '2026-06-05', staff: 45, description: 'Kickoff event for the summer season with live music and fireworks.' },
  { id: 2, name: 'Youth Talent Show', location: 'Theater Wing', start: '2026-06-10', end: '2026-06-12', staff: 12, description: 'Showcase of local talent from performers aged 12-18.' },
  { id: 3, name: 'Food & Wine Expo', location: 'South Pavillion', start: '2026-06-20', end: '2026-06-25', staff: 30, description: 'A culinary journey featuring local vendors and international wines.' },
  { id: 4, name: 'Charity Auction', location: 'Grand Hall', start: '2026-07-02', end: '2026-07-03', staff: 8, description: 'Silent and live auction to benefit the local children hospital.' },
  { id: 5, name: 'Independence Day Prep', location: 'Entire Grounds', start: '2026-07-01', end: '2026-07-04', staff: 25, description: 'Logistics and setup for the annual Independence Day parade and gala.' },
];

// Local Modal Component
function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-xl w-full ${maxWidth} animate-in zoom-in-95 duration-200 overflow-hidden`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
}

export default function Calendar() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [activeModal, setActiveModal] = useState(null); // 'add' or 'edit'
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    location: 'Main Plaza',
    start: '',
    end: '',
    staff: 0,
    description: ''
  });

  const openAddModal = () => {
    setFormData({ name: '', location: 'Main Plaza', start: '', end: '', staff: 0, description: '' });
    setActiveModal('add');
  };

  const openEditModal = (event) => {
    setFormData(event);
    setSelectedEvent(event);
    setActiveModal('edit');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (activeModal === 'add') {
      const newEvent = { ...formData, id: events.length + 1 };
      setEvents([newEvent, ...events]);
    } else {
      setEvents(events.map(e => (e.id === selectedEvent.id ? formData : e)));
    }
    setActiveModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Event Calendar</h1>
          <p className="text-slate-500 text-sm">Schedule and manage upcoming carnival events and activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            className="flex items-center gap-2"
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          >
            {viewMode === 'list' ? <LayoutGrid size={18} /> : <List size={18} />}
            {viewMode === 'list' ? 'Grid View' : 'List View'}
          </Button>
          <Button variant="primary" className="flex items-center gap-2" onClick={openAddModal}>
            <Plus size={18} />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 shadow-sm h-fit">
          <CardHeader title="June 2026" />
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <span key={d} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const hasEvent = [1, 5, 10, 20].includes(day);
                return (
                  <div 
                    key={i} 
                    className={`aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer transition-all ${
                      hasEvent 
                        ? 'bg-blue-600 text-white font-black shadow-lg shadow-blue-200 scale-105' 
                        : 'text-slate-600 font-semibold hover:bg-slate-50'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock size={12} /> Upcoming Next
              </h4>
              <div className="space-y-4">
                {[
                  { title: 'Ground Maintenance', time: '08:00 AM', status: 'In 2h' },
                  { title: 'Security Briefing', time: '10:30 AM', status: 'Today' },
                  { title: 'Vendor Kickoff', time: '02:00 PM', status: 'Today' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer hover:bg-slate-50 p-2 -m-2 rounded-xl transition-colors">
                    <div className="w-1 h-8 bg-blue-500 rounded-full group-hover:scale-y-110 transition-transform" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">{item.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{item.time}</p>
                        <span className="text-[10px] font-extrabold text-blue-500 uppercase">{item.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-sm">
          <CardHeader 
            title={viewMode === 'list' ? 'Event List' : 'Event Grid'} 
            subtitle="Comprehensive schedule of all planned events." 
          />
          <CardContent className={viewMode === 'list' ? 'p-0' : 'p-6'}>
            {viewMode === 'list' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Event Name</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dates</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacity</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {events.map((event) => (
                      <tr key={event.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{event.name}</p>
                          <p className="text-[10px] font-medium text-slate-400 max-w-[200px] truncate">{event.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                            <MapPin size={14} className="text-slate-300" />
                            {event.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5"><CalendarDays size={12} className="text-slate-400" /> {event.start}</p>
                            <p className="text-[10px] font-bold text-slate-400 pl-4.5">to {event.end}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tighter shadow-sm border border-blue-100">
                            {event.staff} Staff Assigned
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button 
                            variant="secondary" 
                            className="h-8 px-4 text-[10px] font-bold uppercase tracking-widest border-slate-200"
                            onClick={() => openEditModal(event)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map(event => (
                  <div key={event.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3">
                      <Button variant="secondary" className="h-7 w-7 !p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => openEditModal(event)}>
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                    <p className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest mb-1">{event.location}</p>
                    <h4 className="text-base font-bold text-slate-800 mb-2">{event.name}</h4>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 border-dashed">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                        <Users size={12} /> {event.staff} Personnel
                      </div>
                      <div className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">
                        {event.start.split('-')[1]}/{event.start.split('-')[2]} - {event.end.split('-')[1]}/{event.end.split('-')[2]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add / Edit Event Modal */}
      <Modal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        title={activeModal === 'add' ? 'Add New Event' : 'Edit Event Details'}
        maxWidth="max-w-xl"
      >
        <form className="space-y-4" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Event Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                placeholder="e.g. Annual Firework Show"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</label>
              <select 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 bg-white"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              >
                <option>Main Plaza</option>
                <option>Theater Wing</option>
                <option>South Pavillion</option>
                <option>Grand Hall</option>
                <option>Entire Grounds</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Staff needed</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none font-medium text-slate-700"
                value={formData.staff}
                onChange={e => setFormData({...formData, staff: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Start Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none font-medium text-slate-700"
                value={formData.start}
                onChange={e => setFormData({...formData, start: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">End Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none font-medium text-slate-700"
                value={formData.end}
                onChange={e => setFormData({...formData, end: e.target.value})}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Event Description</label>
              <textarea 
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none font-medium text-slate-700"
                placeholder="Details about the event activities..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" className="flex-1 font-bold py-3 uppercase tracking-widest text-[10px]" type="button" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button variant="primary" className="flex-1 font-bold py-3 uppercase tracking-widest text-[10px]" type="submit">
              {activeModal === 'add' ? 'Create Event' : 'Update Event'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
