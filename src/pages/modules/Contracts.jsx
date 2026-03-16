import { FileText, Plus, Search, Filter, Eye, Download, FileSignature } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_CONTRACTS = [
  { id: 'CON-2026-001', event: 'Summer Gala 2026', committee: 'City Council', status: 'Active', dateSent: '2026-01-15' },
  { id: 'CON-2026-002', event: 'County Fair', committee: 'Agri Board', status: 'Pending', dateSent: '2026-02-01' },
  { id: 'CON-2026-003', event: 'Music Fest', committee: 'Arts Dept', status: 'Draft', dateSent: '2026-03-05' },
  { id: 'CON-2026-004', event: 'Winter Wonderland', committee: 'Tourism Office', status: 'Closed', dateSent: '2025-11-10' },
  { id: 'CON-2026-005', event: 'Food Expo', committee: 'Catering Assoc', status: 'Active', dateSent: '2026-03-10' },
];

export default function Contracts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Contracts Management</h1>
          <p className="text-slate-500 text-sm">Draft, manage, and track legal agreements for events.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <Plus size={18} />
            Create Template
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <FileSignature size={18} />
            Create Contract
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader 
          title="Active & Pending Contracts" 
          subtitle="Overview of all contractual obligations and their current status."
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contract ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Event Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Committee</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Sent</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_CONTRACTS.map((contract) => (
                  <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{contract.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-medium">{contract.event}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{contract.committee}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        contract.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 
                        contract.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                        contract.status === 'Draft' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{contract.dateSent}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap space-x-2">
                      <Button variant="secondary" className="h-8 w-8 !p-0" title="View">
                        <Eye size={16} />
                      </Button>
                      <Button variant="secondary" className="h-8 w-8 !p-0" title="Download">
                        <Download size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Contract Reminders" subtitle="Upcoming deadlines and renewals." />
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'Summer Gala Renewal', date: 'In 5 days', type: 'urgent' },
                { title: 'Agri Board Signature', date: 'Expected today', type: 'warning' },
                { title: 'Insurance Update', date: 'Next month', type: 'normal' },
              ].map((reminder, i) => (
                <div key={i} className={`p-3 rounded-lg border flex items-center justify-between ${
                  reminder.type === 'urgent' ? 'bg-red-50 border-red-100' : 
                  reminder.type === 'warning' ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <FileText size={18} className={reminder.type === 'urgent' ? 'text-red-600' : reminder.type === 'warning' ? 'text-amber-600' : 'text-slate-600'} />
                    <span className="text-sm font-medium text-slate-700">{reminder.title}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{reminder.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader title="Templates" subtitle="Quick start for new agreements." />
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {['Sponsorship', 'Vendor Lease', 'Service Agreement', 'Non-Disclosure'].map((t) => (
                <div key={t} className="p-4 rounded-xl border border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer text-center">
                  <p className="text-sm font-medium text-slate-600">{t}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
