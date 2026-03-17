import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
   Building2, Users, Zap, Globe, MoreVertical,
   Search, Filter, ArrowUpRight, CheckCircle2, AlertCircle, Plus,
   LayoutGrid, List, LogIn, Trash2, Edit3, X, Eye, ShieldCheck,
   ChevronDown, MoreHorizontal, Lock
} from 'lucide-react';
import { Card } from '../../components/ui/Card';

const MOCK_COMPANIES = [
   { id: 'ADMIN-SYS', name: 'Grand Carnival Management', plan: 'Platform Admin', users: 142, status: 'Active', revenue: 'System Owner', email: 'superadmin@showmensinfo.com' },
   { id: 'COM-1001', name: 'Wonderland Group', plan: 'Enterprise', users: 142, status: 'Active', revenue: '$4,200/mo', email: 'admin@wonderland.com' },
   { id: 'COM-1002', name: 'Magic Parks Inc.', plan: 'Professional', users: 45, status: 'Active', revenue: '$1,450/mo', email: 'contact@magicparks.com' },
   { id: 'COM-1003', name: 'Skyline Express', plan: 'Basic', users: 12, status: 'Active', revenue: '$490/mo', email: 'info@skyline.com' },
   { id: 'COM-1004', name: 'Global Rides Ltd.', plan: 'Professional', users: 88, status: 'Suspended', revenue: '$0/mo', email: 'ops@globalrides.com' },
   { id: 'COM-1005', name: 'Atlantic Carnivals', plan: 'Enterprise', users: 210, status: 'Active', revenue: '$6,800/mo', email: 'corp@atlantic.com' },
];

export default function Companies() {
   const { impersonateAsAdmin } = useAuth();
   const navigate = useNavigate();
   const [searchTerm, setSearchTerm] = useState('');
   const [viewMode, setViewMode] = useState(() => localStorage.getItem('company_view_mode') || 'list');
   const [statusFilter, setStatusFilter] = useState('All Status');
   const [planFilter, setPlanFilter] = useState('All Plans');
   const [activeDropdown, setActiveDropdown] = useState(null);
   const [showProvisionModal, setShowProvisionModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);
   const [editingCompany, setEditingCompany] = useState(null);
   const [companies, setCompanies] = useState(MOCK_COMPANIES);
   const [notification, setNotification] = useState(null);

   // Form states for Provisioning
   const [newCompany, setNewCompany] = useState({
      name: '',
      plan: 'Enterprise',
      domain: '',
      email: '',
      password: ''
   });

   const showNotification = (msg) => {
      setNotification(msg);
      setTimeout(() => setNotification(null), 3000);
   };

   const filteredCompanies = companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           company.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || company.status === statusFilter;
      const matchesPlan = planFilter === 'All Plans' || company.plan === planFilter;
      return matchesSearch && matchesStatus && matchesPlan;
   });

   const handleLoginAs = (company) => {
      showNotification(`System Access Granted: Logging into ${company.name}'s secure dashboard...`);
      setTimeout(() => {
         impersonateAsAdmin();
         navigate('/admin-dashboard');
      }, 1000);
   };

   const handleAction = (id, action) => {
      setActiveDropdown(null);
      if (action === 'delete') {
         setCompanies(companies.filter(c => c.id !== id));
         showNotification('Company record permanently purged.');
      } else if (action === 'suspend') {
         setCompanies(companies.map(c => c.id === id ? { ...c, status: c.status === 'Suspended' ? 'Active' : 'Suspended' } : c));
         showNotification('Company status updated successfully.');
      } else if (action === 'edit') {
         const company = companies.find(c => c.id === id);
         setEditingCompany({ ...company });
         setShowEditModal(true);
      }
   };

   const commitProvision = () => {
      if (!newCompany.name || !newCompany.email) return;
      
      const id = `COM-${Math.floor(1000 + Math.random() * 9000)}`;
      const addedComp = {
         id,
         name: newCompany.name,
         plan: newCompany.plan,
         users: 0,
         status: 'Active',
         revenue: '$0/mo',
         email: newCompany.email
      };
      
      setCompanies([addedComp, ...companies]);
      setShowProvisionModal(false);
      setNewCompany({ name: '', plan: 'Enterprise', domain: '', email: '', password: '' });
      showNotification('New company provisioned and infrastructure deployed.');
   };

   const commitEdit = () => {
      setCompanies(companies.map(c => c.id === editingCompany.id ? editingCompany : c));
      setShowEditModal(false);
      showNotification('Company information synchronized successfully.');
   };

   useEffect(() => {
      localStorage.setItem('company_view_mode', viewMode);
   }, [viewMode]);

   useEffect(() => {
      const handleClick = () => setActiveDropdown(null);
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
   }, []);

   return (
      <div className="space-y-6 sm:space-y-10 animate-in fade-in duration-500 pb-20">
         {/* Toast Notification */}
         {notification && (
            <div className="fixed top-24 right-4 sm:right-8 z-[150] animate-in slide-in-from-right duration-300">
               <div className="bg-slate-900 border border-white/10 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-[1.8rem] shadow-2xl flex items-center gap-3 sm:gap-4">
                  <div className="bg-brand-red/20 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl">
                     <CheckCircle2 size={18} className="text-brand-red" />
                  </div>
                  <span className="text-xs sm:text-sm font-black tracking-tight">{notification}</span>
               </div>
            </div>
         )}

         {/* Header section - Responsive Stacking */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
               <h1 className="text-xl sm:text-2xl font-black text-brand-red tracking-tight uppercase italic">Active Companies</h1>
               <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-orange animate-pulse"></div>
                  <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-widest">Portfolio Management</p>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
               <div className="flex bg-white p-1 rounded-2xl border border-brand-gold/20 shadow-sm">
                  <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' : 'text-slate-400 hover:text-brand-red'}`}><LayoutGrid size={18} /></button>
                  <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' : 'text-slate-400 hover:text-brand-red'}`}><List size={18} /></button>
               </div>
               <button onClick={() => setShowProvisionModal(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-brand-gold rounded-2xl text-[10px] font-black uppercase tracking-widest text-brand-text shadow-lg shadow-brand-gold/20 hover:bg-brand-gold-dark transition-all active:scale-95">
                  <Plus size={18} /> Provision Company
               </button>
            </div>
         </div>

         {/* Filters bar - Wrapping on tablet/mobile */}
         <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input
                  type="text" placeholder="Search by company name or ID..."
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200/60 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-sm text-slate-800 shadow-sm"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="grid grid-cols-2 lg:flex gap-4">
               <div className="relative group min-w-0">
                  <select className="w-full pl-4 sm:pl-6 pr-10 sm:pr-12 py-4 bg-white border border-slate-200/60 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none appearance-none shadow-sm cursor-pointer hover:bg-slate-50 transition-all sm:min-w-[160px]" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                     <option>All Status</option><option>Active</option><option>Suspended</option><option>Pending</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
               </div>
               <div className="relative group min-w-0">
                  <select className="w-full pl-4 sm:pl-6 pr-10 sm:pr-12 py-4 bg-white border border-slate-200/60 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none appearance-none shadow-sm cursor-pointer hover:bg-slate-50 transition-all sm:min-w-[160px]" value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}>
                     <option>All Plans</option><option>Enterprise</option><option>Professional</option><option>Basic</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
               </div>
            </div>
         </div>

         {/* Rendering Grid or List */}
         {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
               {filteredCompanies.map((company) => (
                  <div key={company.id} className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border border-brand-gold/30 shadow-xl shadow-brand-gold/10 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all group overflow-hidden relative">
                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform -rotate-12 pointer-events-none text-brand-red"><Building2 size={120} /></div>
                     <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6 sm:mb-8">
                           <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-light flex items-center justify-center text-brand-red border border-brand-gold/20 shadow-sm transition-all group-hover:bg-brand-red group-hover:text-white"><Building2 size={24} sm:size={28} /></div>
                           <div className="relative">
                              <button onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === company.id ? null : company.id); }} className="p-3 text-slate-400 hover:bg-brand-light hover:text-brand-red rounded-xl transition-all bg-white shadow-sm border border-slate-100"><MoreHorizontal size={20} /></button>
                              {activeDropdown === company.id && (
                                 <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-in slide-in-from-top-2 duration-200">
                                    <button onClick={() => handleAction(company.id, 'edit')} className="w-full px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-brand-red flex items-center gap-3"><Edit3 size={14} /> Edit Record</button>
                                    <button onClick={() => handleAction(company.id, 'suspend')} className="w-full px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-brand-orange flex items-center gap-3"><AlertCircle size={14} /> {company.status === 'Suspended' ? 'Re-activate' : 'Suspend Account'}</button>
                                    <div className="h-px bg-slate-50 my-1 mx-4" /><button onClick={() => handleAction(company.id, 'delete')} className="w-full px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-brand-red hover:bg-red-50 flex items-center gap-3"><Trash2 size={14} /> Delete Profile</button>
                                 </div>
                              )}
                           </div>
                        </div>
                        <div className="mb-6 sm:mb-8">
                           <h3 className="text-xl sm:text-2xl font-black text-brand-red tracking-tight mb-1 transition-colors uppercase italic leading-tight">{company.name}</h3>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{company.id}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                           <div className="p-3 sm:p-4 bg-brand-light rounded-2xl border border-brand-gold/20 hover:bg-white hover:shadow-lg hover:shadow-brand-gold/20 transition-all group/stat">
                              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">Users</p>
                              <div className="flex items-center gap-2"><Users size={14} className="text-brand-red transition-transform group-hover/stat:scale-110" /><span className="text-xs sm:text-sm font-black text-slate-700">{company.users}</span></div>
                           </div>
                           <div className="p-3 sm:p-4 bg-brand-light rounded-2xl border border-brand-gold/20 hover:bg-white hover:shadow-lg hover:shadow-brand-gold/20 transition-all group/stat">
                              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">Plan</p>
                              <div className="flex items-center gap-2"><Zap size={14} className="text-brand-orange transition-transform group-hover/stat:scale-110" /><span className="text-xs sm:text-sm font-black text-slate-700">{company.plan}</span></div>
                           </div>
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                           <div className="flex items-center gap-2.5">
                              <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${company.status === 'Active' ? 'bg-emerald-500 shadow-emerald-500/40 shadow-sm animate-pulse' : 'bg-brand-red'}`}></div>
                              <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${company.status === 'Active' ? 'text-emerald-600' : 'text-brand-red'}`}>{company.status}</span>
                           </div>
                           <div className="text-right">
                              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 text-right">Revenue</p>
                              <p className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-brand-red transition-colors">{company.revenue}</p>
                           </div>
                        </div>
                        <button onClick={() => handleLoginAs(company)} className="mt-6 w-full py-4 bg-brand-gold text-brand-text border border-brand-gold rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold-dark transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-gold/10 group/btn">System Login <LogIn size={16} className="group-hover/btn:translate-x-1 transition-transform" /></button>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-brand-gold/30 shadow-xl shadow-brand-gold/10 overflow-hidden">
               <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full min-w-[800px]">
                     <thead className="bg-brand-light border-b border-brand-gold/10">
                        <tr>
                           <th className="px-6 sm:px-8 py-6 text-left text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Company / ID</th>
                           <th className="px-6 sm:px-8 py-6 text-left text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Contact Email</th>
                           <th className="px-6 sm:px-8 py-6 text-center text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Plan</th>
                           <th className="px-6 sm:px-8 py-6 text-center text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Scale</th>
                           <th className="px-6 sm:px-8 py-6 text-center text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Status</th>
                           <th className="px-6 sm:px-8 py-6 text-right text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {filteredCompanies.map((company) => (
                           <tr key={company.id} className="hover:bg-brand-light transition-colors group">
                              <td className="px-6 sm:px-8 py-6">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white shrink-0"><Building2 size={18} /></div>
                                    <div className="min-w-0">
                                       <p className="text-sm font-black text-brand-red uppercase truncate">{company.name}</p>
                                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{company.id}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 sm:px-8 py-6"><p className="text-xs font-bold text-slate-600 truncate">{company.email}</p></td>
                              <td className="px-6 sm:px-8 py-6 text-center">
                                 <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg border border-brand-gold/10 shadow-sm uppercase tracking-tight inline-block ${company.plan === 'Enterprise' ? 'bg-indigo-50 text-indigo-700' : company.plan === 'Professional' ? 'bg-brand-light text-brand-red' : 'bg-slate-50 text-slate-700'}`}>{company.plan}</span>
                              </td>
                              <td className="px-6 sm:px-8 py-6 text-center shrink-0"><div className="flex flex-col items-center"><span className="text-xs font-black text-slate-800">{company.users}</span><span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Active Users</span></div></td>
                              <td className="px-6 sm:px-8 py-6 text-center">
                                 <div className="flex items-center justify-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${company.status === 'Active' ? 'bg-emerald-500' : 'bg-brand-red'}`} />
                                    <span className={`text-[10px] font-black uppercase ${company.status === 'Active' ? 'text-emerald-600' : 'text-brand-red'}`}>{company.status}</span>
                                 </div>
                              </td>
                              <td className="px-6 sm:px-8 py-6 text-right">
                                 <div className="flex items-center justify-end gap-3">
                                    <button onClick={() => handleLoginAs(company)} className="w-10 h-10 flex items-center justify-center bg-brand-gold text-brand-text hover:bg-brand-gold-dark rounded-xl transition-all border border-brand-gold shadow-lg shadow-brand-gold/10" title="System Login"><LogIn size={18} /></button>
                                    <div className="relative">
                                       <button onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === company.id ? null : company.id); }} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-brand-light hover:text-brand-red rounded-full transition-all border border-slate-100"><MoreHorizontal size={18} /></button>
                                       {activeDropdown === company.id && (
                                          <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-in slide-in-from-top-2 duration-200">
                                             <button onClick={() => handleAction(company.id, 'edit')} className="w-full px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-brand-red flex items-center gap-3"><Edit3 size={14} /> Edit Record</button>
                                             <div className="h-px bg-slate-50 my-1 mx-4" /><button onClick={() => handleAction(company.id, 'delete')} className="w-full px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-brand-red hover:bg-red-50 flex items-center gap-3"><Trash2 size={14} /> Delete Profile</button>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         )}

         {/* No Results Fallback... */}
         {filteredCompanies.length === 0 && (
            <div className="py-20 sm:py-32 px-6 text-center flex flex-col items-center gap-6 sm:gap-8 bg-white rounded-[2rem] sm:rounded-[2.5rem] border-2 border-dashed border-brand-gold/20 shadow-inner">
               <div className="w-24 h-24 sm:w-32 sm:h-32 bg-brand-light rounded-[2rem] sm:rounded-[3rem] flex items-center justify-center text-brand-red opacity-20 shadow-inner border-4 border-white"><Building2 size={48} sm:size={64} /></div>
               <div className="max-w-xs mx-auto space-y-2"><p className="text-lg sm:text-xl font-black text-brand-red tracking-tight uppercase italic">Zero Matches Found</p><p className="text-sm font-medium text-slate-400">No company details matching your criteria were discovered.</p></div>
               <button onClick={() => { setSearchTerm(''); setStatusFilter('All Status'); setPlanFilter('All Plans'); }} className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red border border-brand-red/20 rounded-2xl hover:bg-brand-red hover:text-white transition-all shadow-lg shadow-brand-red/10">Refresh Database</button>
            </div>
         )}

         {/* Provision Modal - Fully Responsive */}
         {showProvisionModal && (
            <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6 backdrop-blur-3xl bg-slate-900/60 transition-all duration-500 overflow-y-auto">
               <div className="w-full max-w-2xl bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 my-auto">
                  <div className="p-6 sm:p-10 relative z-10">
                     <div className="flex items-center justify-between mb-8 sm:mb-10">
                        <div className="flex items-center gap-4 sm:gap-5">
                           <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-[1.8rem] bg-brand-red flex items-center justify-center text-white shadow-xl shadow-brand-red/40"><Plus size={24} sm:size={32} /></div>
                           <div><h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight uppercase italic">Provision Company</h2><p className="text-[9px] sm:text-[10px] font-bold text-brand-red uppercase tracking-widest mt-0.5">Initialize New Infrastructure Instance</p></div>
                        </div>
                        <button onClick={() => setShowProvisionModal(false)} className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-[1.5rem] text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-inner group"><X size={20} sm:size={24} className="group-hover:rotate-90 transition-transform" /></button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-10">
                        <div className="space-y-2">
                           <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Corporate Identity</label>
                           <input type="text" placeholder="e.g. Wonderland Group" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-sm text-slate-900 shadow-inner" value={newCompany.name} onChange={(e) => setNewCompany({...newCompany, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subscription Tier</label>
                           <div className="relative">
                              <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-red appearance-none font-bold text-sm text-slate-900 shadow-inner" value={newCompany.plan} onChange={(e) => setNewCompany({...newCompany, plan: e.target.value})}>
                                 <option>Enterprise</option><option>Professional</option><option>Basic</option>
                              </select>
                              <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Domain</label>
                           <input type="text" placeholder="e.g. wonderland.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-sm text-slate-900 shadow-inner" value={newCompany.domain} onChange={(e) => setNewCompany({...newCompany, domain: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Email Access</label>
                           <input type="email" placeholder="admin@domain.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-sm text-slate-900 shadow-inner" value={newCompany.email} onChange={(e) => setNewCompany({...newCompany, email: e.target.value})} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                           <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
                           <div className="relative">
                              <input type="password" placeholder="••••••••" className="w-full px-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-sm text-slate-900 shadow-inner" value={newCompany.password} onChange={(e) => setNewCompany({...newCompany, password: e.target.value})} />
                              <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button onClick={() => setShowProvisionModal(false)} className="order-2 sm:order-1 flex-1 py-4 sm:py-5 bg-brand-light text-slate-400 rounded-2xl sm:rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-all">Cancel Operation</button>
                        <button onClick={commitProvision} className="order-1 sm:order-2 flex-1 py-4 sm:py-5 bg-brand-gold text-brand-text rounded-2xl sm:rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-gold/20 hover:bg-brand-gold-dark transition-all flex items-center justify-center gap-3 active:scale-95 group uppercase italic">Commit Changes <Plus size={18} className="group-hover:rotate-90 transition-transform" /></button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Edit Modal - Fully Responsive */}
         {showEditModal && editingCompany && (
            <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6 backdrop-blur-3xl bg-slate-900/60 transition-all duration-500 overflow-y-auto">
               <div className="w-full max-w-2xl bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 my-auto border-t-8 border-brand-red">
                  <div className="p-6 sm:p-10 relative z-10">
                     <div className="flex items-center justify-between mb-8 sm:mb-10">
                        <div className="flex items-center gap-4 sm:gap-5">
                           <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-[1.8rem] bg-brand-red/10 flex items-center justify-center text-brand-red shadow-lg shadow-brand-red/10"><Edit3 size={24} sm:size={32} /></div>
                           <div><h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight uppercase italic">Edit Organization</h2><p className="text-[9px] sm:text-[10px] font-bold text-brand-red uppercase tracking-widest mt-0.5">Synchronize Profile Parameters</p></div>
                        </div>
                        <button onClick={() => setShowEditModal(false)} className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-[1.5rem] text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-inner"><X size={20} sm:size={24} /></button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-10">
                        <div className="space-y-2">
                           <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Entity Name</label>
                           <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-red transition-all font-bold text-sm text-slate-900 shadow-inner" value={editingCompany.name} onChange={(e) => setEditingCompany({...editingCompany, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Configuration</label>
                           <div className="relative">
                              <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-red appearance-none font-bold text-sm text-slate-900 shadow-inner" value={editingCompany.plan} onChange={(e) => setEditingCompany({...editingCompany, plan: e.target.value})}>
                                 <option>Enterprise</option><option>Professional</option><option>Basic</option>
                              </select>
                              <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Administrative Node</label>
                           <input type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-red transition-all font-bold text-sm text-slate-900 shadow-inner" value={editingCompany.email} onChange={(e) => setEditingCompany({...editingCompany, email: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Status</label>
                           <div className="relative">
                              <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-red appearance-none font-bold text-sm text-slate-900 shadow-inner" value={editingCompany.status} onChange={(e) => setEditingCompany({...editingCompany, status: e.target.value})}>
                                 <option>Active</option><option>Suspended</option><option>Pending</option>
                              </select>
                              <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button onClick={() => setShowEditModal(false)} className="order-2 sm:order-1 flex-1 py-4 sm:py-5 bg-slate-50 text-slate-400 rounded-2xl sm:rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-all">Discard Changes</button>
                        <button onClick={commitEdit} className="order-1 sm:order-2 flex-1 py-4 sm:py-5 bg-brand-red text-white rounded-2xl sm:rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-red/20 hover:bg-brand-red-dark transition-all flex items-center justify-center gap-3 active:scale-95 group italic">Commit Changes <CheckCircle2 size={18} /></button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
