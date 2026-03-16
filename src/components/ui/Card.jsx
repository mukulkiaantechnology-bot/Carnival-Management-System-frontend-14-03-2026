export function Card({ children, className = '', accent = null }) {
  const accentClasses = {
    red: "border-t-4 border-t-brand-red",
    gold: "border-t-4 border-t-brand-gold",
    maroon: "border-t-4 border-t-brand-maroon",
  };

  return (
    <div className={`bg-white rounded-[1.5rem] shadow-sm border border-brand-gold overflow-hidden ${accent ? accentClasses[accent] : ''} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`p-6 border-b border-brand-gold/20 flex items-center justify-between ${className}`}>
      <div>
        <h3 className="text-lg font-black text-brand-red uppercase tracking-tight">{title}</h3>
        {subtitle && <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-widest">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}
