import { useState, useMemo } from 'react';
import { 
  ClipboardCheck, Plus, FileText, Play, X, CheckCircle2, 
  AlertCircle, Info, User, Calendar, Clock, ArrowRight,
  ChevronRight, CheckCircle, AlertTriangle, Download, Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_REPORTS = [
  { id: 'INS-001', type: 'Ride Safety', status: 'Completed', date: '2026-03-14', inspector: 'John Doe', details: 'All rides passed safety checks. No issues found.', results: { 'Structure integrity': 'Pass', 'Control panel function': 'Pass', 'Emergency stop test': 'Pass', 'Seatbelt condition': 'Pass' } },
  { id: 'INS-002', type: 'Food Health', status: 'In Progress', date: '2026-03-14', inspector: 'Jane Smith', details: 'Kitchen inspection ongoing. Sanitization checked.', results: {} },
  { id: 'INS-003', type: 'Electrical', status: 'Pending', date: '2026-03-13', inspector: 'Mike Johnson', details: 'Waiting for maintenance lead approval.', results: {} },
  { id: 'INS-004', type: 'Sanitation', status: 'Completed', date: '2026-03-12', inspector: 'Sarah Wilson', details: 'Restrooms and public areas inspected.', results: { 'Floor cleanliness': 'Pass', 'Supply stock': 'Pass', 'Water function': 'Pass' } },
];

const INITIAL_TEMPLATES = [
  { name: 'Daily Ride Check', category: 'Operations', questions: ['Structure integrity', 'Control panel function', 'Emergency stop test', 'Seatbelt condition'] },
  { name: 'Food Stall Safety', category: 'Health', questions: ['Temperature logs', 'Staff hygiene', 'Storage labeling', 'Fire extinguisher check'] },
  { name: 'Night Shift Security', category: 'Security', questions: ['Perimeter check', 'Light function', 'Gate locks', 'Surveillance status'] },
  { name: 'Electrical Panel Audit', category: 'Maintenance', questions: ['Breakers check', 'Grounding test', 'Labeling update', 'Load balance'] },
];

// Local Modal Component
function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className={`bg-white rounded-3xl shadow-2xl w-full ${maxWidth} animate-in zoom-in-95 duration-200 overflow-hidden border border-white/20`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Inspections() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [activeModal, setActiveModal] = useState(null); // 'create', 'start', 'view_template', 'view_report', 'filling'
  const [selectedItem, setSelectedItem] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // Inspection Filling State
  const [fillingData, setFillingData] = useState({
    template: null,
    answers: {},
    notes: ''
  });

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenReport = (report) => {
    setSelectedItem(report);
    setActiveModal('view_report');
  };

  const handleOpenTemplate = (template) => {
    setSelectedItem(template);
    setActiveModal('view_template');
  };

  const handleStartInspection = (template) => {
    setFillingData({
      template,
      answers: template.questions.reduce((acc, q) => ({ ...acc, [q]: null }), {}),
      notes: ''
    });
    setActiveModal('filling');
  };

  const handleCompleteInspection = () => {
    const newReport = {
      id: `INS-${String(reports.length + 1).padStart(3, '0')}`,
      type: fillingData.template.name,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
      inspector: 'Admin User',
      details: fillingData.notes || 'Inspection completed successfully.',
      results: fillingData.answers
    };
    setReports([newReport, ...reports]);
    setActiveModal(null);
    showNotification(`Inspection ${newReport.id} submitted!`);
  };

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTemplate = {
      name: formData.get('name'),
      category: formData.get('category'),
      questions: formData.get('questions').split('\n').filter(q => q.trim())
    };
    setTemplates([...templates, newTemplate]);
    setActiveModal(null);
    showNotification(`Template "${newTemplate.name}" created!`);
  };

  return (
    <div className="space-y-6 relative overflow-x-hidden px-1 pb-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-[110] animate-in slide-in-from-right duration-300">
          <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800">
            <div className="bg-emerald-500/20 p-1.5 rounded-full">
               <CheckCircle2 size={18} className="text-emerald-400" />
            </div>
            <span className="text-sm font-bold tracking-tight">{notification}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Inspections</h1>
          <p className="text-slate-500 text-sm font-medium">Manage safety templates and inspection reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2 font-bold shadow-sm" onClick={() => setActiveModal('create')}>
            <Plus size={18} />
            Create Template
          </Button>
          <Button variant="primary" className="flex items-center gap-2 font-bold shadow-lg shadow-blue-500/20" onClick={() => setActiveModal('start')}>
            <Play size={18} />
            Start Inspection
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md shadow-slate-100">
          <CardHeader title="Inspection Templates" subtitle="Pre-defined safety checklists." />
          <CardContent className="px-4 pb-4">
            <ul className="space-y-3">
              {templates.map((template) => (
                <li key={template.name} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-xl group-hover:scale-110 transition-transform shadow-sm">
                      <FileText size={20} />
                    </div>
                    <div>
                        <span className="text-sm font-black text-slate-800 block leading-tight">{template.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{template.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <Button 
                        variant="secondary" 
                        className="h-9 px-4 text-xs font-black uppercase tracking-widest bg-white border-slate-100 hover:text-blue-600 shadow-sm" 
                        onClick={() => handleOpenTemplate(template)}
                     >
                        View
                     </Button>
                     <button 
                        onClick={() => handleStartInspection(template)}
                        className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:scale-110 transition-all active:scale-95"
                     >
                        <Play size={16} fill="currentColor" />
                     </button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-md shadow-slate-100 overflow-hidden">
          <CardHeader title="Inspection Reports" subtitle="History of all performed inspections." />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-50">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-6 py-4 text-sm font-black text-blue-600 tracking-tight">{report.id}</td>
                      <td className="px-6 py-4">
                         <p className="text-sm text-slate-800 font-black leading-tight">{report.type}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{report.inspector}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          report.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                          report.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{report.date}</td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                            variant="secondary" 
                            className="h-9 px-4 text-xs font-black uppercase tracking-widest bg-slate-50 border-none hover:bg-blue-600 hover:text-white transition-all shadow-sm" 
                            onClick={() => handleOpenReport(report)}
                        >
                            View Report
                        </Button>
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
        <form className="space-y-5" onSubmit={handleCreateTemplate}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Template Name</label>
            <input name="name" type="text" placeholder="e.g. Daily Ride Check" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
            <select name="category" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold appearance-none">
              <option>Operations</option>
              <option>Health & Safety</option>
              <option>Security</option>
              <option>Maintenance</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Checklist Items (One per line)</label>
            <textarea name="questions" rows={4} className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none font-bold" placeholder="Enter inspection points..." required></textarea>
          </div>
          <Button variant="primary" className="w-full py-4 font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 rounded-2xl" type="submit">Save Template</Button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'start'} onClose={() => setActiveModal(null)} title="Start New Inspection">
        <div className="space-y-5">
          <p className="text-sm text-slate-500 font-bold border-l-4 border-blue-500 pl-3 py-1">Select a template to begin the inspection process.</p>
          <div className="grid grid-cols-1 gap-3">
            {templates.map((t) => (
              <button key={t.name} onClick={() => handleStartInspection(t)} className="w-full text-left p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group">
                <div>
                   <span className="font-black text-slate-800 group-hover:text-blue-700 block transition-colors">{t.name}</span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.questions.length} Points</span>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:scale-110">
                   <Play size={16} fill="currentColor" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Inspection Filling Wizard */}
      <Modal isOpen={activeModal === 'filling'} onClose={() => setActiveModal(null)} title="Performing Inspection" maxWidth="max-w-2xl">
        {fillingData.template && (
          <div className="space-y-8">
             <div className="flex items-center justify-between bg-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-200">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                      <ClipboardCheck size={28} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black tracking-tight">{fillingData.template.name}</h3>
                      <p className="text-xs font-bold text-blue-100 uppercase tracking-widest mt-0.5">{fillingData.template.category}</p>
                   </div>
                </div>
                <div className="hidden sm:block text-right">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Date</p>
                   <p className="font-bold text-sm tracking-tight">{new Date().toLocaleDateString()}</p>
                </div>
             </div>

             <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <CheckCircle size={14} /> Critical Safety Checklist
                </h4>
                <div className="space-y-3">
                   {fillingData.template.questions.map((q, i) => (
                     <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-50 sm:bg-white rounded-3xl border border-slate-100 hover:border-blue-200 transition-all">
                        <div className="flex gap-4">
                           <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400">{i + 1}</span>
                           <span className="text-sm font-black text-slate-800 leading-tight">{q}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <button 
                             onClick={() => setFillingData({ ...fillingData, answers: { ...fillingData.answers, [q]: 'Pass' }})}
                             className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                               fillingData.answers[q] === 'Pass' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-105' : 'bg-slate-100 text-slate-400 hover:bg-emerald-50'
                             }`}
                           >Pass</button>
                           <button 
                             onClick={() => setFillingData({ ...fillingData, answers: { ...fillingData.answers, [q]: 'Fail' }})}
                             className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                               fillingData.answers[q] === 'Fail' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 scale-105' : 'bg-slate-100 text-slate-400 hover:bg-rose-50'
                             }`}
                           >Fail</button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <AlertTriangle size={14} /> Inspector Notes
                </h4>
                <textarea 
                  value={fillingData.notes}
                  onChange={(e) => setFillingData({ ...fillingData, notes: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-blue-500 outline-none resize-none font-bold placeholder:text-slate-300 min-h-[120px]"
                  placeholder="Record any issues, observations or maintenance requirements..."
                />
             </div>

             <div className="flex gap-4">
                <Button variant="secondary" className="flex-1 py-4 font-black rounded-2xl" onClick={() => setActiveModal(null)}>Discard</Button>
                <Button variant="primary" className="flex-[2] py-4 font-black rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3" onClick={handleCompleteInspection}>
                   Submit Inspection <ArrowRight size={20} />
                </Button>
             </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'view_template'} onClose={() => setActiveModal(null)} title="Template Details">
        {selectedItem && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-5 bg-slate-900 rounded-3xl text-white shadow-2xl">
              <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight leading-tight">{selectedItem.name}</h3>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-0.5">{selectedItem.category}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ClipboardCheck size={14} /> Detailed Checklist Points
              </h4>
              <ul className="space-y-2">
                {selectedItem.questions.map((q, i) => (
                  <li key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0">{i + 1}</div>
                    <span className="text-sm font-bold text-slate-700">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="primary" className="w-full py-4 font-black uppercase tracking-widest rounded-2xl" onClick={() => handleStartInspection(selectedItem)}>Use This Template</Button>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'view_report'} onClose={() => setActiveModal(null)} title="Inspection Result Report" maxWidth="max-w-xl">
        {selectedItem && (
          <div className="space-y-8">
            <div className={`p-6 rounded-3xl flex items-center justify-between shadow-xl ${
              selectedItem.status === 'Completed' ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-amber-500 text-white shadow-amber-100'
            }`}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                   {selectedItem.status === 'Completed' ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">{selectedItem.type}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-0.5">Reference ID: {selectedItem.id}</p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Status</p>
                 <span className="font-black text-sm uppercase tracking-wider">{selectedItem.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><User size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inspector</p>
                  <p className="text-sm font-black text-slate-800">{selectedItem.inspector}</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><Calendar size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inspection Date</p>
                  <p className="text-sm font-black text-slate-800">{selectedItem.date}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <ClipboardCheck size={14} /> Detailed Results
               </h4>
               <div className="grid grid-cols-1 gap-2">
                  {Object.entries(selectedItem.results || {}).length > 0 ? (
                    Object.entries(selectedItem.results).map(([q, res], i) => (
                       <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                          <span className="text-sm font-bold text-slate-700">{q}</span>
                          <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                            res === 'Pass' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}>{res}</span>
                       </div>
                    ))
                  ) : (
                    <div className="text-center p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                       <Info size={32} className="mx-auto text-slate-300 mb-2" />
                       <p className="text-xs font-bold text-slate-400">Detailed checklist data not available for this legacy report.</p>
                    </div>
                  )}
               </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <Info size={14} /> Findings Summary
              </label>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-sm font-bold text-slate-600 leading-relaxed italic relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-3xl" />
                "{selectedItem.details}"
              </div>
            </div>
            
            <Button variant="primary" className="w-full py-4 font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl bg-slate-900 border-none hover:bg-slate-800" onClick={() => showNotification("Generating PDF Report...")}>
               <Download size={20} /> Download Report (PDF)
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
