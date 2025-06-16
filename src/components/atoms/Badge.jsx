import { motion } from 'framer-motion'

function Badge({ 
  children, 
  variant = 'default', 
  size = 'sm',
  color,
  className = '' 
}) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'gradient-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-sm',
  }
  
  const customColor = color ? { backgroundColor: color, color: 'white' } : {}
  
  const classes = `${baseClasses} ${color ? '' : variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <motion.span
      className={classes}
      style={customColor}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )
}

export default Badge