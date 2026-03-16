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
    <div className="space-y-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Maintenance Reports</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={exportToCSV}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm py-2 px-3 shadow-sm"
          >
            <Download size={16} />
            CSV
          </Button>
          <Button 
            onClick={exportToPDF}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 text-xs sm:text-sm py-2 px-3 shadow-md shadow-blue-500/20"
          >
            <Download size={16} />
            PDF
          </Button>
        </div>
      </div>

      <div className="px-1">
        <Card className="p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <Calendar size={14} className="text-blue-500" />
                Date Range
              </label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm transition-all">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <Wrench size={14} className="text-blue-500" />
                Equipment
              </label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm transition-all">
                <option>All Equipment</option>
              </select>
            </div>
            <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <CheckCircle size={14} className="text-blue-500" />
                Status
              </label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm transition-all">
                <option>All Status</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-1">
        <Card className="rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-slate-200 table-fixed sm:table-auto">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase w-24">ID</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase w-40">Equipment</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-center text-[10px] font-bold text-slate-500 uppercase w-20">Repairs</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase w-32">Last Maint.</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase w-28">Downtime</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase w-36">Technician</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-blue-600 text-[11px] sm:text-sm">{report.id}</td>
                      <td className="px-4 py-3 text-slate-800 font-medium truncate text-[11px] sm:text-sm">{report.equipment}</td>
                      <td className="hidden sm:table-cell px-4 py-3 text-slate-600 text-center text-[11px] sm:text-sm">{report.totalRepairs}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-[11px] sm:text-sm">{report.lastMaintenance}</td>
                      <td className="hidden md:table-cell px-4 py-3 text-slate-600 text-[11px] sm:text-sm">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800">{report.totalDowntime}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-medium truncate text-[11px] sm:text-sm">{report.technician}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
