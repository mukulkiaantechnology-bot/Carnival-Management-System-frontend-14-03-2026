import { useState } from 'react';
import { ArrowRight, Check, Zap, Rocket, Building2, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SHARED_FEATURES = [
  'Multi-Site Carnival Management',
  'Advanced Ride Maintenance Orders',
  'Real-Time Revenue & Analytics',
  'Centralized Training Academy',
  'Custom Safety Inspection Flows',
  'Priority 24/7 Technical Support',
  'Role-Based Management Panels'
];

const PLANS = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 49,
    duration: '1 Month',
    description: 'Perfect for small recurring local carnivals.',
    icon: Zap,
    color: 'red',
    features: SHARED_FEATURES
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 134,
    duration: '6 Months',
    description: 'The standard for growing multi-unit operations.',
    icon: Rocket,
    color: 'orange',
    popular: true,
    features: SHARED_FEATURES
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    duration: '1 Year',
    description: 'Full-scale solution for global park systems.',
    icon: Building2,
    color: 'dark',
    features: SHARED_FEATURES
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-brand-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em] mb-4">Investment Levels</h2>
          <h3 className="text-4xl lg:text-6xl font-black text-brand-red tracking-tight leading-none uppercase italic">
            Scale your <span className="text-brand-orange">Operations</span> with precision.
          </h3>
        </div>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-600 font-medium">
          Choose the plan that's right for your business. No hidden fees, no long-term contracts. 
          Scale up or down at any time.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-[3rem] p-10 shadow-2xl transition-all hover:scale-[1.02] border-2 group ${
                plan.popular ? 'border-brand-red ring-4 ring-brand-red/5 shadow-brand-red/10' : 'border-brand-gold/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-red text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-red/20 border border-brand-red-dark/20 z-10">
                  Most Popular
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-6 ${
                plan.color === 'red' ? 'bg-brand-red/10 text-brand-red' :
                plan.color === 'orange' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-dark text-white shadow-xl'
              }`}>
                <plan.icon size={28} />
              </div>

              <h3 className="text-2xl font-black text-brand-red mb-2 uppercase italic leading-none">{plan.name}</h3>
              <p className="text-slate-500 text-sm font-bold mb-8 leading-relaxed italic">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-4xl lg:text-6xl font-black text-brand-text italic tracking-tighter transition-all">
                  {plan.price !== 'Custom' ? `$${plan.price}` : plan.price}
                </span>
                {plan.price !== 'Custom' && (
                  <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic">/ {plan.duration}</span>
                )}
                {plan.price === 'Custom' && (
                  <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic">/ {plan.duration}</span>
                )}
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-text font-bold text-xs uppercase tracking-tight italic">
                    <div className={`p-1 rounded-full shadow-inner ${plan.popular ? 'bg-brand-red text-white' : 'bg-brand-gold/20 text-brand-red'}`}>
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to="/signup"
                state={{ selectedPlan: plan.name, duration: plan.duration }}
                className={`w-full py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  plan.popular 
                    ? 'bg-brand-gold text-brand-text shadow-2xl shadow-brand-gold/20 hover:bg-brand-gold-dark hover:scale-105' 
                    : 'bg-brand-light text-brand-red border border-brand-gold/20 hover:bg-white hover:border-brand-red'
                }`}
              >
                Get Started <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mini FAQ or Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
         <div className="bg-white p-8 rounded-[2.5rem] border border-brand-gold/10 shadow-xl shadow-brand-gold/5 flex flex-col md:flex-row items-center gap-8">
            <div className="p-4 bg-brand-light rounded-2xl text-brand-red shadow-inner">
               <HelpCircle size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h4 className="font-black text-brand-red mb-2 uppercase italic tracking-tight">Need a custom enterprise solution?</h4>
               <p className="text-sm text-slate-500 font-bold leading-relaxed">We offer customized pricing and module sets for large-scale operations. Contact our sales team for a Personalized Demo.</p>
            </div>
            <button className="px-8 py-4 bg-brand-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-lg active:scale-95">
               Contact Sales
            </button>
         </div>
      </div>
    </section>
  );
}
