import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Layout } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo.png';

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (target) => {
    if (location.pathname !== '/' && !target.startsWith('#')) {
      navigate('/' + target);
    } else if (location.pathname !== '/' && target.startsWith('#')) {
      navigate('/' + target);
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
              }
            }}
          >
            <div className="h-12 w-auto flex items-center justify-center">
              <img src={logo} alt="Showmensinfo" className="h-full w-auto object-contain" />
            </div>
            <span className="text-xl font-black text-brand-red tracking-tight uppercase italic">Showmens<span className="text-brand-orange">info</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigate('/');
                }
              }} 
              className="text-[10px] font-black uppercase text-slate-400 hover:text-brand-red tracking-widest transition-colors italic"
            >
              Home
            </button>
            <button onClick={() => handleNav('#features')} className="text-[10px] font-black uppercase text-slate-400 hover:text-brand-red tracking-widest transition-colors italic">Features</button>
            <button onClick={() => handleNav('#pricing')} className="text-[10px] font-black uppercase text-slate-400 hover:text-brand-red tracking-widest transition-colors italic">Pricing</button>
            <button onClick={() => handleNav('#contact')} className="text-[10px] font-black uppercase text-slate-400 hover:text-brand-red tracking-widest transition-colors italic">Contact</button>
            
            <Link to="/login" className="text-[10px] font-black uppercase text-brand-red hover:text-brand-orange transition-colors italic">Login</Link>
            <Link 
              to="/signup" 
              className="bg-brand-gold text-brand-text px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold-dark transition-all shadow-lg shadow-brand-gold/10 flex items-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsOpen(false);
              }} 
              className="block w-full text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-brand-light hover:text-brand-red rounded-xl transition-all italic"
            >
              Home
            </button>
            <button onClick={() => handleNav('#features')} className="block w-full text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-brand-light hover:text-brand-red rounded-xl transition-all italic">Features</button>
            <button onClick={() => handleNav('#pricing')} className="block w-full text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-brand-light hover:text-brand-red rounded-xl transition-all italic">Pricing</button>
            <button onClick={() => handleNav('#contact')} className="block w-full text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-brand-light hover:text-brand-red rounded-xl transition-all italic">Contact</button>
            <Link to="/login" className="block px-4 py-4 text-[10px] font-black uppercase tracking-widest text-brand-red hover:bg-brand-light rounded-xl transition-all italic" onClick={() => setIsOpen(false)}>Login</Link>
            <Link 
              to="/signup" 
              className="block w-full text-center bg-brand-gold text-brand-text px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-brand-gold/10 mt-4"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
