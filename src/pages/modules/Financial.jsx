import { useState, useMemo } from 'react';
import {
  DollarSign, TrendingUp, TrendingDown, Receipt, Filter, Download,
  X, Calendar, Tag, CreditCard, ChevronRight, CheckCircle2,
  FileText, Printer, Mail, Search, ArrowRight, Info, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_EXPENSES = [
  { id: 'EXP-101', category: 'Maintenance', amount: 1200, date: '2026-03-14', status: 'Paid', vendor: 'TechFix Solutions', items: ['Main Axle Oiling', 'Bearing Replacement'] },
  { id: 'EXP-102', category: 'Supplies', amount: 450, date: '2026-03-14', status: 'Pending', vendor: 'ParkMart Wholesale', items: ['Cleaning Supplies', 'Staff Uniforms'] },
  { id: 'EXP-103', category: 'Marketing', amount: 2800, date: '2026-03-13', status: 'Paid', vendor: 'AdStream Media', items: ['Social Media Ads', 'Flyer Printing'] },
  { id: 'EXP-104', category: 'Utilities', amount: 1500, date: '2026-03-12', status: 'Paid', vendor: 'City Grid Electric', items: ['Electricity Bill - Feb'] },
  { id: 'EXP-105', category: 'Personnel', amount: 12500, date: '2026-03-10', status: 'Approved', vendor: 'Internal Payroll', items: ['Staff Salaries - Week 10'] },
];

// Local Modal Component
function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className={`bg-white rounded-[2.5rem] shadow-2xl w-full ${maxWidth} animate-in zoom-in-95 duration-200 overflow-hidden border border-white/20`}>
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Financial() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [activeModal, setActiveModal] = useState(null); // 'filter', 'export', 'receipt'
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    startDate: '',
    endDate: '',
    status: 'All'
  });

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleViewReceipt = (expense) => {
    setSelectedExpense(expense);
    setActiveModal('receipt');
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const matchCategory = filters.category === 'All Categories' || exp.category === filters.category;
      const matchStatus = filters.status === 'All' || exp.status === filters.status;
      const matchStart = !filters.startDate || exp.date >= filters.startDate;
      const matchEnd = !filters.endDate || exp.date <= filters.endDate;
      return matchCategory && matchStatus && matchStart && matchEnd;
    });
  }, [expenses, filters]);

  // Derived Stats
  const totals = useMemo(() => {
    const revenue = 84250; // Mock base revenue
    const expenseSum = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    return {
      revenue: revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      expenses: expenseSum.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      profit: (revenue - expenseSum).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      profitRaw: revenue - expenseSum
    };
  }, [filteredExpenses]);

  return (
    <div className="space-y-6 relative px-1 pb-10">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-[110] animate-in slide-in-from-right duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 border border-slate-800">
            <div className="p-2 bg-emerald-500/20 rounded-xl">
              <CheckCircle2 size={18} className="text-emerald-400" />
            </div>
            <span className="text-sm font-black tracking-tight">{notification}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 text-sm font-bold">Track revenue, expenses, and overall profit status.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2 font-black shadow-lg shadow-brand-red/20 bg-brand-red text-white border-none" onClick={() => setActiveModal('filter')}>
            <Filter size={18} className="text-white" />
            Filter
          </Button>
          <Button variant="primary" className="flex items-center gap-2 font-black shadow-xl shadow-blue-500/20" onClick={() => setActiveModal('export')}>
            <Download size={18} />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-none shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-emerald-100/50 transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 text-emerald-500/5 group-hover:scale-150 transition-transform -rotate-12">
            <DollarSign size={120} />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">Total Revenue</p>
                <p className="text-3xl font-black text-slate-800 mt-1">{totals.revenue}</p>
                <div className="flex items-center gap-1.5 mt-3 text-emerald-600 text-[10px] font-black bg-emerald-100/30 w-fit px-3 py-1 rounded-full border border-emerald-100/50">
                  <TrendingUp size={12} strokeWidth={3} />
                  <span className="uppercase tracking-widest">+12.5% Growth</span>
                </div>
              </div>
              <div className="p-5 bg-emerald-500 text-white rounded-[1.5rem] group-hover:scale-110 transition-transform shadow-xl shadow-emerald-200">
                <DollarSign size={32} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-rose-100/50 transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 text-rose-500/5 group-hover:scale-150 transition-transform -rotate-12">
            <Receipt size={120} />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest">Total Expenses</p>
                <p className="text-3xl font-black text-slate-800 mt-1">{totals.expenses}</p>
                <div className="flex items-center gap-1.5 mt-3 text-rose-600 text-[10px] font-black bg-rose-100/30 w-fit px-3 py-1 rounded-full border border-rose-100/50">
                  <TrendingDown size={12} strokeWidth={3} />
                  <span className="uppercase tracking-widest">+4.2% Higher</span>
                </div>
              </div>
              <div className="p-5 bg-rose-500 text-white rounded-[1.5rem] group-hover:scale-110 transition-transform shadow-xl shadow-rose-200">
                <Receipt size={32} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 text-blue-500/5 group-hover:scale-150 transition-transform -rotate-12">
            <TrendingUp size={120} />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Net Profit Summary</p>
                <p className="text-3xl font-black text-slate-800 mt-1">{totals.profit}</p>
                <div className="flex items-center gap-1.5 mt-3 text-blue-600 text-[10px] font-black bg-blue-100/30 w-fit px-3 py-1 rounded-full border border-blue-100/50">
                  <TrendingUp size={12} strokeWidth={3} />
                  <span className="uppercase tracking-widest">Target: $60k</span>
                </div>
              </div>
              <div className="p-5 bg-blue-600 text-white rounded-[1.5rem] group-hover:scale-110 transition-transform shadow-xl shadow-blue-200">
                <TrendingUp size={32} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl shadow-slate-100/50 border-none overflow-hidden">
        <CardHeader title="Transaction Ledger" subtitle="Detailed list of all outgoing transactions and expenses." />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Issue Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="text-sm font-black text-blue-600 tracking-tight">{expense.id}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">{expense.vendor}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-base font-black text-slate-800 leading-tight">
                        ${expense.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-wider">{expense.date}</td>
                    <td className="px-8 py-5 text-center">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${expense.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-50' :
                          expense.status === 'Pending' ? 'bg-amber-50 text-amber-600 shadow-sm shadow-amber-50' : 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-50'
                        }`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Button
                        variant="secondary"
                        className="h-10 px-5 text-xs font-black uppercase tracking-widest transition-all shadow-sm rounded-xl"
                        onClick={() => handleViewReceipt(expense)}
                      >
                        View Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredExpenses.length === 0 && (
              <div className="p-20 text-center bg-slate-50/30">
                <Search size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No transactions found for these filters.</p>
                <button onClick={() => setFilters({ category: 'All Categories', startDate: '', endDate: '', status: 'All' })} className="mt-4 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filter Modal */}
      <Modal isOpen={activeModal === 'filter'} onClose={() => setActiveModal(null)} title="Filter Transactions" maxWidth="max-w-md">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Expense Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800 bg-white shadow-sm appearance-none"
            >
              <option>All Categories</option>
              <option>Maintenance</option>
              <option>Supplies</option>
              <option>Marketing</option>
              <option>Utilities</option>
              <option>Personnel</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Transaction Period</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 shadow-sm"
              />
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 shadow-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Payment Status</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Paid', 'Pending', 'Approved'].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilters({ ...filters, status: s })}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 ${filters.status === s ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100 scale-105' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-100 hover:bg-blue-50'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <Button variant="primary" className="w-full py-5 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 mt-4" onClick={() => setActiveModal(null)}>Apply Filters</Button>
        </div>
      </Modal>

      {/* Export Modal */}
      <Modal isOpen={activeModal === 'export'} onClose={() => setActiveModal(null)} title="Export Financial Data" maxWidth="max-w-md">
        <div className="space-y-8">
          <div className="p-6 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:rotate-12 transition-transform">
              <FileText size={100} />
            </div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">Custom Export</h3>
                <p className="text-xs font-bold text-blue-100 mt-1 uppercase tracking-widest opacity-80 leading-relaxed">Select a high-resolution format to download your detailed financial audit records.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { setActiveModal(null); showNotification("Preparing PDF Financial Report..."); }}
              className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-rose-200 hover:shadow-xl hover:shadow-rose-100 transition-all group active:scale-95"
            >
              <div className="p-5 bg-rose-50 text-rose-600 rounded-[1.5rem] mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
                <FileText size={32} />
              </div>
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">PDF Report</span>
            </button>
            <button
              onClick={() => { setActiveModal(null); showNotification("Generating Excel Spreadsheet..."); }}
              className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100 transition-all group active:scale-95"
            >
              <div className="p-5 bg-emerald-50 text-emerald-600 rounded-[1.5rem] mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
                <FileText size={32} />
              </div>
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Excel Sheet</span>
            </button>
          </div>

          <Button variant="primary" className="w-full py-5 font-black uppercase tracking-widest rounded-2xl shadow-xl bg-slate-900 border-none hover:bg-slate-800" onClick={() => { setActiveModal(null); showNotification("Compiling all transaction data..."); }}>
            Download Comprehensive Data
          </Button>
        </div>
      </Modal>

      {/* Receipt Modal */}
      <Modal isOpen={activeModal === 'receipt'} onClose={() => setActiveModal(null)} title="Transaction Details" maxWidth="max-w-xl">
        {selectedExpense && (
          <div className="space-y-8">
            <div className="text-center p-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative group">
              <div className="absolute top-0 right-0 p-10 text-white/5 -rotate-12 group-hover:scale-125 transition-transform">
                <DollarSign size={140} />
              </div>
              <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] mb-3">Net Payment</p>
              <h3 className="text-5xl font-black tracking-tight leading-none">${selectedExpense.amount.toLocaleString()}</h3>
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className={`p-1.5 rounded-full ${selectedExpense.status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                  <CheckCircle2 size={16} className="text-white" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest opacity-80">Payment Status: {selectedExpense.status}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] shadow-sm">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                    <Tag size={12} /> Beneficiary Vendor
                  </p>
                  <p className="text-lg font-black text-slate-800 tracking-tight">{selectedExpense.vendor}</p>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] shadow-sm">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                    <Calendar size={12} /> Dispatch Date
                  </p>
                  <p className="text-lg font-black text-slate-800 tracking-tight">{selectedExpense.date}</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Info size={14} /> Itemized Billing Breakdown
                </p>
                <div className="space-y-2">
                  {selectedExpense.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/20 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{item}</span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-500 uppercase bg-emerald-50 px-3 py-1 rounded-lg">Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => showNotification("Connecting to Print Server...")}
                className="flex-1 flex items-center justify-center gap-3 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all group active:scale-95"
              >
                <Printer size={18} className="group-hover:scale-110 transition-transform" /> Print Record
              </button>
              <button
                onClick={() => showNotification("Receipt sent to owner email.")}
                className="flex-1 flex items-center justify-center gap-3 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all group active:scale-95"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" /> Email PDF
              </button>
              <button
                onClick={() => showNotification("Downloading detailed CSV...")}
                className="p-5 bg-blue-600 border border-blue-600 rounded-2xl text-white hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
              >
                <Download size={22} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
