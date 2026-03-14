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
  active: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  on_leave: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
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
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-teal-500" size={24} /> Employees
          </h1>
          <p className="text-sm text-slate-500">View-only workforce directory.</p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200 flex items-center gap-1.5 uppercase tracking-wide">
          <Info size={14} /> Directory Only
        </div>
      </div>

      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, role, or event..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-400/40 outline-none bg-white transition-shadow"
        />
        {search && <button onClick={()=>setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>}
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
                        <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                          {emp.name.split(' ').map(n=>n[0]).join('')}
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
                    <td className="px-5 py-4 font-medium flex items-center gap-1.5"><Phone size={12} className="text-slate-400" /> {emp.phone}</td>
                    <td className="px-5 py-4">
                       {emp.assignedEvent === '—' ? 
                         <span className="text-slate-300 italic text-xs">Not assigned</span> :
                         <span className="flex items-center gap-1.5 text-slate-600 text-xs font-medium"><Calendar size={12} className="text-teal-400" /> {emp.assignedEvent}</span>
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
