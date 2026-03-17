export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 font-black rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 uppercase tracking-widest text-[10px]";
  
  const variants = {
    primary: "bg-brand-gold hover:bg-brand-gold-dark text-brand-text focus:ring-brand-gold shadow-lg shadow-brand-gold/20",
    secondary: "bg-brand-red hover:bg-brand-red-dark text-white focus:ring-brand-red shadow-lg shadow-brand-red/20",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    ghost: "bg-transparent hover:bg-brand-light text-brand-red",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
