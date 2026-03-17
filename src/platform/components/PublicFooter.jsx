import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/logo.png';

export function PublicFooter() {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 overflow-hidden relative border-t-4 border-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-auto bg-white/5 p-1.5 rounded-lg border border-white/10">
                <img src={logo} alt="Showmensinfo" className="h-full w-auto object-contain" />
              </div>
              <span className="text-xl font-black text-brand-red tracking-tight uppercase italic">Showmens<span className="text-brand-orange">info</span></span>
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.1em] leading-relaxed italic">
              The ultimate SaaS platform for the modern carnival industry. Centralize your operations, finances, and safety today.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2.5 bg-brand-light/5 rounded-xl text-slate-400 hover:text-brand-red hover:bg-brand-light/10 transition-all border border-brand-gold/5 shadow-inner"><Facebook size={18} /></a>
              <a href="#" className="p-2.5 bg-brand-light/5 rounded-xl text-slate-400 hover:text-brand-red hover:bg-brand-light/10 transition-all border border-brand-gold/5 shadow-inner"><Twitter size={18} /></a>
              <a href="#" className="p-2.5 bg-brand-light/5 rounded-xl text-slate-400 hover:text-brand-red hover:bg-brand-light/10 transition-all border border-brand-gold/5 shadow-inner"><Instagram size={18} /></a>
              <a href="#" className="p-2.5 bg-brand-light/5 rounded-xl text-slate-400 hover:text-brand-red hover:bg-brand-light/10 transition-all border border-brand-gold/5 shadow-inner"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-brand-gold font-black uppercase tracking-widest text-xs mb-6 italic">Product</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">Features</a></li>
              <li><a href="/pricing" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">Pricing</a></li>
              <li><a href="#" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">Integrations</a></li>
              <li><a href="#" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">Updates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-gold font-black uppercase tracking-widest text-xs mb-6 italic">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">About</a></li>
              <li><a href="#" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">Careers</a></li>
              <li><a href="/contact" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">Contact</a></li>
              <li><a href="#" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-gold font-black uppercase tracking-widest text-xs mb-6 italic">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">Help Center</a></li>
              <li><a href="#" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">Documentation</a></li>
              <li><a href="#" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">API Status</a></li>
              <li><a href="#" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-all italic">Forum</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-light/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">© 2026 Showmensinfo. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-brand-red transition-all italic">Privacy Policy</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-brand-red transition-all italic">Terms of Service</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-brand-red transition-all italic">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
