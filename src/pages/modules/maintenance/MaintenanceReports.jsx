import { useState } from 'react';
import { Download, Calendar, Wrench, CheckCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const REPORTS_DATA = [
  { id: 'REP-001', equipment: 'Ferris Wheel', totalRepairs: 4, lastMaintenance: '2024-03-10', totalDowntime: '12h', technician: 'John Doe', status: 'Operational' },
  { id: 'REP-002', equipment: 'Bumper Cars', totalRepairs: 8, lastMaintenance: '2024-03-12', totalDowntime: '24h', technician: 'Mike Smith', status: 'Critical' },
  { id: 'REP-003', equipment: 'Roller Coaster', totalRepairs: 2, lastMaintenance: '2024-03-05', totalDowntime: '6h', technician: 'Sarah Wilson', status: 'Under Maintenance' },
  { id: 'REP-004', equipment: 'Carousel', totalRepairs: 5, lastMaintenance: '2024-03-11', totalDowntime: '10h', technician: 'John Doe', status: 'Operational' },
  { id: 'REP-005', equipment: 'Tilt-A-Whirl', totalRepairs: 3, lastMaintenance: '2024-03-08', totalDowntime: '8h', technician: 'Mike Smith', status: 'Operational' },
];

export default function MaintenanceReports() {
  const [reports] = useState(REPORTS_DATA);

  const exportToCSV = () => {
    const headers = ['Report ID', 'Equipment', 'Total Repairs', 'Last Maintenance Date', 'Total Downtime', 'Technician'];
    const rows = reports.map(r => [r.id, r.equipment, r.totalRepairs, r.lastMaintenance, r.totalDowntime, r.technician]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "maintenance_reports.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-[100vw] overflow-hidden px-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Maintenance Reports</h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={exportToCSV}
            className="flex items-center justify-center gap-2 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm py-2.5 px-3 w-full sm:w-auto shadow-sm"
          >
            <Download size={16} className="sm:w-[18px]" />
            Export CSV
          </Button>
          <Button 
            onClick={exportToPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 text-xs sm:text-sm py-2.5 px-3 w-full sm:w-auto shadow-md shadow-blue-500/20"
          >
            <Download size={16} className="sm:w-[18px]" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card className="p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Calendar size={14} className="text-blue-500 sm:w-4 sm:h-4" />
              Date Range
            </label>
            <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-600 transition-all cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Wrench size={14} className="text-blue-500 sm:w-4 sm:h-4" />
              Equipment
            </label>
            <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-600 transition-all cursor-pointer">
              <option>All Equipment</option>
              <option>Ferris Wheel</option>
              <option>Roller Coaster</option>
              <option>Bumper Cars</option>
              <option>Carousel</option>
              <option>Tilt-A-Whirl</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-2">
              <CheckCircle size={14} className="text-blue-500 sm:w-4 sm:h-4" />
              Status
            </label>
            <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-600 transition-all cursor-pointer">
              <option>All Status</option>
              <option>Operational</option>
              <option>Under Maintenance</option>
              <option>Critical</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="rounded-xl shadow-sm border border-slate-200 overflow-hidden print:border-0 print:shadow-none">
        <div className="overflow-x-auto scrollbar-hide sm:scrollbar-default">
          <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Equipment</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Repairs</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Last Maint.</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Downtime</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Technician</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-blue-600 whitespace-nowrap">{report.id}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-800 font-medium whitespace-nowrap">{report.equipment}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-600 text-center">{report.totalRepairs}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-600 whitespace-nowrap">{report.lastMaintenance}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-600 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-800">
                      {report.totalDowntime}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-600 font-medium whitespace-nowrap">{report.technician}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          nav, aside, header, button, .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .flex-1 {
            padding-left: 0 !important;
          }
          .rounded-xl {
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
