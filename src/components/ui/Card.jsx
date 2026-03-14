export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, className = '' }) {
  return (
    <div className={`p-6 border-b border-slate-100 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
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
