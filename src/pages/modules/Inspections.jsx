import { useState } from 'react';
import { ClipboardCheck, Plus, FileText, Play, X, CheckCircle2, AlertCircle, Info, User, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_REPORTS = [
  { id: 'INS-001', type: 'Ride Safety', status: 'Completed', date: '2026-03-14', inspector: 'John Doe', details: 'All rides passed safety checks. No issues found.' },
  { id: 'INS-002', type: 'Food Health', status: 'In Progress', date: '2026-03-14', inspector: 'Jane Smith', details: 'Kitchen inspection ongoing. Sanitization checked.' },
  { id: 'INS-003', type: 'Electrical', status: 'Pending', date: '2026-03-13', inspector: 'Mike Johnson', details: 'Waiting for maintenance lead approval.' },
  { id: 'INS-004', type: 'Sanitation', status: 'Completed', date: '2026-03-12', inspector: 'Sarah Wilson', details: 'Restrooms and public areas inspected.' },
  { id: 'INS-005', type: 'Structural', status: 'Completed', date: '2026-03-11', inspector: 'Robert Brown', details: 'Main stage structure verified.' },
];

const MOCK_TEMPLATES = [
  { name: 'Daily Ride Check', category: 'Operations', questions: ['Structure integrity', 'Control panel function', 'Emergency stop test', 'Seatbelt condition'] },
  { name: 'Food Stall Safety', category: 'Health', questions: ['Temperature logs', 'Staff hygiene', 'Storage labeling', 'Fire extinguisher check'] },
  { name: 'Night Shift Security', category: 'Security', questions: ['Perimeter check', 'Light function', 'Gate locks', 'Surveillance status'] },
  { name: 'Electrical Panel Audit', category: 'Maintenance', questions: ['Breakers check', 'Grounding test', 'Labeling update', 'Load balance'] },
];

// Local Modal Component
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in zoom-in-95 duration-200 overflow-hidden">
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

export default function Inspections() {
  const [activeModal, setActiveModal] = useState(null); // 'create', 'start', 'view_template', 'view_report'
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenReport = (report) => {
    setSelectedItem(report);
    setActiveModal('view_report');
  };

  const handleOpenTemplate = (templateName) => {
    const template = MOCK_TEMPLATES.find(t => t.name === templateName) || { name: templateName, category: 'General', questions: ['Visual inspection', 'Documentation check'] };
    setSelectedItem(template);
    setActiveModal('view_template');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Inspections</h1>
          <p className="text-slate-500 text-sm">Manage safety templates and inspection reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2" onClick={() => setActiveModal('create')}>
            <Plus size={18} />
            Create Template
          </Button>
          <Button variant="primary" className="flex items-center gap-2" onClick={() => setActiveModal('start')}>
            <Play size={18} />
            Start Inspection
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader title="Inspection Templates" subtitle="Pre-defined safety checklists." />
          <CardContent>
            <ul className="space-y-4">
              {MOCK_TEMPLATES.map((template) => (
                <li key={template.name} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                      <FileText size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{template.name}</span>
                  </div>
                  <Button variant="secondary" className="h-8 px-3 text-xs font-bold" onClick={() => handleOpenTemplate(template.name)}>View</Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Inspection Reports" subtitle="History of all performed inspections." />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inspector</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_REPORTS.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-blue-600">{report.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-800 font-bold">{report.type}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                          report.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                          report.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">{report.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{report.inspector}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-center">
                        <Button variant="secondary" className="h-8 px-3 text-xs font-bold" onClick={() => handleOpenReport(report)}>View Report</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <Modal isOpen={activeModal === 'create'} onClose={() => setActiveModal(null)} title="Create Inspection Template">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Template Name</label>
            <input type="text" placeholder="e.g. Daily Ride Check" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Category</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium">
              <option>Operations</option>
              <option>Health & Safety</option>
              <option>Security</option>
              <option>Maintenance</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Checklist Items (One per line)</label>
            <textarea rows={4} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Enter inspection points..."></textarea>
          </div>
          <Button variant="primary" className="w-full py-2.5 font-bold" type="submit">Save Template</Button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'start'} onClose={() => setActiveModal(null)} title="Start New Inspection">
        <div className="space-y-6">
          <p className="text-sm text-slate-500 font-medium">Select a template to begin the inspection process.</p>
          <div className="space-y-3">
            {MOCK_TEMPLATES.map((t) => (
              <button key={t.name} onClick={() => setActiveModal(null)} className="w-full text-left p-4 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">{t.name}</span>
                <Play size={16} className="text-slate-300 group-hover:text-blue-500" />
              </button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'view_template'} onClose={() => setActiveModal(null)} title="Template Details">
        {selectedItem && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <FileText className="text-blue-500" size={24} />
              <div>
                <h3 className="font-bold text-slate-800">{selectedItem.name}</h3>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{selectedItem.category}</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ClipboardCheck size={14} /> Checklist Items
              </h4>
              <ul className="space-y-2">
                {selectedItem.questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">{i + 1}</div>
                    <span className="text-sm font-medium text-slate-700">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'view_report'} onClose={() => setActiveModal(null)} title="Inspection Report Result">
        {selectedItem && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl flex items-center justify-between ${
              selectedItem.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              <div className="flex items-center gap-3">
                {selectedItem.status === 'Completed' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                <div>
                  <h3 className="font-bold">{selectedItem.type}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">ID: {selectedItem.id}</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 bg-white/50 rounded-full">{selectedItem.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                <User size={16} className="text-slate-400" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Inspector</p>
                  <p className="text-sm font-bold text-slate-700">{selectedItem.inspector}</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                <Calendar size={16} className="text-slate-400" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Date</p>
                  <p className="text-sm font-bold text-slate-700">{selectedItem.date}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                <Info size={14} /> Findings Summary
              </label>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium text-slate-600 leading-relaxed italic">
                "{selectedItem.details}"
              </div>
            </div>
            
            <Button variant="secondary" className="w-full font-bold" onClick={() => setActiveModal(null)}>Download PDF Report</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
