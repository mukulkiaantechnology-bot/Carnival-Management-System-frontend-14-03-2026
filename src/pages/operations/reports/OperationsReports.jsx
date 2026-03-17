import { useState } from 'react';
import { BarChart, Download, FileText, ClipboardCheck, Calendar, Users, Briefcase, Plus, X, Eye, Loader2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

const REPORT_CATEGORIES = [
  { id: 'RC-1', title: 'Inspection Reports', desc: 'Compliance results, safety logs, and failed check deep-dives.', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50', sampleData: [
    { id: 1, item: 'Roller Coaster Brake System', status: 'Passed', date: '2026-03-15' },
    { id: 2, item: 'Ferris Wheel Carriage Locks', status: 'Passed', date: '2026-03-15' },
    { id: 3, item: 'Food Stall Hygiene Audit', status: 'Requires Attention', date: '2026-03-14' },
  ]},
  { id: 'RC-2', title: 'Event Reports', desc: 'Attendance stats, location performance, and crowd density logs.', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50', sampleData: [
    { id: 1, metric: 'Peak Attendance', value: '4,500', time: '18:00' },
    { id: 2, metric: 'Main Stage Crowd Density', value: 'High', time: '20:30' },
    { id: 3, metric: 'Ticket Conversions', value: '72%', time: 'End of Day' },
  ]},
  { id: 'RC-3', title: 'Employee Activity Reports', desc: 'Shift clock-ins, on-duty hours, and event-staff mapping.', icon: Users, color: 'text-teal-600', bg: 'bg-teal-50', sampleData: [
    { id: 1, staff: 'James Carter', shift: '08:00 - 16:00', task: 'Ride Ops' },
    { id: 2, staff: 'Maria Lopez', shift: '10:00 - 18:00', task: 'Catering' },
    { id: 3, staff: 'David Kim', shift: 'On Call', task: 'Maintenance' },
  ]},
];

const INITIAL_REPORTS = [
  { id: 1, name: 'Weekly Ride Safety Audit', type: 'Inspection', date: '2026-03-10', size: '1.2 MB' },
  { id: 2, name: 'Opening Festival Attendance', type: 'Event', date: '2026-03-08', size: '845 KB' },
  { id: 3, name: 'March Workforce Deployment', type: 'Employee Activity', date: '2026-03-05', size: '2.4 MB' },
  { id: 4, name: 'Incident Log Summary Q1', type: 'Inspection', date: '2026-03-01', size: '1.8 MB' },
  { id: 5, name: 'Staff Orientation Metrics', type: 'Employee Activity', date: '2026-02-28', size: '980 KB' },
];

export default function OperationsReports() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [newReport, setNewReport] = useState({ name: '', type: 'Inspection' });
  const [downloadingId, setDownloadingId] = useState(null);

  const handleGeneratePreview = (category) => {
    setPreviewData(category);
    setShowPreviewModal(true);
  };

  const handleCreateReport = () => {
    if (!newReport.name) return;
    const newEntry = {
      id: Date.now(),
      name: newReport.name,
      type: newReport.type,
      date: new Date().toISOString().split('T')[0],
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`
    };
    setReports([newEntry, ...reports]);
    setShowNewReportModal(false);
    setNewReport({ name: '', type: 'Inspection' });
  };

  const handleDownload = (id) => {
    setDownloadingId(id);
    // Simulate thinking/generating
    setTimeout(() => {
      setDownloadingId(null);
      // Dummy download trigger
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart className="text-emerald-500" size={24} /> Reports
          </h1>
          <p className="text-sm text-slate-500">Generate and download operations analytics.</p>
        </div>
        <button 
          onClick={() => setShowNewReportModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
        >
          <Plus size={18} /> New Report
        </button>
      </div>

      {/* Report Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {REPORT_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
               <div>
                 <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors ${cat.bg} ${cat.color} group-hover:bg-opacity-100`}>
                    <Icon size={24} />
                 </div>
                 <h3 className="font-bold text-slate-800 mb-2 truncate">{cat.title}</h3>
                 <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{cat.desc}</p>
               </div>
               <button 
                 onClick={() => handleGeneratePreview(cat)}
                 className="mt-5 w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer active:scale-[0.98]"
               >
                 Generate Preview
               </button>
            </div>
          )
        })}
      </div>

      {/* Reports Table Section */}
      <Card>
        <CardHeader title="Generated Reports" subtitle="Recently exported data files" />
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] font-bold text-slate-400">
                  <th className="text-left px-5 py-4">Report Name</th>
                  <th className="text-left px-5 py-4">Type</th>
                  <th className="text-left px-5 py-4">Date</th>
                  <th className="text-right px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {reports.map((rpt) => (
                  <tr key={rpt.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-5 py-4 max-w-[250px]">
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-slate-50 text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-100 shrink-0">
                           <FileText size={14} />
                         </div>
                         <span className="font-bold text-slate-800 truncate block">{rpt.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-200">
                        {rpt.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{rpt.date}</td>
                    <td className="px-5 py-4 text-right">
                       <button 
                        disabled={downloadingId === rpt.id}
                        onClick={() => handleDownload(rpt.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all transform shrink-0 cursor-pointer ${downloadingId === rpt.id ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:scale-95'}`}>
                         {downloadingId === rpt.id ? (
                           <>
                             <Loader2 size={14} className="animate-spin" /> Preparing...
                           </>
                         ) : (
                           <>
                             <Download size={14} /> Download <span className="text-[10px] opacity-60 ml-1">({rpt.size})</span>
                           </>
                         )}
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {reports.length === 0 && (
            <div className="p-10 text-center text-slate-400 italic">No reports found.</div>
          )}
          <div className="p-5 border-t border-slate-100 bg-slate-50/50">
             <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Auto-Generated</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /> Secure PDF</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Excel Export</div>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* NEW REPORT MODAL */}
      {showNewReportModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowNewReportModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Generate New Report</h2>
              <button onClick={() => setShowNewReportModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Report Type</label>
                <select 
                  value={newReport.type} 
                  onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none"
                >
                  <option value="Inspection">Inspection Report</option>
                  <option value="Event">Event Report</option>
                  <option value="Employee Activity">Employee Activity Report</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Report Name</label>
                <input 
                  type="text" 
                  value={newReport.name}
                  onChange={(e) => setNewReport({...newReport, name: e.target.value})}
                  placeholder="e.g. Monthly Safety Audit"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowNewReportModal(false)} className="flex-1 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">Discard</button>
              <button onClick={handleCreateReport} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer">Generate Report</button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {showPreviewModal && previewData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowPreviewModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${previewData.bg} ${previewData.color}`}>
                  <previewData.icon size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">{previewData.title} Preview</h2>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
               <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white/50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Sample Data</span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> SYNCED</span>
               </div>
               <div className="p-0 overflow-x-auto">
                 <table className="w-full text-xs">
                    <thead>
                       <tr className="bg-slate-100/50">
                          {Object.keys(previewData.sampleData[0]).filter(k=>k!=='id').map(key => (
                            <th key={key} className="text-left px-5 py-3 uppercase font-bold text-slate-500">{key}</th>
                          ))}
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {previewData.sampleData.map(row => (
                         <tr key={row.id} className="bg-white/50">
                            {Object.entries(row).filter(([k])=>k!=='id').map(([key, val]) => (
                               <td key={key} className={`px-5 py-3 font-medium ${val === 'Passed' ? 'text-emerald-600' : 'text-slate-700'}`}>{val}</td>
                            ))}
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>

            <div className="flex justify-between items-center bg-amber-50 rounded-xl p-4 border border-amber-100">
               <div className="flex items-center gap-3">
                  <Eye className="text-amber-600" size={20} />
                  <p className="text-xs font-medium text-amber-800 leading-tight">This is a dynamic preview of the current system state. Some fields may update live.</p>
               </div>
               <button onClick={() => setShowPreviewModal(false)} className="px-4 py-2 bg-white text-amber-700 text-xs font-bold rounded-lg border border-amber-200 whitespace-nowrap hover:bg-amber-100 transition-all cursor-pointer">Got It</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
