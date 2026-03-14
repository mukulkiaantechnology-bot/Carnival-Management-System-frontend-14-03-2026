import { Wrench, AlertTriangle, ClipboardList, PenTool } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_WORK_ORDERS = [
  { id: 1, equipment: 'Ferris Wheel', issue: 'Squeaking Sound', assigned: 'Sam Technic', status: 'In Progress', lastService: '2026-02-10' },
  { id: 2, equipment: 'Bumper Cars', issue: 'Steering Loose', assigned: 'Will Fixit', status: 'Pending', lastService: '2026-03-01' },
  { id: 3, equipment: 'Roller Coaster', issue: 'Routine Check', assigned: 'Alex Wright', status: 'Completed', lastService: '2026-03-12' },
  { id: 4, equipment: 'Generator A', issue: 'Oil Leak', assigned: 'Sam Technic', status: 'In Progress', lastService: '2026-01-20' },
  { id: 5, equipment: 'Ticket Booth 2', issue: 'Lock Jammed', assigned: 'Jane Door', status: 'Completed', lastService: '2026-03-14' },
];

export default function Maintenance() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Maintenance</h1>
          <p className="text-slate-500 text-sm">Monitor equipment health and manage repair work orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <ClipboardList size={18} />
            Equipment Status
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <PenTool size={18} />
            Create Work Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                <AlertTriangle size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">Repair Alerts</p>
                <p className="text-2xl font-bold text-red-900">3 Urgent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <Wrench size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">Pending Orders</p>
                <p className="text-2xl font-bold text-amber-900">8 Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 border-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <ClipboardList size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-800">Regular Service</p>
                <p className="text-2xl font-bold text-emerald-900">12 Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Work Orders" subtitle="Detailed list of current and past maintenance tasks." />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Equipment</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Technician</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Service</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_WORK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{order.equipment}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.issue}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {order.assigned.split(' ').map(n => n[0]).join('')}
                        </div>
                        {order.assigned}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                        order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.lastService}</td>
                    <td className="px-6 py-4 text-sm">
                      <Button variant="secondary" className="h-8 px-2 text-xs">Manage</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
