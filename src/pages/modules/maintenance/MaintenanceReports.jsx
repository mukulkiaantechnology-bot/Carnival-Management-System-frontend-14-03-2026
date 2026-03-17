import { useState } from 'react';
import { Download, Calendar, Wrench, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';
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
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4 sm:px-0">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-brand-red tracking-tight italic uppercase">Maintenance Reports</h1>
          <p className="text-sm text-slate-500 font-bold">Analyze equipment history and uptime.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={exportToCSV}
            className="flex-1 sm:flex-none h-12 bg-white border-brand-red/10 text-brand-red rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-red/5 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Download size={18} strokeWidth={3} /> CSV
          </Button>
          <Button 
            onClick={exportToPDF}
            className="flex-1 sm:flex-none h-12 bg-brand-gold text-brand-text rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-gold-dark transition-all shadow-2xl shadow-brand-gold/20 active:scale-95 cursor-pointer"
          >
            <Download size={18} strokeWidth={3} /> PDF
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-0">
        <Card className="p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1 block">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                <select className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-brand-red/10 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all appearance-none cursor-pointer">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1 block">Equipment Focus</label>
              <div className="relative">
                <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                <select className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-brand-red/10 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all appearance-none cursor-pointer">
                  <option>All Equipment</option>
                </select>
              </div>
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1 block">Status Filter</label>
              <div className="relative">
                <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                <select className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none">
                  <option>All Status</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 sm:px-0">
          <h2 className="text-lg font-black text-brand-red uppercase tracking-tight italic">Report Registry</h2>
          <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest">{reports.length} Records found</span>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block">
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 uppercase text-[10px] font-black text-slate-400 tracking-widest leading-none">
                    <th className="text-left px-6 py-5">ID</th>
                    <th className="text-left px-6 py-5">Equipment</th>
                    <th className="text-center px-4 py-5">Repairs</th>
                    <th className="text-left px-6 py-5">Last Maint.</th>
                    <th className="text-left px-6 py-5">Technician</th>
                    <th className="text-right px-6 py-5">Downtime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-bold">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/30 transition-all group cursor-pointer">
                      <td className="px-6 py-5 font-mono text-[10px] font-black text-brand-red italic uppercase tracking-tight">{report.id}</td>
                      <td className="px-6 py-5">
                        <p className="text-slate-800 tracking-tight whitespace-nowrap">{report.equipment}</p>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className="px-3 py-1.5 bg-brand-gold/10 text-brand-text rounded-xl text-[9px] font-black uppercase tracking-widest ring-1 ring-brand-gold/20 shadow-sm">{report.totalRepairs}</span>
                      </td>
                      <td className="px-6 py-5 text-slate-500 font-black whitespace-nowrap text-[11px] tracking-wider">{report.lastMaintenance}</td>
                      <td className="px-6 py-5 text-slate-700 font-bold whitespace-nowrap">{report.technician}</td>
                      <td className="px-6 py-5 text-right font-black text-brand-red tracking-tighter text-xl">{report.totalDowntime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Mobile Modern List View */}
        <div className="sm:hidden space-y-4 px-4">
          {reports.map((report) => (
            <Card key={report.id} className="border-none shadow-lg shadow-slate-200/50 rounded-[2.5rem] overflow-hidden group active:scale-[0.98] transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-black text-brand-red italic uppercase tracking-tighter">{report.id}</span>
                  <span className="px-3 py-1.5 bg-brand-gold/10 text-brand-text rounded-full text-[8px] font-black uppercase tracking-widest ring-1 ring-brand-gold/20">
                    {report.totalRepairs} Repairs
                  </span>
                </div>
                
                <h3 className="font-black text-slate-800 text-lg tracking-tight mb-1 group-hover:text-brand-red transition-colors uppercase">{report.equipment}</h3>
                <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>{report.technician}</span>
                  <span>{report.lastMaintenance}</span>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Downtime</p>
                    <p className="text-xl font-black text-slate-800 tracking-tighter">{report.totalDowntime}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/5 flex items-center justify-center text-brand-red shadow-sm border border-brand-red/10">
                    <Wrench size={18} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
