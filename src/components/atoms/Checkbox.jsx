import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

function Checkbox({ checked = false, onChange, disabled = false, className = '' }) {
  return (
    <motion.button
      type="button"
      className={`
        relative w-5 h-5 rounded border-2 transition-all duration-200
        ${checked 
          ? 'gradient-accent border-accent' 
          : 'border-gray-300 hover:border-gray-400'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={() => !disabled && onChange(!checked)}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      animate={checked ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.3, type: 'spring', stiffness: 400 }}
    >
      {checked && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ApperIcon name="Check" size={12} className="text-white" />
        </motion.div>
      )}
    </motion.button>
  )
}

export default Checkbox