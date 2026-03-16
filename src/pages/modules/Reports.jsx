import { BarChart3, PieChart, LineChart, FileText, Download, TrendingUp, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function Reports() {
  const sections = [
    {
      title: 'Operations Reports',
      reports: [
        { name: 'Daily Inspection Summary', icon: FileText, date: 'Mar 14, 2026' },
        { name: 'Maintenance Backlog', icon: BarChart3, date: 'Mar 13, 2026' },
        { name: 'Equipment Downtime', icon: LineChart, date: 'Mar 12, 2026' },
      ]
    },
    {
      title: 'Financial Reports',
      reports: [
        { name: 'Weekly Revenue Analysis', icon: TrendingUp, date: 'Mar 10, 2026' },
        { name: 'Monthly Expense Report', icon: PieChart, date: 'Feb 28, 2026' },
        { name: 'Ticket Sales Breakdown', icon: FileText, date: 'Mar 14, 2026' },
      ]
    },
    {
      title: 'Employee Reports',
      reports: [
        { name: 'Training Completion Status', icon: Users, date: 'Mar 11, 2026' },
        { name: 'Attendance & Time Logs', icon: Calendar, date: 'Mar 14, 2026' },
        { name: 'Shift Performance', icon: BarChart3, date: 'Mar 12, 2026' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Reports</h1>
          <p className="text-slate-500 text-sm">Generate and view detailed analytics across all modules.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <BarChart3 size={18} />
            Generate Custom Report
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="text-lg font-bold text-slate-700 ml-1">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.reports.map((report) => (
                <Card key={report.name} className="hover:border-blue-200 transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-xl transition-colors">
                        <report.icon size={24} />
                      </div>
                      <Button variant="secondary" className="h-8 w-8 !p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download size={16} />
                      </Button>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-bold text-slate-800">{report.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">Last generated: {report.date}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">PDF / CSV</span>
                      <button className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
                        View Report →
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
