import { useState } from 'react';
import { Users, Search, Phone, Briefcase, Calendar, CheckCircle, Clock, XCircle, Info, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

const EMPLOYEES = [
  { id: 'EMP-001', name: 'James Carter', role: 'Ride Operator', phone: '+1 555-0101', assignedEvent: 'Summer Carnival Kickoff', status: 'active' },
  { id: 'EMP-002', name: 'Maria Lopez', role: 'Food Stall Manager', phone: '+1 555-0102', assignedEvent: 'Kids Fun Day', status: 'active' },
  { id: 'EMP-003', name: 'David Kim', role: 'Technician', phone: '+1 555-0103', assignedEvent: '—', status: 'on_leave' },
  { id: 'EMP-004', name: 'Sarah Ahmed', role: 'Security Guard', phone: '+1 555-0104', assignedEvent: 'Safety Drill Exercise', status: 'active' },
  { id: 'EMP-005', name: 'Tom Bradley', role: 'Water Ride Attendant', phone: '+1 555-0105', assignedEvent: 'Summer Carnival Kickoff', status: 'active' },
  { id: 'EMP-006', name: 'Emily Davis', role: 'First Aid Officer', phone: '+1 555-0106', assignedEvent: 'Safety Drill Exercise', status: 'active' },
  { id: 'EMP-007', name: 'Ryan Patel', role: 'Ticketing Staff', phone: '+1 555-0107', assignedEvent: '—', status: 'inactive' },
  { id: 'EMP-008', name: 'Nina Russo', role: 'Event Coordinator', phone: '+1 555-0108', assignedEvent: 'Night Lights Festival', status: 'active' },
];

const STATUS_BADGE = {
  active: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100',
  on_leave: 'bg-brand-orange/10 text-brand-orange ring-1 ring-brand-orange/20',
  inactive: 'bg-slate-100 text-slate-500 ring-1 ring-slate-200',
};

export default function EmployeesView() {
  const [search, setSearch] = useState('');

  const filtered = EMPLOYEES.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.role.toLowerCase().includes(search.toLowerCase()) ||
    emp.assignedEvent.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-brand-red tracking-tight uppercase italic flex items-center gap-2">
            <Users className="text-brand-gold" size={24} /> Employees
          </h1>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">View-only workforce directory.</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-white border border-slate-100 text-slate-400 text-[10px] font-black shadow-sm flex items-center gap-2 uppercase tracking-widest">
          <Info size={14} className="text-brand-gold" /> Directory Only
        </div>
      </div>

      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-red opacity-40" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, role, or event..."
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-gold/10 focus:border-brand-gold outline-none bg-white transition-all shadow-inner font-bold text-brand-text"
        />
        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>}
      </div>

      <Card>
        <CardHeader title="Employee List" subtitle={`${filtered.length} members found`} />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] font-bold text-slate-400">
                  <th className="text-left px-5 py-4">Name</th>
                  <th className="text-left px-5 py-4">Role</th>
                  <th className="text-left px-5 py-4">Phone</th>
                  <th className="text-left px-5 py-4">Assigned Event</th>
                  <th className="text-left px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-black text-xs border border-brand-gold/10 shadow-sm">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{emp.name}</p>
                          <p className="text-[10px] font-mono text-slate-400 mt-0.5">{emp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-semibold">
                        <Briefcase size={10} /> {emp.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium flex items-center gap-1.5"><Phone size={12} className="text-slate-400" /> <span className="text-slate-500 font-bold">{emp.phone}</span></td>
                    <td className="px-5 py-4">
                      {emp.assignedEvent === '—' ?
                        <span className="text-slate-300 italic text-xs">Not assigned</span> :
                        <span className="flex items-center gap-1.5 text-brand-text text-xs font-black uppercase italic italic tracking-tight"><Calendar size={12} className="text-brand-gold" /> {emp.assignedEvent}</span>
                      }
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_BADGE[emp.status]}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50">
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <Info size={12} /> Contact Administration to modify employee records.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
