import { useState, useEffect } from 'react';
import {
  Zap, Rocket, Crown, Building2, Check, Settings,
  Trash2, Plus, ArrowRight, Shield, Globe, Layout,
  ChevronRight, Sparkles, Pencil, X, Save
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_PLANS = [
  {
    id: 'plan-basic',
    name: 'Basic Plan',
    price: '$49',
    duration: '1 Month',
    icon: Zap,
    color: 'brand-red',
    companies: 14,
    description: 'Entry-level module set for local carnivals.'
  },
  {
    id: 'plan-pro',
    name: 'Professional',
    price: '$149',
    duration: '6 Month',
    icon: Rocket,
    color: 'brand-orange',
    featured: true,
    companies: 28,
    description: 'Our most popular tier for growing operations.'
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    price: 'Custom',
    duration: '1 Year',
    icon: Crown,
    color: 'brand-gold',
    companies: 9,
    description: 'Unrestricted access for global park systems.'
  }
];

export default function Plans() {
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('plans_view_mode') || 'list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    localStorage.setItem('plans_view_mode', viewMode);
  }, [viewMode]);

  const handleOpenModal = (plan = null) => {
    setEditingPlan(plan ? { ...plan } : {
      id: `plan-${Math.random().toString(36).substr(2, 9)}`,
      name: '',
      price: '',
      duration: '1 Month',
      description: '',
      icon: Zap,
      color: 'brand-red'
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (plans.find(p => p.id === editingPlan.id)) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      showNotification('Package configuration updated successfully.');
    } else {
      setPlans([...plans, editingPlan]);
      showNotification('New SaaS package provisioned.');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setPlans(plans.filter(p => p.id !== id));
    showNotification('SaaS package decommissioned.');
  };

  return (
    <div className="space-y-6 sm:space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 sm:top-24 right-4 sm:right-8 z-[130] animate-in slide-in-from-right duration-300">
          <div className="bg-brand-dark border border-brand-gold/20 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-[1.5rem] sm:rounded-[1.8rem] shadow-2xl shadow-brand-dark/40 flex items-center gap-4">
            <div className="bg-brand-orange/20 p-2 sm:p-2.5 rounded-2xl">
              <Sparkles size={18} className="text-brand-orange" />
            </div>
            <span className="text-xs sm:text-sm font-black tracking-tight uppercase italic">{notification}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-red tracking-tight uppercase italic leading-none">SaaS Plan Management</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-2 w-2 rounded-full bg-brand-gold animate-pulse"></div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Pricing & Packaging Hub</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex bg-white p-1 rounded-2xl border border-brand-gold/10 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-brand-red text-white shadow-lg' : 'text-slate-400 hover:text-brand-red'}`}
              title="Grid View"
            >
              <Layout size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-brand-red text-white shadow-lg' : 'text-slate-400 hover:text-brand-red'}`}
              title="List View"
            >
              <ChevronRight className="rotate-90" size={18} />
            </button>
          </div>
          <Button
            variant="secondary"
            className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white border border-brand-gold/10 rounded-2xl hover:bg-brand-light text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all shadow-sm"
            onClick={() => showNotification("Feature Matrix Exported")}
          >
            <Shield size={16} className="text-brand-gold" /> <span className="hidden xs:inline">Feature Matrix</span><span className="xs:hidden">Matrix</span>
          </Button>
          <Button
            className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-4 sm:px-8 py-3 sm:py-4 bg-brand-gold text-brand-text rounded-2xl hover:bg-brand-gold-dark text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-brand-gold/20 transition-all border border-brand-gold/20"
            onClick={() => handleOpenModal()}
          >
            <Plus size={18} /> New <span className="hidden xs:inline">Package</span>
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan) => (
            <Card key={plan.id} className={`group relative transition-all duration-500 rounded-[2.5rem] sm:rounded-[3rem] border border-brand-gold/10 overflow-hidden shadow-2xl shadow-brand-gold/5 ${plan.featured ? 'scale-[1.02] border-brand-gold ring-4 ring-brand-gold/5' : ''}`}>
              {plan.featured && (
                <div className="absolute top-6 sm:top-8 right-6 sm:right-8 bg-brand-red text-white py-1 px-3 sm:py-1.5 sm:px-4 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl animate-pulse">
                  <Crown size={10} /> Featured
                </div>
              )}

              <CardContent className="p-8 sm:p-12">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-[1.5rem] sm:rounded-[1.8rem] mb-8 sm:mb-10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-inner ${plan.color === 'brand-red' ? 'bg-brand-red/10 text-brand-red' :
                    plan.color === 'brand-orange' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-gold/10 text-brand-gold'
                  }`}>
                  <plan.icon size={28} sm:size={32} strokeWidth={2.5} />
                </div>

                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  <h3 className="text-2xl sm:text-3xl font-black text-brand-red uppercase italic tracking-tight leading-none truncate">{plan.name}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-bold leading-relaxed line-clamp-2">{plan.description}</p>
                </div>

                <div className="mb-10 sm:mb-12">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-brand-text tracking-tighter italic">{plan.price}</span>
                    <span className="text-slate-400 font-black text-[8px] sm:text-[10px] uppercase tracking-widest italic opacity-60">/ {plan.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <Button
                    className="flex-1 py-4 sm:py-5 bg-brand-gold text-brand-text rounded-2xl hover:bg-brand-gold-dark font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-gold/10 active:scale-95 flex items-center justify-center gap-3"
                    onClick={() => handleOpenModal(plan)}
                  >
                    <Pencil size={18} /> <span className="hidden xs:inline">Configure</span><span className="xs:inline sm:hidden">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border-brand-red/10 bg-brand-red/5 hover:bg-brand-red hover:text-white text-brand-red transition-all flex items-center justify-center shadow-lg shadow-brand-red/5 shrink-0"
                    onClick={() => handleDelete(plan.id)}
                  >
                    <Trash2 size={20} sm:size={24} strokeWidth={2.5} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-brand-gold/20 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-brand-light/50">
                  <th className="px-6 sm:px-10 py-6 sm:py-10 text-[10px] font-black text-brand-red uppercase tracking-widest border-b border-brand-gold/10">SaaS Package</th>
                  <th className="px-6 sm:px-10 py-6 sm:py-10 text-[10px] font-black text-brand-red uppercase tracking-widest border-b border-brand-gold/10">Pricing Model</th>
                  <th className="px-6 sm:px-10 py-6 sm:py-10 text-[10px] font-black text-brand-red uppercase tracking-widest border-b border-brand-gold/10 text-center">Subscription Plan</th>
                  <th className="px-6 sm:px-10 py-6 sm:py-10 text-[10px] font-black text-brand-red uppercase tracking-widest border-b border-brand-gold/10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-brand-light/30 transition-all group">
                    <td className="px-6 sm:px-10 py-6 sm:py-8">
                      <div className="flex items-center gap-4 sm:gap-5">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 border border-brand-gold/10 shadow-inner group-hover:scale-110 transition-transform ${plan.color === 'brand-red' ? 'bg-brand-red/10 text-brand-red' :
                            plan.color === 'brand-orange' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-gold/10 text-brand-gold'
                          }`}>
                          <plan.icon size={20} sm:size={24} strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm sm:text-base font-black text-brand-red uppercase italic leading-none mb-1 text-nowrap truncate">{plan.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{plan.description.substring(0, 40)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 sm:px-10 py-6 sm:py-8">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg sm:text-xl font-black text-brand-text italic tracking-tighter">{plan.price}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 sm:px-10 py-6 sm:py-8 text-center">
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-light text-brand-red text-[10px] font-black uppercase tracking-widest rounded-xl border border-brand-gold/10">
                        {plan.duration}
                      </span>
                    </td>
                    <td className="px-6 sm:px-10 py-6 sm:py-8 text-right">
                      <div className="flex items-center justify-end gap-2 sm:gap-3">
                        <button
                          onClick={() => handleOpenModal(plan)}
                          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-brand-gold text-brand-text rounded-2xl hover:bg-brand-gold-dark transition-all shadow-lg shadow-brand-gold/10 active:scale-90"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(plan.id)}
                          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-brand-red/5 text-brand-red rounded-2xl hover:bg-brand-red hover:text-white transition-all border border-brand-red/10 shadow-lg active:scale-90"
                        >
                          <Trash2 size={18} sm:size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manage Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl shadow-brand-dark/40 border border-brand-gold/20 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 sm:p-8 border-b border-slate-50 flex items-center justify-between bg-brand-light/50">
              <div className="flex items-center gap-4">
                <div className="p-2 sm:p-3 bg-brand-red rounded-2xl text-white shadow-xl">
                  <Settings size={20} sm:size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-brand-red uppercase italic tracking-tight">Configure Package</h3>
                  <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">SaaS Architecture Management</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl hover:bg-brand-red hover:text-white transition-all text-slate-400 shrink-0"><X size={24} /></button>
            </div>

            <div className="p-6 sm:p-10 space-y-6 sm:space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Package Name</label>
                  <input
                    type="text"
                    className="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-brand-light border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-brand-text"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Monthly Cost</label>
                  <input
                    type="text"
                    className="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-brand-light border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-brand-text"
                    placeholder="$0.00 or Custom"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Subscription Cycle</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="e.g. 2 Year, 3 Month"
                    className="flex-1 px-5 py-3.5 sm:px-6 sm:py-4 bg-brand-light border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-brand-text"
                    value={editingPlan.duration}
                    onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                  />
                  <select
                    className="px-4 py-3.5 sm:py-4 bg-white border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-red transition-all font-bold text-brand-text text-[10px] uppercase tracking-widest cursor-pointer min-h-[50px] sm:min-h-0"
                    onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                    value={['1 Month', '6 Month', '1 Year'].includes(editingPlan.duration) ? editingPlan.duration : ''}
                  >
                    <option value="" disabled>Presets</option>
                    <option value="1 Month">1 Month</option>
                    <option value="6 Month">6 Month</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Package Description</label>
                <textarea
                  rows={3}
                  className="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-brand-light border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-brand-text resize-none"
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                />
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-slate-50 bg-brand-light/20 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 sm:py-5 bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all order-2 sm:order-1">Cancel Request</button>
              <button onClick={handleSave} className="flex-1 py-4 sm:py-5 bg-brand-gold text-brand-text hover:bg-brand-gold-dark rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-brand-gold/10 flex items-center justify-center gap-3 order-1 sm:order-2">
                <Save size={18} /> Commit Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
