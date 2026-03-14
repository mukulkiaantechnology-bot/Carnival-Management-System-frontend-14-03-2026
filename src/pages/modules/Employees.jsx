import { useState, useMemo } from 'react';
import {
  Users, UserPlus, Search, Filter, Mail, Phone,
  MapPin, Eye, Pencil, Trash2, X, Check, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_EMPLOYEES = [
  { id: 1, name: 'John Doe', role: 'Ride Operator', email: 'john@carnival.com', status: 'Active', joined: '2025-05-12' },
  { id: 2, name: 'Jane Smith', role: 'Ticket Manager', email: 'jane@carnival.com', status: 'Active', joined: '2025-06-01' },
  { id: 3, name: 'Mike Johnson', role: 'Security Lead', email: 'mike@carnival.com', status: 'On Leave', joined: '2024-11-20' },
  { id: 4, name: 'Sarah Wilson', role: 'Maintenance Tech', email: 'sarah@carnival.com', status: 'Active', joined: '2026-01-10' },
  { id: 5, name: 'Robert Brown', role: 'Operations Admin', email: 'robert@carnival.com', status: 'Active', joined: '2023-08-15' },
];

export default function Employees() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: 'Employee', email: '', password: '', status: 'Active' });
  const [notification, setNotification] = useState(null);

  const roles = ['Employee', 'Operations', 'Maintenance', 'Ticket Sales', 'HR'];

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [employees, searchTerm, statusFilter]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.email) return;

    const id = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const joined = new Date().toISOString().split('T')[0];
    setEmployees([...employees, { ...newEmployee, id, joined }]);
    setIsModalOpen(false);
    setNewEmployee({ name: '', role: 'Employee', email: '', password: '', status: 'Active' });
    showNotification(`${newEmployee.name} added successfully!`);
  };

  const handleDeleteEmployee = (id) => {
    const emp = employees.find(e => e.id === id);
    if (window.confirm(`Are you sure you want to delete ${emp.name}?`)) {
      setEmployees(employees.filter(e => e.id !== id));
      showNotification(`${emp.name} removed from directory.`);
    }
  };

  const handleEditEmployee = (e) => {
    e.preventDefault();
    setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? selectedEmployee : emp));
    setIsEditModalOpen(false);
    showNotification(`${selectedEmployee.name}'s profile updated!`);
  };

  const openViewModal = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee({ ...employee });
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6 relative">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
            <Check size={16} className="text-emerald-400" />
            {notification}
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Add New Employee</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input
                  autoFocus
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Role</label>
                <select
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <input
                  required
                  type="password"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={newEmployee.password}
                  onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                />
              </div>
              <div className="pt-2 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button variant="primary" className="flex-1" type="submit">Add Employee</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {isViewModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Employee Details</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-white shadow-xl flex items-center justify-center text-3xl font-bold text-blue-600">
                  {selectedEmployee.name[0]}
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-800">{selectedEmployee.name}</h3>
                  <p className="text-blue-600 font-semibold">{selectedEmployee.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Mail size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</p>
                    <p className="text-sm font-medium">{selectedEmployee.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Check size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Status</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mt-1 ${selectedEmployee.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                      {selectedEmployee.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><AlertCircle size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Joined Date</p>
                    <p className="text-sm font-medium italic">{selectedEmployee.joined}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="secondary" className="w-full" onClick={() => setIsViewModalOpen(false)}>Close Directory</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Edit Employee Info</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleEditEmployee} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={selectedEmployee.name}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Role</label>
                <select
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  value={selectedEmployee.role}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, role: e.target.value })}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Status</label>
                <select
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  value={selectedEmployee.status}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={selectedEmployee.email}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                />
              </div>
              <div className="pt-2 flex gap-3">
                <Button variant="secondary" className="flex-1" type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button variant="primary" className="flex-1" type="submit">Update Records</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Employee Directory</h1>
          <p className="text-slate-500 text-sm">Manage staff records, roles, and employment status.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Button variant="secondary" className="flex items-center gap-2">
              <Filter size={18} />
              Filter: {statusFilter}
            </Button>
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-20">
              {['All', 'Active', 'On Leave'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <Button variant="primary" className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
            <UserPlus size={18} />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-2 border-blue-100 shadow-lg shadow-blue-50 group hover:border-blue-500 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">Total Staff</p>
                <p className="text-4xl font-extrabold text-slate-800 mt-2">{employees.length}</p>
                <p className="text-slate-400 text-[10px] font-bold mt-4 uppercase">+5 NEW THIS MONTH</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                <Users size={32} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:border-emerald-200 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Active Now</p>
                <p className="text-4xl font-extrabold text-slate-800 mt-2">
                  {employees.filter(e => e.status === 'Active').length}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Currently clocked in</p>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <Check size={32} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:border-slate-300 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Departments</p>
                <p className="text-4xl font-extrabold text-slate-800 mt-2">8</p>
                <p className="text-slate-400 text-[10px] font-bold mt-4 uppercase">Across all park zones</p>
              </div>
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                <AlertCircle size={32} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader
          title="Staff Members"
          subtitle="A comprehensive list of all carnival employees."
        />
        <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30">
          <div className="relative w-full max-w-sm">
            <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, role or email..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name & Role</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Info</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEmployees.length > 0 ? filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0">
                          {employee.name[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{employee.name}</p>
                          <p className="text-xs text-slate-500 truncate">{employee.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <Mail size={12} className="shrink-0" /> {employee.email}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <Phone size={12} className="shrink-0" /> +1 (555) 001-234{employee.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${employee.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500 italic">{employee.joined}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          className="p-2 bg-blue-50/50 border border-blue-100 rounded-lg text-blue-600 hover:bg-blue-100 shadow-sm transition-all hover:scale-105" 
                          title="View Profile"
                          onClick={() => openViewModal(employee)}
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          className="p-2 bg-amber-50/50 border border-amber-100 rounded-lg text-amber-600 hover:bg-amber-100 shadow-sm transition-all hover:scale-105" 
                          title="Edit Employee"
                          onClick={() => openEditModal(employee)}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="p-2 bg-rose-50/50 border border-rose-100 rounded-lg text-rose-600 hover:bg-rose-100 shadow-sm transition-all hover:scale-105"
                          title="Delete Employee"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Users size={40} className="mb-2 opacity-20" />
                        <p className="text-sm font-medium">No employees found matching your filters.</p>
                        <button onClick={() => { setSearchTerm(''); setStatusFilter('All'); }} className="text-xs text-blue-600 font-bold hover:underline">Clear all filters</button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
