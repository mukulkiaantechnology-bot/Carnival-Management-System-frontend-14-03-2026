import { useState, useMemo } from 'react';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import {
  Users, UserPlus, Search, Filter, Mail, Phone,
  MapPin, Eye, Pencil, Trash2, X, Check, AlertCircle,
  Building2, UserCheck, GraduationCap, ArrowLeft, EyeOff, Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_EMPLOYEES = [
  { id: 1, name: 'John Doe', role: 'Ride Operator', email: 'john@carnival.com', phone: '+1 (555) 001-2341', department: 'Operations', status: 'Active', joined: '2025-05-12', trainingStatus: 'Completed' },
  { id: 2, name: 'Jane Smith', role: 'Ticket Manager', email: 'jane@carnival.com', phone: '+1 (555) 001-2342', department: 'Ticketing', status: 'Active', joined: '2025-06-01', trainingStatus: 'Pending' },
  { id: 3, name: 'Mike Johnson', role: 'Security Lead', email: 'mike@carnival.com', phone: '+1 (555) 001-2343', department: 'Security', status: 'On Leave', joined: '2024-11-20', trainingStatus: 'In Progress' },
  { id: 4, name: 'Sarah Wilson', role: 'Maintenance Tech', email: 'sarah@carnival.com', phone: '+1 (555) 001-2344', department: 'Maintenance', status: 'Active', joined: '2026-01-10', trainingStatus: 'Completed' },
  { id: 5, name: 'Robert Brown', role: 'Operations Admin', email: 'robert@carnival.com', phone: '+1 (555) 001-2345', department: 'Operations', status: 'Active', joined: '2023-08-15', trainingStatus: 'Completed' },
];

function EmployeeForm({ employee, onSave, onCancel, title }) {
  const [formData, setFormData] = useState(employee || {
    name: '', email: '', phone: '', role: 'Employee', department: 'Operations', status: 'Active', joined: new Date().toISOString().split('T')[0],
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const roles = ['Employee', 'Operator', 'Technician', 'Manager', 'Lead', 'Admin'];
  const departments = ['Operations', 'Maintenance', 'Security', 'Ticketing', 'Finance', 'HR', 'Guest Services'];

  return (
    <Card className="max-w-2xl mx-auto border-none shadow-md">
      <CardHeader title={title} subtitle="Please fill in all employee details." />
      <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
            <input
              required
              type="email"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
            <input
              required
              type="tel"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
            <select
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
            <select
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
            <select
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Joining Date</label>
            <input
              required
              type="date"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.joined}
              onChange={(e) => setFormData({ ...formData, joined: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Account Password</label>
            <div className="relative group">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                required={!employee}
                type={showPassword ? 'text' : 'password'}
                placeholder={employee ? 'Leave blank to keep current' : '••••••••'}
                className="w-full pl-12 pr-12 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-3 pt-6">
          <Button variant="secondary" className="flex-1 font-bold h-10 sm:h-12 text-sm sm:text-base rounded-xl" type="button" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" className="flex-1 font-bold h-10 sm:h-12 text-sm sm:text-base rounded-xl shadow-lg shadow-blue-500/20" type="submit">Save Employee</Button>
        </div>
      </form>
    </Card>
  );
}

function EmployeeView({ employee, onBack }) {
  if (!employee) return null;
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Directory
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-none shadow-md overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
          <div className="px-6 pb-6 -mt-12 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-blue-600">
                {employee.name[0]}
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-800">{employee.name}</h2>
            <p className="text-blue-600 font-bold text-sm">{employee.role}</p>
            <div className="mt-6 flex justify-center">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                employee.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {employee.status}
              </span>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader title="Employee Details" subtitle="Full recruitment and role information." />
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contact Info</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-lg"><Mail size={16} /></div>
                      <span className="text-sm font-medium">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-lg"><Phone size={16} /></div>
                      <span className="text-sm font-medium">{employee.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Placement</p>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-lg"><Building2 size={16} /></div>
                    <span className="text-sm font-medium">{employee.department} Department</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Employment</p>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-lg"><AlertCircle size={16} /></div>
                    <span className="text-sm font-medium italic">Joined on {employee.joined}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Development</p>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-lg"><GraduationCap size={16} /></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">Training Status</span>
                      <span className={`text-[10px] font-bold uppercase ${
                        employee.trainingStatus === 'Completed' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>{employee.trainingStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Employees() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
    setDeleteConfirmId(null);
    showNotification("Employee record deleted successfully.");
  };

  const directoryStats = useMemo(() => {
    return [
      { label: 'Total Staff', value: employees.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Active Now', value: employees.filter(e => e.status === 'Active').length, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Training Pending', value: employees.filter(e => e.trainingStatus !== 'Completed').length, icon: GraduationCap, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Departments', value: new Set(employees.map(e => e.department)).size, icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];
  }, [employees]);

  const basePath = window.location.pathname.startsWith('/hr') ? '/hr/employees' : '/employees';

  return (
    <div className="space-y-6 relative overflow-x-hidden px-1 pb-8">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
            <Check size={16} className="text-emerald-400" />
            {notification}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm border-none shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Confirm Deletion</h3>
              <p className="text-slate-500 text-sm mt-2">Are you sure you want to delete this employee? This action cannot be undone.</p>
              <div className="flex gap-3 mt-8">
                <Button variant="secondary" className="flex-1 font-bold" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
                <Button variant="danger" className="flex-1 font-bold bg-rose-600 hover:bg-rose-700 text-white" onClick={() => handleDelete(deleteConfirmId)}>Delete</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Routes>
        <Route path="/" element={
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Employee Directory</h1>
                <p className="text-slate-500 text-sm">Centralized management for carnival personnel.</p>
              </div>
              <Button variant="primary" className="flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20 py-2.5 sm:py-3 px-6 sm:px-8" onClick={() => navigate(`${basePath}/add`)}>
                <UserPlus size={18} />
                Add Employee
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {directoryStats.map((stat) => (
                <Card key={stat.label} className="border-none shadow-sm hover:translate-y-[-2px] transition-all duration-300">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                      <stat.icon size={28} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
              <div className="p-4 bg-white border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, role or email..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <Button variant="secondary" className="flex items-center gap-2 h-10 px-4 text-xs font-bold border-none shadow-sm capitalize">
                      <Filter size={14} />
                      {statusFilter}
                    </Button>
                    <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-20 overflow-hidden">
                      {['All', 'Active', 'On Leave', 'Inactive'].map(status => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className="w-full text-left px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 border-b last:border-0 border-slate-50 transition-colors"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-blue-600 text-sm">
                              {emp.name[0]}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">{emp.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{emp.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">{emp.department}</span>
                            <span className="text-[10px] text-slate-400">{emp.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              variant="secondary"
                              className="h-9 px-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm border-slate-100 bg-white hover:bg-slate-50 text-slate-600"
                              onClick={() => navigate(`${basePath}/${emp.id}`)}
                              title="View Details"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button 
                              variant="secondary"
                              className="h-9 px-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm border-slate-100 bg-white hover:bg-amber-50 hover:text-amber-600 text-slate-600"
                              onClick={() => navigate(`${basePath}/edit/${emp.id}`)}
                              title="Edit Employee"
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button 
                              variant="secondary"
                              className="h-9 px-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm border-slate-100 bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-600"
                              onClick={() => setDeleteConfirmId(emp.id)}
                              title="Delete Employee"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden divide-y divide-slate-50">
                {filteredEmployees.map((emp) => (
                  <div key={emp.id} className="p-4 space-y-4 active:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-blue-600 text-base shadow-sm">
                          {emp.name[0]}
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-800">{emp.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{emp.role}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                        emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {emp.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Department</p>
                        <p className="text-xs font-bold text-slate-700">{emp.department}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Email</p>
                        <p className="text-[10px] font-bold text-slate-500 truncate">{emp.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button 
                        variant="secondary" 
                        onClick={() => navigate(`${basePath}/${emp.id}`)}
                        className="flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-100 hover:bg-slate-50"
                      >
                        Details
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={() => navigate(`${basePath}/edit/${emp.id}`)}
                        className="h-10 w-10 p-0 rounded-xl border-slate-100 hover:bg-amber-50 hover:text-amber-600"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={() => setDeleteConfirmId(emp.id)}
                        className="h-10 w-10 p-0 rounded-xl border-slate-100 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredEmployees.length === 0 && (
                  <div className="p-12 text-center">
                    <p className="text-sm font-bold text-slate-400">No employees found matching your criteria.</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        } />

        <Route path="/add" element={
          <EmployeeForm 
            title="Add New Employee"
            onSave={(data) => {
              setEmployees([...employees, { ...data, id: Date.now(), trainingStatus: 'Pending' }]);
              navigate(basePath);
              showNotification(`Employee ${data.name} added to data.`);
            }}
            onCancel={() => navigate(basePath)}
          />
        } />

        <Route path="/edit/:id" element={
          <EditEmployeeWrapper 
            employees={employees} 
            onSave={(data) => {
              setEmployees(employees.map(e => e.id.toString() === data.id.toString() ? data : e));
              navigate(basePath);
              showNotification(`${data.name}'s records updated.`);
            }}
            onCancel={() => navigate(basePath)}
          />
        } />

        <Route path="/:id" element={
          <ViewEmployeeWrapper employees={employees} onBack={() => navigate(basePath)} />
        } />
      </Routes>
    </div>
  );
}

function EditEmployeeWrapper({ employees, onSave, onCancel }) {
  const { id } = useParams();
  const employee = employees.find(e => e.id.toString() === id);
  if (!employee) return <div>Employee not found</div>;
  return <EmployeeForm title="Edit Employee Profile" employee={employee} onSave={onSave} onCancel={onCancel} />;
}

function ViewEmployeeWrapper({ employees, onBack }) {
  const { id } = useParams();
  const employee = employees.find(e => e.id.toString() === id);
  return <EmployeeView employee={employee} onBack={onBack} />;
}
