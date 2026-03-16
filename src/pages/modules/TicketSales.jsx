import { Ticket, Users, Landmark, CreditCard, ShoppingCart, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_SALES = [
  { id: 1, box: 'Box A (Main Gate)', seller: 'Alice Smith', sold: 450, remaining: 50, revenue: '$4,500' },
  { id: 2, box: 'Box B (South Gate)', seller: 'Bob Jones', sold: 320, remaining: 180, revenue: '$3,200' },
  { id: 3, box: 'Box C (East Gate)', seller: 'Charlie Brown', sold: 280, remaining: 120, revenue: '$2,800' },
  { id: 4, box: 'Box D (West Gate)', seller: 'David Wilson', sold: 510, remaining: 40, revenue: '$5,100' },
  { id: 5, box: 'Online Sales', seller: 'System', sold: 1250, remaining: 'N/A', revenue: '$12,500' },
];

export default function TicketSales() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Ticket Sales</h1>
          <p className="text-slate-500 text-sm">Monitor real-time ticket distribution and revenue.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <Plus size={18} />
            Assign Seller
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Ticket size={18} />
            Generate Batch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Ticket size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Tickets Sold</p>
              <p className="text-2xl font-bold text-slate-800">2,810</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Landmark size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800">$28,100</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Sellers</p>
              <p className="text-2xl font-bold text-slate-800">12</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Online Sales</p>
              <p className="text-2xl font-bold text-slate-800">1,250</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Daily Sales Summary" subtitle="Performance of individual ticket boxes and sellers." />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket Box</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Seller</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tickets Sold</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Remaining</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_SALES.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{sale.box}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{sale.seller}</td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-semibold">{sale.sold}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <span className={`px-2 py-0.5 rounded text-xs ${typeof sale.remaining === 'number' && sale.remaining < 50 ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                        {sale.remaining}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-600">{sale.revenue}</td>
                    <td className="px-6 py-4 text-sm">
                      <Button variant="secondary" className="h-8 px-2 text-xs">Collect Cash</Button>
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
