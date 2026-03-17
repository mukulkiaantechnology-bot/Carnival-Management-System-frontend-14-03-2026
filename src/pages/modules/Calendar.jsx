import { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon, MapPin, Clock, Users, Plus, ChevronLeft,
  ChevronRight, List, X, LayoutGrid, CalendarDays, CheckCircle2,
  AlertCircle, ArrowUpRight, Search, Info, Trash2, Pencil
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_EVENTS = [
  { id: 1, name: 'Summer Carnival Opening', location: 'Main Plaza', start: '2026-06-01', end: '2026-06-05', staff: 45, description: 'Kickoff event for the summer season with live music and fireworks.' },
  { id: 2, name: 'Youth Talent Show', location: 'Theater Wing', start: '2026-06-10', end: '2026-06-12', staff: 12, description: 'Showcase of local talent from performers aged 12-18.' },
  { id: 3, name: 'Food & Wine Expo', location: 'South Pavillion', start: '2026-06-20', end: '2026-06-25', staff: 30, description: 'A culinary journey featuring local vendors and international wines.' },
  { id: 4, name: 'Charity Auction', location: 'Grand Hall', start: '2026-07-02', end: '2026-07-03', staff: 8, description: 'Silent and live auction to benefit the local children hospital.' },
  { id: 5, name: 'Independence Day Prep', location: 'Entire Grounds', start: '2026-07-01', end: '2026-07-04', staff: 25, description: 'Logistics and setup for the annual Independence Day parade and gala.' },
];

const UPCOMING_TIMELINE = [
  { title: 'Ground Maintenance', time: '08:00 AM', status: 'In 2h' },
  { title: 'Security Briefing', time: '10:30 AM', status: 'Today' },
  { title: 'Vendor Kickoff', time: '02:00 PM', status: 'Today' }
];

// Local Modal Component with Premium Styling
function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className={`bg-white rounded-[2rem] shadow-2xl w-full ${maxWidth} animate-in zoom-in-95 duration-300 overflow-hidden border border-white/20`}>
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto max-h-[75vh]">{children}</div>
      </div>
    </div>
  );
}

export default function Calendar() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [viewMode, setViewMode] = useState('list');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  // Month/Year State
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1)); // Default to June 2026

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    location: 'Main Plaza',
    start: '',
    end: '',
    staff: 0,
    description: ''
  });

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const openAddModal = () => {
    setFormData({ name: '', location: 'Main Plaza', start: '', end: '', staff: 0, description: '' });
    setActiveModal('add');
  };

  const openEditModal = (event, e) => {
    if (e) e.stopPropagation();
    setFormData(event);
    setSelectedEvent(event);
    setActiveModal('edit');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (activeModal === 'add') {
      const newEvent = { ...formData, id: Date.now() };
      setEvents([newEvent, ...events]);
      showNotification(`"${newEvent.name}" added to calendar.`);
    } else {
      setEvents(events.map(e => (e.id === selectedEvent.id ? formData : e)));
      showNotification(`"${formData.name}" updated successfully.`);
    }
    setActiveModal(null);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      setEvents(events.filter(e => e.id !== id));
      showNotification(`"${name}" removed from calendar.`);
    }
  };

  const filteredEvents = useMemo(() => {
    let result = events.filter(e =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedDay) {
      const formattedSelectedDate = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
      result = result.filter(e => {
        const start = e.start;
        const end = e.end;
        return formattedSelectedDate >= start && formattedSelectedDate <= end;
      });
    }

    return result;
  }, [events, searchTerm, selectedDay, viewDate]);

  // Calendar Helpers
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
  const monthName = viewDate.toLocaleString('default', { month: 'long' });
  const year = viewDate.getFullYear();

  const eventDays = events.map(e => {
    const startItems = e.start.split('-');
    const endItems = e.end.split('-');

    const startDate = new Date(parseInt(startItems[0]), parseInt(startItems[1]) - 1, parseInt(startItems[2]));
    const endDate = new Date(parseInt(endItems[0]), parseInt(endItems[1]) - 1, parseInt(endItems[2]));

    const arr = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      if (current.getFullYear() === viewDate.getFullYear() && current.getMonth() === viewDate.getMonth()) {
        arr.push(current.getDate());
      }
      current.setDate(current.getDate() + 1);
    }
    return arr;
  }).flat();

  return (
    <div className="space-y-8 px-1 pb-10 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-8 z-[110] animate-in slide-in-from-right duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 border border-white/10">
            <div className="bg-emerald-500/20 p-2 rounded-xl">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <span className="text-sm font-black tracking-tight">{notification}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Event Calendar</h1>
          <p className="text-slate-500 text-sm font-bold">Schedule and manage upcoming carnival events and activities.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search event schedule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-bold w-72 shadow-sm"
            />
          </div>
          <button
            className="flex-1 flex items-center justify-center gap-2 font-black h-10 sm:h-14 px-6 rounded-2xl shadow-xl shadow-brand-red/20 border-none bg-brand-red text-white text-[10px] sm:text-xs transition-all"
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          >
            {viewMode === 'list' ? <LayoutGrid size={18} strokeWidth={2.5} className="text-white" /> : <List size={18} strokeWidth={2.5} className="text-white" />}
            {viewMode === 'list' ? 'Grid' : 'List'}
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 font-black h-10 sm:h-14 px-6 rounded-2xl bg-brand-gold text-brand-text hover:bg-brand-gold-dark transition-all shadow-xl shadow-brand-gold/20 text-[10px] sm:text-xs"
            onClick={openAddModal}
          >
            <Plus size={18} strokeWidth={3} />
            Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Calendar Widget */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-2xl shadow-slate-200/50 border-none rounded-[2rem] overflow-hidden">
            <div className="p-8 bg-gradient-to-br from-brand-red to-brand-orange text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex items-center justify-between">
                <h3 className="text-2xl font-black tracking-tight">{monthName} {year}</h3>
                <div className="flex gap-1">
                  <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><ChevronLeft size={18} /></button>
                  <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-2 text-center mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                  <span key={d} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {/* Empty days before first day of month */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const hasEvent = eventDays.includes(day);
                  const isToday = day === new Date().getDate() && viewDate.getMonth() === new Date().getMonth() && viewDate.getFullYear() === new Date().getFullYear();
                  const isSelected = selectedDay === day;

                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDay(isSelected ? null : day)}
                      className={`aspect-square flex flex-col items-center justify-center text-xs rounded-[1rem] cursor-pointer transition-all relative group overflow-hidden ${isSelected
                        ? 'bg-slate-900 text-white font-black z-20 scale-110 shadow-xl'
                        : hasEvent
                          ? 'bg-brand-red text-white shadow-xl shadow-brand-red/10 scale-105 z-10'
                          : isToday
                            ? 'bg-brand-gold/10 text-brand-gold-dark font-black border border-brand-gold/20'
                            : 'text-slate-600 font-bold hover:bg-slate-50'
                        }`}
                    >
                      {day}
                      {hasEvent && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-white/40 rounded-full"></div>}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 relative">
                <div className="absolute -top-3 left-6 px-3 bg-white text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock size={12} /> Upcoming Next
                </div>
                <div className="space-y-5">
                  {UPCOMING_TIMELINE.map((item, i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-2.5 h-2.5 rounded-full border-2 ${i === 0 ? 'border-brand-red' : 'border-brand-gold'} bg-white group-hover:bg-slate-900 transition-colors`} />
                        {i < 2 && <div className="w-0.5 h-full bg-slate-100" />}
                      </div>
                      <div className="flex-1 pb-2">
                        <p className="text-sm font-black text-slate-800 leading-none group-hover:text-brand-red transition-colors">{item.title}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight italic">{item.time}</p>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg ${item.status === 'In 2h' ? 'text-brand-red bg-brand-red/5' : 'text-brand-gold-dark bg-brand-gold/10'}`}>{item.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Event View */}
        <div className="lg:col-span-3">
          <Card className="shadow-2xl shadow-slate-200/50 border-none rounded-[2.5rem] overflow-hidden h-full flex flex-col">
            <CardHeader
              title={selectedDay ? `Schedule for ${monthName} ${selectedDay}` : (viewMode === 'list' ? 'Active Schedule' : 'Grid Layout')}
              subtitle={selectedDay ? `Showing operations for the selected date.` : `Comprehensive real-time schedule of all planned events.`}
              action={selectedDay ? (
                <button onClick={() => setSelectedDay(null)} className="text-[10px] font-black text-brand-red uppercase tracking-widest bg-brand-red/5 px-3 py-1.5 rounded-xl hover:bg-brand-red/10 transition-all">
                  Clear Filter
                </button>
              ) : null}
            />
            <CardContent className={`flex-1 ${viewMode === 'list' ? 'p-0' : 'p-8'}`}>
              {viewMode === 'list' ? (
                <div className="flex flex-col h-full">
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Events</th>
                          <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Zone</th>
                          <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Timeline</th>
                          <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredEvents.map((event) => (
                          <tr key={event.id} className="hover:bg-slate-50/40 transition-all group">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-inner group-hover:rotate-6 transition-transform">
                                  <CalendarDays size={20} />
                                </div>
                                <div>
                                  <p className="text-sm font-black text-slate-800 leading-tight">{event.name}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Users size={12} className="text-slate-400" />
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">{event.staff} Staff Allocated</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2 text-sm font-black text-slate-600">
                                <MapPin size={16} className="text-slate-300" />
                                {event.location}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="text-xs font-black text-slate-800">{event.start}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase italic">to {event.end}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-2 transition-all">
                                <button
                                  className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 hover:bg-white bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 shadow-sm transition-all"
                                  onClick={() => openEditModal(event)}
                                >
                                  Manage
                                </button>
                                <button
                                  className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                  onClick={() => handleDelete(event.id, event.name)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card List View */}
                  <div className="md:hidden divide-y divide-slate-50">
                    {filteredEvents.map((event) => (
                      <div key={event.id} className="p-6 space-y-4 hover:bg-slate-50/50 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-brand-red/5 rounded-2xl flex items-center justify-center text-brand-red shadow-inner shrink-0 leading-none">
                              <CalendarDays size={24} />
                            </div>
                            <div>
                               <h4 className="text-base font-black text-slate-800 leading-tight">{event.name}</h4>
                               <p className="text-[10px] font-black text-brand-gold-dark uppercase tracking-widest mt-1 flex items-center gap-1.5">
                                  <Users size={12} /> {event.staff} Staff
                               </p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                             <button
                               onClick={() => openEditModal(event)}
                               className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all border border-slate-100"
                             >
                                <Pencil size={16} />
                             </button>
                             <button
                               onClick={() => handleDelete(event.id, event.name)}
                               className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all border border-slate-100"
                             >
                                <Trash2 size={16} />
                             </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                           <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                              <MapPin size={14} className="text-slate-400" />
                              <span className="text-xs font-bold text-slate-600">{event.location}</span>
                           </div>
                           <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                              <Clock size={14} className="text-slate-400" />
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-black text-slate-700 leading-none">{event.start}</span>
                                 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">to {event.end}</span>
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEvents.map(event => (
                    <div
                      key={event.id}
                      onClick={() => openEditModal(event)}
                      className="p-6 rounded-[2.5rem] border-2 border-slate-50 bg-white hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/10 transition-all group cursor-pointer relative overflow-hidden flex flex-col h-full shadow-sm"
                    >
                      <div className="absolute top-0 right-0 p-6 flex flex-col gap-2">
                        <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:bg-white transition-all shadow-sm">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-[10px] font-black text-brand-gold-dark uppercase tracking-widest mb-3">
                          <MapPin size={12} /> {event.location}
                        </div>
                        <h4 className="text-xl font-black text-slate-800 mb-2 leading-tight tracking-tight group-hover:text-brand-red transition-colors">{event.name}</h4>
                        <p className="text-xs text-slate-500 mb-6 font-bold leading-relaxed line-clamp-2">"{event.description}"</p>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                              <div key={i} className={`w-6 h-6 rounded-full border-2 border-white bg-slate-100 text-[8px] flex items-center justify-center font-black text-slate-400 ${i === 1 ? 'bg-brand-red/10 text-brand-red' : ''}`}>P</div>
                            ))}
                          </div>
                          <span className="text-[10px] font-black text-slate-700 uppercase">{event.staff} Crew</span>
                        </div>
                        <div className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[9px] font-black tracking-tighter uppercase whitespace-nowrap group-hover:bg-brand-red transition-colors">
                          {new Date(event.start).toLocaleString('default', { month: 'short' })} {new Date(event.start).getDate()} - {new Date(event.end).getDate()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {filteredEvents.length === 0 && (
                <div className="p-20 text-center flex flex-col items-center justify-center h-full">
                  <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 shadow-inner">
                    <CalendarIcon size={40} />
                  </div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Internal Schedule Empty</p>
                  <button onClick={() => { setSearchTerm(''); setSelectedDay(null); }} className="text-xs font-bold text-blue-500 hover:underline">Clear your search filters</button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add / Edit Event Modal */}
      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={activeModal === 'add' ? 'Publish Event' : 'Modify Schedule'}
        maxWidth="max-w-2xl"
      >
        <form className="space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Carnival Event Name</label>
              <input
                type="text"
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-slate-700 focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red/30 transition-all shadow-sm"
                placeholder="e.g. Annual Midsummer Fair"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Operational Zone</label>
              <select
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-slate-700 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_16px_center] bg-no-repeat appearance-none shadow-sm"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              >
                <option>Main Plaza</option>
                <option>Theater Wing</option>
                <option>South Pavillion</option>
                <option>Grand Hall</option>
                <option>Entire Grounds</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Staff Allocation</label>
              <div className="relative">
                <Users size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-slate-700 focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red/30 transition-all shadow-sm"
                  value={formData.staff}
                  onChange={e => setFormData({ ...formData, staff: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Start Date</label>
              <input
                type="date"
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-slate-700 shadow-sm"
                value={formData.start}
                onChange={e => setFormData({ ...formData, start: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Estimated End Date</label>
              <input
                type="date"
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-slate-700 shadow-sm"
                value={formData.end}
                onChange={e => setFormData({ ...formData, end: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Internal Description</label>
              <textarea
                rows={3}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-slate-700 shadow-sm resize-none"
                placeholder="Operational requirements and activity overview..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
           <button 
             type="button" 
             className="flex-1 font-black h-10 sm:h-14 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all uppercase tracking-widest text-[9px] sm:text-[10px]" 
             onClick={() => setActiveModal(null)}
           >
             Cancel
           </button>
           <button 
             type="submit" 
             className="flex-[2] font-black h-10 sm:h-14 rounded-2xl shadow-xl shadow-brand-gold/20 bg-brand-gold text-brand-text hover:bg-brand-gold-dark transition-all uppercase tracking-widest text-[9px] sm:text-[10px]"
           >
             {activeModal === 'add' ? 'Confirm & Publish' : 'Update Entry'}
           </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
