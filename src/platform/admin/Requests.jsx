import { useState, useEffect } from 'react';
import {
  Building2, Mail, BadgeCheck, XCircle, Search,
  ArrowUpRight, MailQuestion, Check, X, Filter, Loader2,
  Calendar, User, CreditCard, ShieldCheck
} from 'lucide-react';
import { Card } from '../../components/ui/Card';

// Local Modal Component
function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-3xl shadow-2xl w-full ${maxWidth} animate-in zoom-in-95 duration-200 overflow-hidden border border-brand-gold/20`}>
        <div className="p-6 sm:p-8 border-b border-brand-gold/10 flex items-center justify-between bg-brand-light/30">
          <h2 className="text-xl font-black text-brand-red uppercase italic tracking-tight">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-brand-red p-2 hover:bg-brand-red/5 rounded-xl transition-all" title="Close">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[85vh]">{children}</div>
      </div>
    </div>
  );
}

const MOCK_REQUESTS = [
  { id: 'REQ-8821', companyName: 'Funland Parks', adminName: 'Michael Scott', email: 'michael@funland.com', status: 'Pending', plan: 'Enterprise', date: new Date().toISOString() },
  { id: 'REQ-7241', companyName: 'Oceanic Carnival', adminName: 'Sarah Jenkins', email: 'sarah@oceanic.com', status: 'Approved', plan: 'Professional', date: new Date().toISOString() },
  { id: 'REQ-9102', companyName: 'Mountain High Rides', adminName: 'David Miller', email: 'david@mountainhigh.com', status: 'Rejected', plan: 'Basic', date: new Date().toISOString() },
];

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetails = (req) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem('platform_requests') || '[]');
    if (saved.length === 0) {
      saved = MOCK_REQUESTS;
      localStorage.setItem('platform_requests', JSON.stringify(MOCK_REQUESTS));
    }
    setRequests(saved);
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const handleAction = (id, newStatus) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
    localStorage.setItem('platform_requests', JSON.stringify(updated));
  };

  const filteredRequests = filter === 'All'
    ? requests
    : requests.filter(r => r.status === filter);

  return (
    <div className="space-y-6 sm:space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-red tracking-tight uppercase italic">Company Requests</h1>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-brand-orange animate-pulse"></div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Onboarding Pipeline</p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4">
          <div className="flex-1 sm:flex-none relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red opacity-40" size={18} />
            <input
              type="text"
              placeholder="Search active requests..."
              className="w-full sm:w-64 pl-11 pr-6 py-3 bg-brand-light border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 transition-all text-sm font-black text-brand-text shadow-inner"
            />
          </div>
          <div className="flex-1 sm:flex-none relative">
            <select
              className="w-full px-6 py-3 bg-white border border-brand-gold/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-brand-text outline-none appearance-none shadow-sm cursor-pointer hover:bg-brand-light transition-all min-w-[120px]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <Filter size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-red/40 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-brand-gold/20 shadow-xl shadow-brand-gold/5 overflow-hidden">
        {isLoading ? (
          <div className="py-20 sm:p-32 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-brand-red" size={48} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Hydrating Pipeline...</p>
          </div>
        ) : (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-brand-light">
                  <th className="px-6 sm:px-8 py-6 sm:py-8 text-[10px] font-black text-brand-red uppercase tracking-widest">Company Protocol</th>
                  <th className="px-6 sm:px-8 py-6 sm:py-8 text-[10px] font-black text-brand-red uppercase tracking-widest">Execution Lead</th>
                  <th className="px-6 sm:px-8 py-6 sm:py-8 text-[10px] font-black text-brand-red uppercase tracking-widest text-center">Plan Tier</th>
                  <th className="px-6 sm:px-8 py-6 sm:py-8 text-[10px] font-black text-brand-red uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 sm:px-8 py-6 sm:py-8 text-[10px] font-black text-brand-red uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-brand-light/50 transition-colors group">
                    <td className="px-6 sm:px-8 py-6 sm:py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-light flex items-center justify-center text-brand-red shrink-0 border border-brand-gold/10 shadow-inner">
                          <Building2 size={24} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm sm:text-base font-black text-brand-text tracking-tight mb-0.5 uppercase italic truncate">{req.companyName}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-brand-orange"></span> {req.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 sm:px-8 py-6 sm:py-8">
                      <p className="text-sm font-black text-slate-700">{req.adminName}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="p-1 bg-brand-red/10 rounded-md">
                          <Mail size={10} className="text-brand-red" />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{req.email}</span>
                      </div>
                    </td>
                    <td className="px-6 sm:px-8 py-6 sm:py-8 text-center">
                      <div className="flex flex-col items-center gap-1 min-w-[100px]">
                        <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest border shadow-inner ${req.plan === 'Basic' ? 'bg-slate-50 border-slate-200 text-slate-400' :
                            req.plan === 'Professional' ? 'bg-brand-orange/10 border-brand-orange/20 text-brand-orange' : 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold'
                          }`}>
                          {req.plan}
                        </span>
                        {req.duration && (
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter italic">
                            ({req.duration})
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 sm:px-8 py-6 sm:py-8 text-center">
                      <div className="flex items-center justify-center gap-2.5 min-w-[100px]">
                        <div className={`w-2 h-2 rounded-full ${req.status === 'Pending' ? 'bg-amber-500 animate-pulse' :
                            req.status === 'Approved' ? 'bg-emerald-500' : 'bg-red-500'
                          }`}></div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${req.status === 'Pending' ? 'text-amber-600' :
                            req.status === 'Approved' ? 'text-emerald-600' : 'text-red-600'
                          }`}>{req.status}</span>
                      </div>
                    </td>
                    <td className="px-6 sm:px-8 py-6 sm:py-8 text-right min-w-[120px]">
                      {req.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleAction(req.id, 'Approved')}
                            className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-lg shadow-emerald-500/10 group/btn"
                            title="Approve Request"
                          >
                            <Check size={20} className="group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleAction(req.id, 'Rejected')}
                            className="w-10 h-10 flex items-center justify-center bg-brand-red/5 text-brand-red rounded-xl hover:bg-brand-red hover:text-white transition-all shadow-lg shadow-brand-red/10 group/btn"
                            title="Reject Request"
                          >
                            <X size={20} className="group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => openDetails(req)}
                          className="px-4 py-2 bg-brand-light text-[10px] font-black text-brand-red uppercase tracking-widest rounded-xl hover:bg-brand-red hover:text-white transition-all border border-brand-gold/10 shadow-sm active:scale-95"
                        >
                          DETAILS
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRequests.length === 0 && (
              <div className="py-20 sm:p-32 text-center flex flex-col items-center gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-light rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center text-brand-red/20 border-4 border-white shadow-inner">
                  <MailQuestion size={40} sm:size={48} />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-black text-brand-text uppercase tracking-tight">Archive Clear</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">No pending requests at the moment.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Insight"
        maxWidth="max-w-xl"
      >
        {selectedRequest && (
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-6 bg-brand-light/50 rounded-3xl border border-brand-gold/10">
              <div className="w-16 h-16 rounded-2xl bg-white border border-brand-gold/20 flex items-center justify-center text-brand-red shadow-sm">
                <Building2 size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-brand-text uppercase italic leading-none mb-1">{selectedRequest.companyName}</h3>
                <p className="text-[10px] font-black text-brand-orange uppercase tracking-[.2em]">{selectedRequest.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-slate-100 rounded-2xl space-y-1 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <User size={12} className="text-brand-gold" /> Execution Lead
                </p>
                <p className="text-sm font-black text-brand-text italic uppercase">{selectedRequest.adminName}</p>
              </div>
              <div className="p-5 bg-white border border-slate-100 rounded-2xl space-y-1 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={12} className="text-brand-gold" /> System Email
                </p>
                <p className="text-sm font-black text-brand-text lowercase italic truncate">{selectedRequest.email}</p>
              </div>
              <div className="p-5 bg-white border border-slate-100 rounded-2xl space-y-1 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <CreditCard size={12} className="text-brand-gold" /> Plan Tier
                </p>
                <p className="text-sm font-black text-brand-text italic uppercase">{selectedRequest.plan}</p>
              </div>
              <div className="p-5 bg-white border border-slate-100 rounded-2xl space-y-1 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={12} className="text-brand-gold" /> Audit Status
                </p>
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${selectedRequest.status === 'Approved' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                   <p className={`text-sm font-black italic uppercase ${selectedRequest.status === 'Approved' ? 'text-emerald-600' : 'text-red-600'}`}>{selectedRequest.status}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-[2rem] text-white/90 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <BadgeCheck size={80} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-3">Onboarding Summary</h4>
              <p className="text-xs font-medium leading-relaxed italic pr-12">
                This request has been processed and verified by the platform administration. All operational protocols for the <span className="text-brand-gold font-black">"{selectedRequest.plan}"</span> tier have been initialized.
              </p>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Calendar size={14} className="text-brand-orange" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Processed: {new Date(selectedRequest.date).toLocaleDateString()}</span>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-red-dark transition-all shadow-lg shadow-brand-red/20"
                >
                  Close Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
