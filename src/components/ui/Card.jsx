export function Card({ children, className = '', accent = null }) {
  const accentClasses = {
    red: "border-t-4 border-t-brand-red",
    gold: "border-t-4 border-t-brand-gold",
    maroon: "border-t-4 border-t-brand-maroon",
  };

  return (
    <div className={`bg-white rounded-[2rem] shadow-xl shadow-brand-gold/5 border border-brand-gold/20 overflow-hidden transition-all duration-300 ${accent ? accentClasses[accent] : ''} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`p-8 border-b border-brand-gold/10 flex items-center justify-between bg-brand-light/20 ${className}`}>
      <div>
        <h3 className="text-xl font-black text-brand-red tracking-tight uppercase italic">{title}</h3>
        {subtitle && <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`p-8 ${className}`}>
      {children}
    </div>
  );
}
