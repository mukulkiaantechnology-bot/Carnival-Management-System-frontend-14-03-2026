import { useState, useMemo } from 'react';
import {
  FileText, Plus, Search, Filter, Eye, Download, FileSignature, X,
  Trash2, CheckCircle2, Clock, MapPin, Calendar, FileCheck, AlertCircle,
  ArrowUpRight, Share2, ClipboardList, ShieldCheck, Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_CONTRACTS = [
  { id: 'CON-2026-001', event: 'Summer Gala 2026', committee: 'City Council', status: 'Active', dateSent: '2026-01-15', description: 'Annual summer fundraising gala for local charities.' },
  { id: 'CON-2026-002', event: 'County Fair', committee: 'Agri Board', status: 'Pending', dateSent: '2026-02-01', description: 'Regional agricultural exhibition and carnival.' },
  { id: 'CON-2026-003', event: 'Music Fest', committee: 'Arts Dept', status: 'Draft', dateSent: '2026-03-05', description: 'Three-day outdoor music festival featuring local artists.' },
  { id: 'CON-2026-004', event: 'Winter Wonderland', committee: 'Tourism Office', status: 'Closed', dateSent: '2025-11-10', description: 'Holiday themed attraction with ice skating and market.' },
  { id: 'CON-2026-005', event: 'Food Expo', committee: 'Catering Assoc', status: 'Active', dateSent: '2026-03-10', description: 'International food and beverage trade exhibition.' },
];

const INITIAL_TEMPLATES = [
  { id: 1, name: 'Sponsorship', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 2, name: 'Vendor Lease', icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 3, name: 'Service Agreement', icon: FileCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 4, name: 'Non-Disclosure', icon: ClipboardList, color: 'text-amber-500', bg: 'bg-amber-50' },
];

// Local Modal Component with Premium Styling
function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className={`bg-white rounded-[2rem] shadow-2xl w-full ${maxWidth} animate-in zoom-in-95 duration-300 overflow-hidden border border-white/20`}>
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">{title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-600 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-2xl transition-all" title="Close">
            <X size={24} />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

export default function Contracts() {
  const [contracts, setContracts] = useState(INITIAL_CONTRACTS);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  // Form states
  const [newContract, setNewContract] = useState({ event: '', committee: 'City Council', type: 'Sponsorship' });
  const [newTemplate, setNewTemplate] = useState({ name: '', category: 'Legal' });

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateContract = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `CON-2026-0${contracts.length + 10}`,
      event: newContract.event,
      committee: newContract.committee,
      status: 'Pending',
      dateSent: new Date().toISOString().split('T')[0],
      description: `Newly published ${newContract.type} for ${newContract.event}.`
    };
    setContracts([newEntry, ...contracts]);
    setNewContract({ event: '', committee: 'City Council', type: 'Sponsorship' });
    setActiveModal(null);
    showNotification(`Contract for "${newEntry.event}" has been published.`);
  };

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      name: newTemplate.name,
      icon: FileSignature,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    };
    setTemplates([...templates, newEntry]);
    setNewTemplate({ name: '', category: 'Legal' });
    setActiveModal(null);
    showNotification(`Template "${newTemplate.name}" created successfully.`);
  };

  const handleDelete = (id, event) => {
    if (window.confirm(`Are you sure you want to delete the contract for "${event}"?`)) {
      setContracts(contracts.filter(c => c.id !== id));
      showNotification(`Contract for "${event}" has been deleted.`, 'error');
    }
  };

  const filteredContracts = useMemo(() => {
    return contracts.filter(c =>
      c.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contracts, searchTerm]);

  return (
    <div className="space-y-8 px-1 pb-10 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-8 z-[110] animate-in slide-in-from-right duration-300">
          <div className={`${notification.type === 'error' ? 'bg-rose-600' : 'bg-slate-900'} text-white px-6 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 border border-white/10`}>
            <div className="bg-white/20 p-2 rounded-xl">
              {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
            </div>
            <span className="text-sm font-black tracking-tight">{notification.msg}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Contracts Management</h1>
          <p className="text-slate-500 text-sm font-bold">Draft, manage, and track legal agreements for carnival events.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-bold w-72 shadow-sm"
            />
          </div>
          <Button
            variant="secondary"
            className="flex-1 flex items-center justify-center gap-2 font-black h-10 sm:h-12 px-4 rounded-2xl shadow-lg text-[10px] sm:text-xs"
            onClick={() => setActiveModal('create_template')}
          >
            <Plus size={18} strokeWidth={3} />
            Create Template
          </Button>
          <Button
            variant="primary"
            className="flex-1 flex items-center justify-center gap-2 font-black h-10 sm:h-12 px-4 rounded-2xl shadow-xl shadow-brand-gold/20 text-[10px] sm:text-xs"
            onClick={() => setActiveModal('create_contract')}
          >
            <FileSignature size={18} />
            Draft Contract
          </Button>
        </div>
      </div>

      <Card className="shadow-2xl shadow-slate-200/50 border-none overflow-hidden rounded-[2.5rem]">
        <CardHeader
          title="Active & Pending Agreements"
          subtitle="Real-time overview of all contractual obligations and their current live status."
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-32">ID</th>
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Agreement & Committee</th>
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Sent Date</th>
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-slate-50/40 transition-all group">
                    <td className="px-8 py-6 text-center">
                      <span className="text-xs font-black text-blue-600 bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100 group-hover:scale-110 transition-transform inline-block lowercase italic">
                        {contract.id}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-800 leading-none">{contract.event}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1.5">{contract.committee}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`inline-flex items-center px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${contract.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                        contract.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                          contract.status === 'Draft' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs font-black text-slate-500">
                        <Calendar size={14} className="text-slate-300" />
                        {contract.dateSent}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 transition-all">
                        <button
                          className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-2xl transition-all shadow-sm border border-slate-100 bg-white"
                          title="View Details"
                          onClick={() => { setSelectedContract(contract); setActiveModal('view_details'); }}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-3 text-slate-400 hover:text-rose-600 hover:bg-white rounded-2xl transition-all shadow-sm border border-slate-100 bg-white"
                          title="Delete Contract"
                          onClick={() => handleDelete(contract.id, contract.event)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredContracts.length === 0 && (
              <div className="p-20 text-center">
                <Search size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No contracts found matching your search</p>
                <button onClick={() => setSearchTerm('')} className="mt-4 text-xs font-bold text-blue-600 hover:underline">Clear search results</button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-2 shadow-2xl shadow-slate-200/50 border-none rounded-[2.5rem]">
          <CardHeader title="Contract Reminders" subtitle="Upcoming deadlines and signature required." />
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Summer Gala Renewal', date: 'In 5 days', type: 'urgent', icon: AlertCircle },
                { title: 'Agri Board Signature', date: 'Expected today', type: 'warning', icon: Clock },
                { title: 'Insurance Update', date: 'Next month', type: 'normal', icon: FileCheck },
              ].map((reminder, i) => (
                <div key={i} className={`p-5 rounded-3xl border flex items-center justify-between group cursor-pointer transition-all hover:translate-x-1 ${reminder.type === 'urgent' ? 'bg-rose-50/30 border-rose-100' :
                  reminder.type === 'warning' ? 'bg-amber-50/30 border-amber-100' : 'bg-slate-50/30 border-slate-100'
                  }`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-white shadow-sm ${reminder.type === 'urgent' ? 'text-rose-500' : reminder.type === 'warning' ? 'text-amber-500' : 'text-slate-500'}`}>
                      <reminder.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 leading-tight">{reminder.title}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{reminder.date}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} className="text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-2xl shadow-slate-200/50 border-none rounded-[2.5rem]">
          <CardHeader title="Quick Templates" subtitle="Select a template structure to start a new agreement." />
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {templates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setNewContract({ ...newContract, type: t.name });
                    setActiveModal('create_contract');
                  }}
                  className="p-6 rounded-[2rem] border-2 border-dashed border-slate-100 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className={`w-14 h-14 ${t.bg} rounded-2xl flex items-center justify-center mb-4 ${t.color} group-hover:rotate-12 transition-transform shadow-sm`}>
                    <t.icon size={24} strokeWidth={2.5} />
                  </div>
                  <p className="text-sm font-black text-slate-800 leading-tight">{t.name}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1 italic">Click to use template</p>
                  <Plus size={20} className="absolute top-6 right-6 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
              <div
                onClick={() => setActiveModal('create_template')}
                className="p-6 rounded-[2rem] border-2 border-dashed border-slate-100 bg-slate-50/30 hover:border-slate-300 hover:bg-slate-50 flex flex-col items-center justify-center cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform mb-2">
                  <Plus size={20} strokeWidth={3} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Template</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Template Modal */}
      <Modal isOpen={activeModal === 'create_template'} onClose={() => setActiveModal(null)} title="Create Agreement Template">
        <form className="space-y-6" onSubmit={handleCreateTemplate}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Template Name</label>
            <input
              required
              type="text"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700 shadow-sm"
              placeholder="e.g. Venue Hire Agreement 2026"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Category / Department</label>
            <div className="grid grid-cols-2 gap-3">
              {['Legal', 'Operations', 'Vendor', 'Partnership'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setNewTemplate({ ...newTemplate, category: cat })}
                  className={`py-3 px-4 rounded-xl text-xs font-black transition-all border ${newTemplate.category === cat ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4">
            <Button variant="primary" className="w-full h-11 sm:h-14 font-black uppercase tracking-widest text-[9px] sm:text-[10px] rounded-2xl shadow-xl shadow-blue-500/20" type="submit">
              Save Template
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Contract Modal */}
      <Modal isOpen={activeModal === 'create_contract'} onClose={() => setActiveModal(null)} title="Draft New Carnival Agreement">
        <form className="space-y-5" onSubmit={handleCreateContract}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Target Event Name</label>
            <input
              required
              type="text"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
              placeholder="e.g. Grand Carnival 2026"
              value={newContract.event}
              onChange={(e) => setNewContract({ ...newContract, event: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Committee</label>
              <select
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_16px_center] bg-no-repeat appearance-none shadow-sm"
                value={newContract.committee}
                onChange={(e) => setNewContract({ ...newContract, committee: e.target.value })}
              >
                <option>City Council</option>
                <option>Agri Board</option>
                <option>Arts Dept</option>
                <option>Tourism Office</option>
                <option>Catering Assoc</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Agreement Structure</label>
              <select
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_16px_center] bg-no-repeat appearance-none shadow-sm"
                value={newContract.type}
                onChange={(e) => setNewContract({ ...newContract, type: e.target.value })}
              >
                {templates.map(t => <option key={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>
          <div className="pt-4 flex gap-4">
            <Button variant="secondary" className="flex-1 h-10 sm:h-12 font-black rounded-2xl text-[10px]" type="button" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button variant="primary" className="flex-[2] h-10 sm:h-12 font-black uppercase tracking-widest text-[9px] sm:text-[10px] rounded-2xl shadow-xl shadow-brand-gold/20" type="submit">Publish Draft</Button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal isOpen={activeModal === 'view_details'} onClose={() => setActiveModal(null)} title="Contract Analysis" maxWidth="max-w-lg">
        {selectedContract && (
          <div className="space-y-8">
            <div className="flex items-center gap-5 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 shadow-inner">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-center justify-center text-blue-600">
                <ShieldCheck size={32} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-lg font-black text-slate-800 leading-tight">{selectedContract.event}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-2.5 py-1 rounded-lg border border-slate-100">{selectedContract.id}</span>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-tight">{selectedContract.committee}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={14} /> Date Issued
                </p>
                <p className="text-sm font-black text-slate-700">{selectedContract.dateSent}</p>
              </div>
              <div className="p-5 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={14} /> Current Status
                </p>
                <p className={`text-sm font-black ${selectedContract.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>{selectedContract.status}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Agreement Scope Details</p>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative text-sm text-slate-600 leading-relaxed bg-white p-6 rounded-[1.8rem] border border-slate-50 italic">
                  "{selectedContract.description}"
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <Button variant="secondary" className="flex-1 h-10 sm:h-12 font-black rounded-2xl text-[10px]" onClick={() => setActiveModal(null)}>Close</Button>
              <Button variant="primary" className="flex-[2] font-black uppercase tracking-widest text-[9px] sm:text-[10px] h-10 sm:h-12 rounded-2xl shadow-2xl shadow-brand-gold/20 flex items-center justify-center gap-2 group">
                <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                Download Copy
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
