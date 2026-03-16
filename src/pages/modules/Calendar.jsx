import { Calendar as CalendarIcon, MapPin, Clock, Users, Plus, ChevronLeft, ChevronRight, List } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_EVENTS = [
  { id: 1, name: 'Summer Carnival Opening', location: 'Main Plaza', start: '2026-06-01', end: '2026-06-05', staff: 45 },
  { id: 2, name: 'Youth Talent Show', location: 'Theater Wing', start: '2026-06-10', end: '2026-06-12', staff: 12 },
  { id: 3, name: 'Food & Wine Expo', location: 'South Pavillion', start: '2026-06-20', end: '2026-06-25', staff: 30 },
  { id: 4, name: 'Charity Auction', location: 'Grand Hall', start: '2026-07-02', end: '2026-07-03', staff: 8 },
  { id: 5, name: 'Independence Day Prep', location: 'Entire Grounds', start: '2026-07-01', end: '2026-07-04', staff: 25 },
];

export default function Calendar() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Event Calendar</h1>
          <p className="text-slate-500 text-sm">Schedule and manage upcoming carnival events and activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <List size={18} />
            List View
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
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
                <span key={d} className="text-[10px] font-bold text-slate-400 uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const hasEvent = [1, 5, 10, 20].includes(day);
                return (
                  <div 
                    key={i} 
                    className={`aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer transition-colors ${
                      hasEvent ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Upcoming Next</h4>
              <div className="space-y-4">
                {[
                  { title: 'Ground Maintenance', time: '08:00 AM' },
                  { title: 'Security Briefing', time: '10:30 AM' },
                  { title: 'Vendor Kickoff', time: '02:00 PM' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1 h-8 bg-blue-500 rounded-full" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader title="Event List" subtitle="Comprehensive schedule of all planned events." />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Event Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">End Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Staff</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_EVENTS.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">{event.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-400" />
                          {event.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{event.start}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{event.end}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                          {event.staff} Staff
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button variant="secondary" className="h-8 px-2 text-xs">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
