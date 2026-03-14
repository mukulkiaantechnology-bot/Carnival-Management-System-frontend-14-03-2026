import { ClipboardCheck, Plus, FileText, Play } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_REPORTS = [
  { id: 'INS-001', type: 'Ride Safety', status: 'Completed', date: '2026-03-14', inspector: 'John Doe' },
  { id: 'INS-002', type: 'Food Health', status: 'In Progress', date: '2026-03-14', inspector: 'Jane Smith' },
  { id: 'INS-003', type: 'Electrical', status: 'Pending', date: '2026-03-13', inspector: 'Mike Johnson' },
  { id: 'INS-004', type: 'Sanitation', status: 'Completed', date: '2026-03-12', inspector: 'Sarah Wilson' },
  { id: 'INS-005', type: 'Structural', status: 'Completed', date: '2026-03-11', inspector: 'Robert Brown' },
];

export default function Inspections() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Inspections</h1>
          <p className="text-slate-500 text-sm">Manage safety templates and inspection reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <Plus size={18} />
            Create Template
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
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
              {['Daily Ride Check', 'Food Stall Safety', 'Night Shift Security', 'Electrical Panel Audit'].map((template) => (
                <li key={template} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-blue-500" />
                    <span className="text-sm font-medium text-slate-700">{template}</span>
                  </div>
                  <Button variant="secondary" className="h-8 px-2 text-xs">View</Button>
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
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Inspector</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_REPORTS.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">{report.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-800 font-medium">{report.type}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          report.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                          report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{report.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{report.inspector}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <Button variant="secondary" className="h-8 px-2 text-xs">View Report</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
