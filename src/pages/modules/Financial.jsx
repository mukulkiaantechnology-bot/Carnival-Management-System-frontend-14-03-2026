import { DollarSign, TrendingUp, TrendingDown, Receipt, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_EXPENSES = [
  { id: 'EXP-101', category: 'Maintenance', amount: '$1,200', date: '2026-03-14', status: 'Paid' },
  { id: 'EXP-102', category: 'Supplies', amount: '$450', date: '2026-03-14', status: 'Pending' },
  { id: 'EXP-103', category: 'Marketing', amount: '$2,800', date: '2026-03-13', status: 'Paid' },
  { id: 'EXP-104', category: 'Utilities', amount: '$1,500', date: '2026-03-12', status: 'Paid' },
  { id: 'EXP-105', category: 'Personnel', amount: '$12,500', date: '2026-03-10', status: 'Approved' },
];

export default function Financial() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 text-sm">Track revenue, expenses, and overall profit status.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <Filter size={18} />
            Filter
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Download size={18} />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">$84,250.00</p>
                <div className="flex items-center gap-1 mt-2 text-emerald-600 text-sm font-medium">
                  <TrendingUp size={16} />
                  <span>+12.5% from last month</span>
                </div>
              </div>
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                <DollarSign size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Expenses</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">$32,180.00</p>
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm font-medium">
                  <TrendingDown size={16} />
                  <span>+4.2% from last month</span>
                </div>
              </div>
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl">
                <Receipt size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Profit Summary</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">$52,070.00</p>
                <div className="flex items-center gap-1 mt-2 text-blue-600 text-sm font-medium">
                  <TrendingUp size={16} />
                  <span>Target: $60,000</span>
                </div>
              </div>
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                <TrendingUp size={28} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Expense Table" subtitle="Detailed list of all outgoing transactions." />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Expense ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_EXPENSES.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{expense.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-800">{expense.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{expense.amount}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{expense.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        expense.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 
                        expense.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <Button variant="secondary" className="h-8 px-2 text-xs">View Receipt</Button>
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
