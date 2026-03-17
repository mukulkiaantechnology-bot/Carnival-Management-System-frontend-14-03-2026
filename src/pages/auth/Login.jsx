import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import logo from '../../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-md w-full py-4 md:py-8">
        <div className="text-center mb-4 md:mb-8 flex flex-col items-center">
          <div className="w-full h-16 md:h-24 mb-2 md:mb-6 flex items-center justify-center">
            <img src={logo} alt="Logo" className="h-full w-auto object-contain scale-[1.1] md:scale-[1.3]" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-brand-maroon-dark tracking-tight uppercase">Showmensinfo</h1>
          <p className="mt-1 text-[10px] md:text-[12px] font-black text-white bg-brand-red px-4 md:px-6 py-1 rounded-full uppercase tracking-[4px] md:tracking-[6px] shadow-lg shadow-brand-red/20">System Portal</p>
          <p className="mt-4 md:mt-6 text-slate-500 text-[12px] md:text-sm font-medium border-t border-slate-200 pt-4 md:pt-6 w-full">Sign in to your account</p>
        </div>

        <Card className="shadow-xl shadow-slate-200/50">
          <CardContent className="p-5 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black text-brand-maroon-dark uppercase tracking-widest block">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-brand-gold/30 focus:bg-white outline-none transition-all font-bold text-sm md:text-base"
                  placeholder="admin@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black text-brand-maroon-dark uppercase tracking-widest block">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-brand-gold/30 focus:bg-white outline-none transition-all font-bold text-sm md:text-base"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" variant="primary" className="w-full h-12 md:h-16 text-[10px] md:text-xs font-black uppercase tracking-[2px] md:tracking-[3px] shadow-2xl shadow-brand-gold/30 rounded-xl md:rounded-2xl">
                Sign In
              </Button>
            </form>

            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-100">
              <p className="text-[12px] md:text-sm text-slate-500 mb-2 md:mb-3 font-medium">Demo Accounts:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2 text-[10px] md:text-xs text-slate-600 font-bold">
                <div className="p-1.5 bg-slate-50 rounded border border-slate-100 text-center">admin@demo.com</div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-100 text-center">ops@demo.com</div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-100 text-center">maint@demo.com</div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-100 text-center">ticket@demo.com</div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-100 text-center">hr@demo.com</div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-100 text-center">emp@demo.com</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
