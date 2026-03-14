import { BarChart, Download, FileText, ClipboardCheck, Calendar, Users, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

const REPORT_CATEGORIES = [
  { id: 'RC-1', title: 'Inspection Reports', desc: 'Compliance results, safety logs, and failed check deep-dives.', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'RC-2', title: 'Event Reports', desc: 'Attendance stats, location performance, and crowd density logs.', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'RC-3', title: 'Employee Activity Reports', desc: 'Shift clock-ins, on-duty hours, and event-staff mapping.', icon: Users, color: 'text-teal-600', bg: 'bg-teal-50' },
];

const REPORTS_LIST = [
  { name: 'Weekly Ride Safety Audit', type: 'Inspection', date: '2026-03-10', size: '1.2 MB' },
  { name: 'Opening Festival Attendance', type: 'Event', date: '2026-03-08', size: '845 KB' },
  { name: 'March Workforce Deployment', type: 'Employee Activity', date: '2026-03-05', size: '2.4 MB' },
  { name: 'Incident Log Summary Q1', type: 'Inspection', date: '2026-03-01', size: '1.8 MB' },
  { name: 'Staff Orientation Metrics', type: 'Employee Activity', date: '2026-02-28', size: '980 KB' },
];

export default function OperationsReports() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart className="text-emerald-500" size={24} /> Reports
          </h1>
          <p className="text-sm text-slate-500">Generate and download operations analytics.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold shadow-sm">
          <FileText size={18} /> New Report
        </button>
      </div>

      {/* Report Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {REPORT_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group">
               <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors ${cat.bg} ${cat.color} group-hover:bg-opacity-100`}>
                  <Icon size={24} />
               </div>
               <h3 className="font-bold text-slate-800 mb-2">{cat.title}</h3>
               <p className="text-xs text-slate-500 leading-relaxed">{cat.desc}</p>
               <button className="mt-5 w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors">Generate Preview</button>
            </div>
          )
        })}
      </div>

      {/* Reports Table Section */}
      <Card>
        <CardHeader title="Generated Reports" subtitle="Recently exported data files" />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] font-bold text-slate-400">
                  <th className="text-left px-5 py-4">Report Name</th>
                  <th className="text-left px-5 py-4">Type</th>
                  <th className="text-left px-5 py-4">Date</th>
                  <th className="text-right px-5 py-4">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {REPORTS_LIST.map((rpt, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-slate-50 text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-100">
                           <FileText size={14} />
                         </div>
                         <span className="font-bold">{rpt.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-200">
                        {rpt.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{rpt.date}</td>
                    <td className="px-5 py-4 text-right">
                       <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-all transform active:scale-95">
                         <Download size={14} /> Download <span className="text-[10px] opacity-60 ml-1">({rpt.size})</span>
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 border-t border-slate-100 bg-slate-50/50">
             <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Auto-Generated</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /> Secure PDF</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Excel Export</div>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
