import { useState } from 'react';
import { FileText, Plus, Search, Filter, Eye, Download, FileSignature, X, Trash2, CheckCircle2, Clock, MapPin, Calendar, FileCheck, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_CONTRACTS = [
  { id: 'CON-2026-001', event: 'Summer Gala 2026', committee: 'City Council', status: 'Active', dateSent: '2026-01-15', description: 'Annual summer fundraising gala for local charities.' },
  { id: 'CON-2026-002', event: 'County Fair', committee: 'Agri Board', status: 'Pending', dateSent: '2026-02-01', description: 'Regional agricultural exhibition and carnival.' },
  { id: 'CON-2026-003', event: 'Music Fest', committee: 'Arts Dept', status: 'Draft', dateSent: '2026-03-05', description: 'Three-day outdoor music festival featuring local artists.' },
  { id: 'CON-2026-004', event: 'Winter Wonderland', committee: 'Tourism Office', status: 'Closed', dateSent: '2025-11-10', description: 'Holiday themed attraction with ice skating and market.' },
  { id: 'CON-2026-005', event: 'Food Expo', committee: 'Catering Assoc', status: 'Active', dateSent: '2026-03-10', description: 'International food and beverage trade exhibition.' },
];

const TEMPLATES = ['Sponsorship', 'Vendor Lease', 'Service Agreement', 'Non-Disclosure'];

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
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function Contracts() {
  const [contracts, setContracts] = useState(INITIAL_CONTRACTS);
  const [activeModal, setActiveModal] = useState(null); // 'create_template', 'create_contract', 'view_details'
  const [selectedContract, setSelectedContract] = useState(null);

  // Form states
  const [newEvent, setNewEvent] = useState('');
  const [newCommittee, setNewCommittee] = useState('City Council');

  const handleCreateContract = (e) => {
    e.preventDefault();
    if (!newEvent) return;
    const newEntry = {
      id: `CON-2026-00${contracts.length + 1}`,
      event: newEvent,
      committee: newCommittee,
      status: 'Pending',
      dateSent: new Date().toISOString().split('T')[0],
      description: `Newly created contract for ${newEvent}.`
    };
    setContracts([newEntry, ...contracts]);
    setNewEvent('');
    setActiveModal(null);
  };

  const handleDelete = (id) => {
    setContracts(contracts.filter(c => c.id !== id));
  };

  const openView = (contract) => {
    setSelectedContract(contract);
    setActiveModal('view_details');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Contracts Management</h1>
          <p className="text-slate-500 text-sm">Draft, manage, and track legal agreements for events.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2" onClick={() => setActiveModal('create_template')}>
            <Plus size={18} />
            Create Template
          </Button>
          <Button variant="primary" className="flex items-center gap-2" onClick={() => setActiveModal('create_contract')}>
            <FileSignature size={18} />
            Create Contract
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-slate-100">
        <CardHeader 
          title="Active & Pending Contracts" 
          subtitle="Overview of all contractual obligations and their current status."
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Contract ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Event Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Committee</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Sent</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-blue-600 text-center">{contract.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-bold">{contract.event}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{contract.committee}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-tight ${
                        contract.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                        contract.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                        contract.status === 'Draft' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                      }`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-500">{contract.dateSent}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap space-x-2 text-center">
                      <Button variant="secondary" className="h-8 w-8 !p-0 border-slate-200" onClick={() => openView(contract)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="secondary" className="h-8 w-8 !p-0 border-red-100 text-red-500 hover:bg-red-50" onClick={() => handleDelete(contract.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-100">
          <CardHeader title="Contract Reminders" subtitle="Upcoming deadlines and renewals." />
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'Summer Gala Renewal', date: 'In 5 days', type: 'urgent' },
                { title: 'Agri Board Signature', date: 'Expected today', type: 'warning' },
                { title: 'Insurance Update', date: 'Next month', type: 'normal' },
              ].map((reminder, i) => (
                <div key={i} className={`p-4 rounded-xl border flex items-center justify-between group cursor-pointer transition-all hover:shadow-md ${
                  reminder.type === 'urgent' ? 'bg-red-50/50 border-red-100' : 
                  reminder.type === 'warning' ? 'bg-amber-50/50 border-amber-100' : 'bg-slate-50/50 border-slate-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white shadow-sm ${reminder.type === 'urgent' ? 'text-red-600' : reminder.type === 'warning' ? 'text-amber-600' : 'text-slate-600'}`}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{reminder.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{reminder.date}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-100">
          <CardHeader title="Templates" subtitle="Quick start for new agreements." />
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {TEMPLATES.map((t) => (
                <div key={t} className="p-4 rounded-2xl border-2 border-dashed border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer text-center group">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-2 text-slate-400 group-hover:bg-white group-hover:text-blue-500 transition-all">
                    <FileText size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-600 group-hover:text-blue-700">{t}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Template Modal */}
      <Modal isOpen={activeModal === 'create_template'} onClose={() => setActiveModal(null)} title="Create Agreement Template">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Template Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700" placeholder="e.g. Venue Hire Agreement" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 bg-white">
              <option>Legal</option>
              <option>Operations</option>
              <option>Vendor</option>
              <option>Partnership</option>
            </select>
          </div>
          <Button variant="primary" className="w-full py-3 font-bold uppercase tracking-widest text-xs" type="submit">Save Template</Button>
        </form>
      </Modal>

      {/* Create Contract Modal */}
      <Modal isOpen={activeModal === 'create_contract'} onClose={() => setActiveModal(null)} title="Draft New Contract">
        <form className="space-y-4" onSubmit={handleCreateContract}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Event Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700"
              placeholder="e.g. Grand Carnival 2026"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Assigning Committee</label>
            <select 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 bg-white"
              value={newCommittee}
              onChange={(e) => setNewCommittee(e.target.value)}
            >
              <option>City Council</option>
              <option>Agri Board</option>
              <option>Arts Dept</option>
              <option>Tourism Office</option>
              <option>Catering Assoc</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Agreement Type</label>
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 bg-white">
              {TEMPLATES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <Button variant="primary" className="w-full py-3 font-bold uppercase tracking-widest text-xs" type="submit">Publish & Send</Button>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal isOpen={activeModal === 'view_details'} onClose={() => setActiveModal(null)} title="Contract Details" maxWidth="max-w-lg">
        {selectedContract && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-500">
                <FileCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{selectedContract.event}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedContract.id}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-[10px] font-bold text-blue-500 uppercase">{selectedContract.committee}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-slate-100 rounded-2xl space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5"><Calendar size={12} /> Date Sent</p>
                <p className="text-sm font-bold text-slate-700">{selectedContract.dateSent}</p>
              </div>
              <div className="p-4 border border-slate-100 rounded-2xl space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5"><AlertCircle size={12} /> Status</p>
                <p className="text-sm font-bold text-emerald-600">{selectedContract.status}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Engagement Description</p>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-50 italic">
                "{selectedContract.description}"
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <Button variant="secondary" className="flex-1 font-bold text-xs" onClick={() => setActiveModal(null)}>Close</Button>
              <Button variant="primary" className="flex-[2] font-black uppercase tracking-widest text-xs h-11 flex items-center justify-center gap-2">
                <Download size={16} /> Download Copy
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
