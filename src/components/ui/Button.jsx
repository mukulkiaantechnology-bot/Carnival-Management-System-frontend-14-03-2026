export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-gold hover:bg-brand-gold-dark text-brand-dark shadow-lg shadow-brand-gold/20 active:scale-95 transition-all focus:ring-brand-gold",
    secondary: "bg-brand-red hover:bg-brand-maroon-dark text-white font-bold shadow-lg shadow-brand-red/20 active:scale-95 transition-all focus:ring-brand-red",
    danger: "bg-brand-maroon-dark hover:bg-brand-maroon-dark/90 text-white shadow-lg shadow-black/20 active:scale-95 transition-all focus:ring-brand-maroon-dark",
    outline: "bg-white border border-slate-200 hover:bg-brand-cream text-slate-600 focus:ring-slate-400",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
