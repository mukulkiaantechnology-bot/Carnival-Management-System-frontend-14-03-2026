export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 font-black rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 uppercase tracking-widest text-[10px]";
  
  const variants = {
    primary: "bg-brand-gold hover:bg-brand-gold-dark text-brand-text shadow-lg shadow-brand-gold/20 active:scale-95 transition-all focus:ring-brand-gold",
    secondary: "bg-brand-red hover:bg-brand-red-dark text-white font-bold shadow-lg shadow-brand-red/20 active:scale-95 transition-all focus:ring-brand-red",
    danger: "bg-brand-red-dark hover:bg-brand-red-dark/90 text-white shadow-lg shadow-black/20 active:scale-95 transition-all focus:ring-brand-red-dark",
    outline: "bg-white border border-brand-gold/10 hover:bg-brand-light text-slate-600 focus:ring-slate-400",
    ghost: "bg-transparent hover:bg-brand-light text-brand-red",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
