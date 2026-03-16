import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Receipt, Filter, Download, X, Calendar, Tag, CreditCard, ChevronRight, CheckCircle2, FileText, Printer, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_EXPENSES = [
  { id: 'EXP-101', category: 'Maintenance', amount: '$1,200', date: '2026-03-14', status: 'Paid', vendor: 'TechFix Solutions', items: ['Main Axle Oiling', 'Bearing Replacement'] },
  { id: 'EXP-102', category: 'Supplies', amount: '$450', date: '2026-03-14', status: 'Pending', vendor: 'ParkMart Wholesale', items: ['Cleaning Supplies', 'Staff Uniforms'] },
  { id: 'EXP-103', category: 'Marketing', amount: '$2,800', date: '2026-03-13', status: 'Paid', vendor: 'AdStream Media', items: ['Social Media Ads', 'Flyer Printing'] },
  { id: 'EXP-104', category: 'Utilities', amount: '$1,500', date: '2026-03-12', status: 'Paid', vendor: 'City Grid Electric', items: ['Electricity Bill - Feb'] },
  { id: 'EXP-105', category: 'Personnel', amount: '$12,500', date: '2026-03-10', status: 'Approved', vendor: 'Internal Payroll', items: ['Staff Salaries - Week 10'] },
];

// Local Modal Component
function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-xl w-full ${maxWidth} animate-in zoom-in-95 duration-200 overflow-hidden`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function Financial() {
  const [activeModal, setActiveModal] = useState(null); // 'filter', 'export', 'receipt'
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleViewReceipt = (expense) => {
    setSelectedExpense(expense);
    setActiveModal('receipt');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 text-sm">Track revenue, expenses, and overall profit status.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2" onClick={() => setActiveModal('filter')}>
            <Filter size={18} />
            Filter
          </Button>
          <Button variant="primary" className="flex items-center gap-2" onClick={() => setActiveModal('export')}>
            <Download size={18} />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-emerald-50/30 border-2 border-emerald-50 hover:border-emerald-200 transition-all shadow-sm group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Total Revenue</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-1">$84,250.00</p>
                <div className="flex items-center gap-1 mt-2 text-emerald-600 text-xs font-bold bg-emerald-100/50 w-fit px-2 py-0.5 rounded-full">
                  <TrendingUp size={14} />
                  <span>+12.5%</span>
                </div>
              </div>
              <div className="p-4 bg-emerald-500 text-white rounded-2xl group-hover:scale-110 transition-transform shadow-lg shadow-emerald-100">
                <DollarSign size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50/30 border-2 border-red-50 hover:border-red-200 transition-all shadow-sm group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Total Expenses</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-1">$32,180.00</p>
                <div className="flex items-center gap-1 mt-2 text-red-600 text-xs font-bold bg-red-100/50 w-fit px-2 py-0.5 rounded-full">
                  <TrendingDown size={14} />
                  <span>+4.2%</span>
                </div>
              </div>
              <div className="p-4 bg-red-500 text-white rounded-2xl group-hover:scale-110 transition-transform shadow-lg shadow-red-100">
                <Receipt size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/30 border-2 border-blue-50 hover:border-blue-200 transition-all shadow-sm group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Profit Summary</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-1">$52,070.00</p>
                <div className="flex items-center gap-1 mt-2 text-blue-600 text-xs font-bold bg-blue-100/50 w-fit px-2 py-0.5 rounded-full">
                  <ChevronRight size={14} />
                  <span>Target: $60,000</span>
                </div>
              </div>
              <div className="p-4 bg-blue-500 text-white rounded-2xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-100">
                <TrendingUp size={28} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader title="Expense Table" subtitle="Detailed list of all outgoing transactions." />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expense ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_EXPENSES.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">{expense.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">{expense.category}</td>
                    <td className="px-6 py-4 text-sm font-extrabold text-slate-800">{expense.amount}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-500">{expense.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                        expense.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                        expense.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <Button variant="secondary" className="h-8 px-4 text-xs font-bold" onClick={() => handleViewReceipt(expense)}>View Receipt</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Filter Modal */}
      <Modal isOpen={activeModal === 'filter'} onClose={() => setActiveModal(null)} title="Filter Transactions">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
              <Tag size={14} /> Category
            </label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 bg-white">
              <option>All Categories</option>
              <option>Maintenance</option>
              <option>Supplies</option>
              <option>Marketing</option>
              <option>Utilities</option>
              <option>Personnel</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
              <Calendar size={14} /> Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="px-4 py-2 border border-slate-200 rounded-xl outline-none font-medium text-slate-700" />
              <input type="date" className="px-4 py-2 border border-slate-200 rounded-xl outline-none font-medium text-slate-700" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
              <CreditCard size={14} /> Status
            </label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Paid', 'Pending', 'Approved'].map(s => (
                <button key={s} type="button" className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <Button variant="primary" className="w-full py-2.5 font-bold" type="submit">Apply Filters</Button>
        </form>
      </Modal>

      {/* Export Modal */}
      <Modal isOpen={activeModal === 'export'} onClose={() => setActiveModal(null)} title="Export Financial Data">
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
            <div className="mt-1 p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900">Custom Export</p>
              <p className="text-[11px] text-blue-700 font-medium">Select a format to download your financial overview report.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors group">
              <div className="p-3 bg-red-100 text-red-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <span className="text-xs font-bold text-slate-700">PDF Report</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors group">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <span className="text-xs font-bold text-slate-700">Excel Sheet</span>
            </button>
          </div>
          <Button variant="primary" className="w-full py-2.5 font-bold" onClick={() => setActiveModal(null)}>Download All Data</Button>
        </div>
      </Modal>

      {/* Receipt Modal */}
      <Modal isOpen={activeModal === 'receipt'} onClose={() => setActiveModal(null)} title="Transaction Receipt">
        {selectedExpense && (
          <div className="space-y-6">
            <div className="text-center p-6 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
              <h3 className="text-4xl font-extrabold text-slate-800">{selectedExpense.amount}</h3>
              <div className="flex items-center justify-center gap-2 mt-3">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="text-xs font-bold text-slate-600">Verified {selectedExpense.status}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Vendor</p>
                  <p className="text-sm font-bold text-slate-700">{selectedExpense.vendor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Date</p>
                  <p className="text-sm font-bold text-slate-700">{selectedExpense.date}</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Description</p>
                {selectedExpense.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-bold text-slate-600 bg-slate-50 p-2 rounded-lg">
                    <span>{item}</span>
                    <span className="text-slate-400 tracking-tight">Included</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                <Printer size={16} /> Print
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                <Mail size={16} /> Email
              </button>
              <button className="p-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                <Download size={18} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
