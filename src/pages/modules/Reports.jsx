import { useState } from 'react';
import { BarChart3, PieChart, LineChart, FileText, Download, TrendingUp, Calendar, Users, X, CheckCircle2, ChevronRight, Filter, FileSpreadsheet, FileType } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

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
        <div className="p-6 overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
}

export default function Reports() {
  const [activeModal, setActiveModal] = useState(null); // 'generate', 'view'
  const [selectedReport, setSelectedReport] = useState(null);
  const [exportingId, setExportingId] = useState(null);
  const [toast, setToast] = useState(null);

  const sections = [
    {
      title: 'Operations Reports',
      reports: [
        { id: 'ops-1', name: 'Daily Inspection Summary', icon: FileText, date: 'Mar 14, 2026', stats: { total: 124, healthy: 118, issues: 6 } },
        { id: 'ops-2', name: 'Maintenance Backlog', icon: BarChart3, date: 'Mar 13, 2026', stats: { total: 45, pending: 30, in_progress: 15 } },
        { id: 'ops-3', name: 'Equipment Downtime', icon: LineChart, date: 'Mar 12, 2026', stats: { total: '12.5h', avg: '45m', peak: '2.5h' } },
      ]
    },
    {
      title: 'Financial Reports',
      reports: [
        { id: 'fin-1', name: 'Weekly Revenue Analysis', icon: TrendingUp, date: 'Mar 10, 2026', stats: { total: '$14,250', growth: '+12%', avg: '$2,035' } },
        { id: 'fin-2', name: 'Monthly Expense Report', icon: PieChart, date: 'Feb 28, 2026', stats: { total: '$8,400', labor: '60%', equipment: '30%', other: '10%' } },
        { id: 'fin-3', name: 'Ticket Sales Breakdown', icon: FileText, date: 'Mar 14, 2026', stats: { total: 2450, online: '75%', counter: '25%' } },
      ]
    },
    {
      title: 'Employee Reports',
      reports: [
        { id: 'emp-1', name: 'Training Completion Status', icon: Users, date: 'Mar 11, 2026', stats: { completed: '85%', pending: '15%', total_staff: 85 } },
        { id: 'emp-2', name: 'Attendance & Time Logs', icon: Calendar, date: 'Mar 14, 2026', stats: { on_time: '92%', late: '5%', absent: '3%' } },
        { id: 'emp-3', name: 'Shift Performance', icon: BarChart3, date: 'Mar 12, 2026', stats: { avg_score: 4.8, top_performer: 'J. Doe', shifts: 120 } },
      ]
    }
  ];

  const handleExport = (reportId) => {
    setExportingId(reportId);
    setTimeout(() => {
      setExportingId(null);
      setToast(`Report exported successfully!`);
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  const openViewReport = (report) => {
    setSelectedReport(report);
    setActiveModal('view');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-sm font-bold tracking-tight">{toast}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Reports</h1>
          <p className="text-slate-500 text-sm">Generate and view detailed analytics across all modules.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 group" onClick={() => setActiveModal('generate')}>
            <BarChart3 size={18} className="group-hover:rotate-12 transition-transform" />
            Generate Custom Report
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.reports.map((report) => (
                <Card key={report.id} className="hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group overflow-hidden border-slate-100">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-slate-50 text-slate-500 group-hover:bg-blue-600 group-hover:text-white rounded-xl transition-all duration-300 shadow-sm">
                        <report.icon size={24} />
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="secondary" 
                          className={`h-8 w-8 !p-0 shadow-lg shadow-brand-red/20 rounded-lg ${exportingId === report.id ? 'animate-pulse bg-blue-50' : ''}`}
                          onClick={() => handleExport(report.id)}
                          disabled={exportingId === report.id}
                        >
                          {exportingId === report.id ? (
                            <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent animate-spin rounded-full" />
                          ) : (
                            <Download size={16} />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors uppercase">{report.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={12} className="text-slate-400" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Last generated: {report.date}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4 border-dashed">
                      <button 
                        className="text-[10px] font-black text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg transition-all uppercase tracking-tighter shadow-sm border border-blue-100"
                        onClick={() => handleExport(report.id)}
                      >
                        PDF / CSV Export
                      </button>
                      <button 
                        className="text-xs font-black text-slate-600 hover:text-blue-600 transition-all flex items-center gap-1 group/btn uppercase tracking-tight"
                        onClick={() => openViewReport(report)}
                      >
                        View Report 
                        <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Generate Custom Report Modal */}
      <Modal 
        isOpen={activeModal === 'generate'} 
        onClose={() => setActiveModal(null)} 
        title="Generate Custom Report"
        maxWidth="max-w-lg"
      >
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleExport('custom'); setActiveModal(null); }}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Module</label>
            <div className="grid grid-cols-2 gap-3">
              {['Operations', 'Financial', 'Inventory', 'Personnel'].map(mod => (
                <label key={mod} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer group transition-all has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input type="radio" name="module" className="accent-blue-600" defaultChecked={mod === 'Operations'} />
                  <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700">{mod}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date From</label>
              <input type="date" className="w-full px-4 py-3 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 transition-all bg-slate-50/50" defaultValue="2026-03-01" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date To</label>
              <input type="date" className="w-full px-4 py-3 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 transition-all bg-slate-50/50" defaultValue="2026-03-16" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Export Format</label>
            <div className="flex gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 p-3 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input type="radio" name="format" className="accent-blue-600" defaultChecked />
                <FileType size={16} className="text-red-500" />
                <span className="text-xs font-black uppercase tracking-tight">PDF</span>
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 p-3 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input type="radio" name="format" className="accent-blue-600" />
                <FileSpreadsheet size={16} className="text-emerald-500" />
                <span className="text-xs font-black uppercase tracking-tight">CSV</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <Button variant="secondary" className="flex-1 py-4 font-black uppercase tracking-widest text-[10px]" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button variant="primary" className="flex-1 py-4 font-black uppercase tracking-widest text-[10px]" type="submit">
              Run Analytics
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Report Modal */}
      <Modal 
        isOpen={activeModal === 'view'} 
        onClose={() => setActiveModal(null)} 
        title={selectedReport?.name || 'Report Insights'}
        maxWidth="max-w-2xl"
      >
        {selectedReport && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(selectedReport.stats).map(([label, value]) => (
                <div key={label} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{label.replace('_', ' ')}</p>
                  <p className="text-lg font-black text-slate-800 mt-1">{value}</p>
                </div>
              ))}
            </div>

            <Card className="border-slate-100 shadow-none bg-slate-50/50">
              <CardHeader title="Performance Trend" />
              <CardContent className="h-48 flex items-end gap-2 p-6">
                {[45, 65, 35, 85, 55, 95, 75].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full bg-blue-600/10 group-hover:bg-blue-600/20 rounded-t-lg transition-all relative overflow-hidden" style={{ height: `${h}%` }}>
                      <div className="absolute inset-x-0 top-0 h-1 bg-blue-500 shadow-xl shadow-blue-500/50" />
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
                    </div>
                    <span className="text-[8px] font-black text-slate-400 uppercase">Day {i + 1}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <TrendingUp size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-blue-900 uppercase tracking-tight">AI Insight</h4>
                <p className="text-xs font-semibold text-blue-700 leading-relaxed mt-1">
                  Historical data suggests a potential 15% increase in efficiency by optimizing the current scheduling pattern.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="secondary" className="flex-1 py-4 font-black uppercase tracking-widest text-[10px]" onClick={() => setActiveModal(null)}>Close Insight</Button>
              <Button variant="primary" className="flex-1 py-4 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2" onClick={() => handleExport(selectedReport.id)}>
                <Download size={16} /> Download Copy
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
