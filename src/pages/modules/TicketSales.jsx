import { useState } from 'react';
import { Ticket, Users, Landmark, CreditCard, ShoppingCart, Plus, X, CheckCircle2, DollarSign, Box, ShieldCheck, Info, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_SALES = [
  { id: 1, box: 'Box A (Main Gate)', seller: 'Alice Smith', sold: 450, remaining: 50, revenue: '$4,500' },
  { id: 2, box: 'Box B (South Gate)', seller: 'Bob Jones', sold: 320, remaining: 180, revenue: '$3,200' },
  { id: 3, box: 'Box C (East Gate)', seller: 'Charlie Brown', sold: 280, remaining: 120, revenue: '$2,800' },
  { id: 4, box: 'Box D (West Gate)', seller: 'David Wilson', sold: 510, remaining: 40, revenue: '$5,100' },
  { id: 5, box: 'Online Sales', seller: 'System', sold: 1250, remaining: 'N/A', revenue: '$12,500' },
];

const MOCK_SELLERS = ['Alice Smith', 'Bob Jones', 'Charlie Brown', 'David Wilson', 'Emma Watson', 'Frank Miller'];
const MOCK_BOXES = ['Box E (VIP Gate)', 'Box F (Food Court)', 'Box G (Rides Entry)', 'Box H (Parking)'];

// Local Modal Component
function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-xl w-full ${maxWidth} animate-in zoom-in-95 duration-200 overflow-hidden`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-800 p-1 hover:bg-slate-100 rounded-lg transition-colors" title="Close">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function TicketSales() {
  const [salesData, setSalesData] = useState(INITIAL_SALES);
  const [activeModal, setActiveModal] = useState(null); // 'assign', 'generate', 'collect'
  const [selectedSale, setSelectedSale] = useState(null);
  
  // Form states
  const [newSeller, setNewSeller] = useState(MOCK_SELLERS[0]);
  const [selectedBox, setSelectedBox] = useState(MOCK_BOXES[0]);
  const [batchCount, setBatchCount] = useState(100);

  const handleAssignSeller = (e) => {
    e.preventDefault();
    const newEntry = {
      id: salesData.length + 1,
      box: selectedBox,
      seller: newSeller,
      sold: 0,
      remaining: batchCount,
      revenue: '$0'
    };
    setSalesData([...salesData, newEntry]);
    setActiveModal(null);
  };

  const handleGenerateBatch = (e) => {
    e.preventDefault();
    // For demonstration, we'll just update the first box's remaining count
    setSalesData(prev => prev.map(item => 
      item.id === 1 ? { ...item, remaining: (typeof item.remaining === 'number' ? item.remaining : 0) + parseInt(batchCount) } : item
    ));
    setActiveModal(null);
  };

  const openCollectCash = (sale) => {
    setSelectedSale(sale);
    setActiveModal('collect');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Ticket Sales</h1>
          <p className="text-slate-500 text-sm">Monitor real-time ticket distribution and revenue.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2 font-black h-10 sm:h-12 text-[10px] sm:text-xs px-4" onClick={() => setActiveModal('assign')}>
            <Plus size={18} />
            Assign Seller
          </Button>
          <Button variant="primary" className="flex-1 flex items-center justify-center gap-2 font-black h-10 sm:h-12 text-[10px] sm:text-xs px-4 shadow-xl shadow-blue-500/20" onClick={() => setActiveModal('generate')}>
            <Ticket size={18} />
            Generate Batch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-2 border-slate-50 hover:border-blue-100 transition-all shadow-sm group">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Ticket size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tickets Sold</p>
              <p className="text-2xl font-extrabold text-slate-800">2,810</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-slate-50 hover:border-emerald-100 transition-all shadow-sm group">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Landmark size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Revenue</p>
              <p className="text-2xl font-extrabold text-slate-800">$28,100</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-slate-50 hover:border-amber-100 transition-all shadow-sm group">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Sellers</p>
              <p className="text-2xl font-extrabold text-slate-800">{salesData.filter(s => s.seller !== 'System').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-slate-50 hover:border-purple-100 transition-all shadow-sm group">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Online Sales</p>
              <p className="text-2xl font-extrabold text-slate-800">1,250</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm overflow-hidden">
        <CardHeader title="Daily Sales Summary" subtitle="Performance of individual ticket boxes and sellers." />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ticket Box</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seller</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Tickets Sold</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Remaining</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {salesData.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{sale.box}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {sale.seller[0]}
                        </div>
                        {sale.seller}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-bold text-center italic">{sale.sold}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-tight ${typeof sale.remaining === 'number' && sale.remaining < 50 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                        {sale.remaining} {typeof sale.remaining === 'number' ? 'Left' : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-extrabold text-emerald-600 tracking-tight">{sale.revenue}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <Button variant="secondary" className="h-8 px-4 text-[10px] font-bold uppercase tracking-widest" onClick={() => openCollectCash(sale)}>Collect Cash</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Assign Seller Modal */}
      <Modal isOpen={activeModal === 'assign'} onClose={() => setActiveModal(null)} title="Assign New Seller">
        <form className="space-y-4" onSubmit={handleAssignSeller}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Available Boxes</label>
            <select 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 bg-white"
              value={selectedBox}
              onChange={(e) => setSelectedBox(e.target.value)}
            >
              {MOCK_BOXES.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Select Seller</label>
            <select 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 bg-white"
              value={newSeller}
              onChange={(e) => setNewSeller(e.target.value)}
            >
              {MOCK_SELLERS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Initial Ticket Count</label>
            <input 
              type="number" 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700"
              value={batchCount}
              onChange={(e) => setBatchCount(e.target.value)}
            />
          </div>
          <Button variant="primary" className="w-full h-10 sm:h-12 font-bold uppercase tracking-widest text-[10px] sm:text-xs" type="submit">Confirm Assignment</Button>
        </form>
      </Modal>

      {/* Generate Batch Modal */}
      <Modal isOpen={activeModal === 'generate'} onClose={() => setActiveModal(null)} title="Generate Ticket Batch">
        <form className="space-y-4" onSubmit={handleGenerateBatch}>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4 mb-4">
            <div className="p-2 bg-blue-500 text-white rounded-lg"><Info size={20} /></div>
            <div>
              <p className="text-sm font-bold text-blue-900">Add Capacity</p>
              <p className="text-[11px] text-blue-600 font-medium">Add more physical tickets to a specific box for sale.</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Select Box</label>
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 bg-white">
              {salesData.filter(s => s.seller !== 'System').map(s => <option key={s.id}>{s.box}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">New Batch Amount</label>
            <div className="relative">
              <input 
                type="number" 
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 pr-12"
                value={batchCount}
                onChange={(e) => setBatchCount(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">PCS</span>
            </div>
          </div>
          <Button variant="primary" className="w-full h-10 sm:h-12 font-bold uppercase tracking-widest text-[10px] sm:text-xs" type="submit">Update Stock</Button>
        </form>
      </Modal>

      {/* Collect Cash Modal */}
      <Modal isOpen={activeModal === 'collect'} onClose={() => setActiveModal(null)} title="Collect Daily Revenue">
        {selectedSale && (
          <div className="space-y-6">
            <div className="text-center p-8 bg-emerald-50 border-2 border-dashed border-emerald-100 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-emerald-100 -mr-4 -mt-4 transform rotate-12 group-hover:scale-110 transition-transform">
                <Landmark size={80} />
              </div>
              <p className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest mb-1 relative z-10">Amount Pending</p>
              <h3 className="text-5xl font-black text-slate-800 relative z-10">{selectedSale.revenue}</h3>
              <div className="flex items-center justify-center gap-2 mt-4 relative z-10 px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full w-fit mx-auto border border-emerald-100">
                <Users size={14} className="text-emerald-500" />
                <span className="text-xs font-bold text-slate-700">Seller: {selectedSale.seller}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tickets Sold</p>
                  <p className="text-sm font-bold text-slate-800">{selectedSale.sold} Units</p>
                </div>
                <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Ticket size={16} /></div>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inventory Status</p>
                  <p className="text-sm font-bold text-slate-800">{selectedSale.remaining} Units Left</p>
                </div>
                <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Box size={16} /></div>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button variant="secondary" className="flex-1 font-bold h-10 sm:h-12 rounded-xl" onClick={() => setActiveModal(null)}>Later</Button>
              <Button variant="primary" className="flex-[2] font-black uppercase tracking-widest text-xs h-10 sm:h-12 shadow-lg shadow-blue-100 rounded-xl flex items-center justify-center gap-2" onClick={() => setActiveModal(null)}>
                <ArrowUpRight size={18} />
                Confirm Collection
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
