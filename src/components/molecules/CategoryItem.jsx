import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

function CategoryItem({ category, isActive }) {
  const linkTo = category.Id === 'all' ? '/' : `/category/${category.Id}`
  
  return (
    <NavLink to={linkTo}>
      {({ isActive: navActive }) => (
        <motion.div
          className={`
            flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
            ${navActive || isActive 
              ? 'bg-primary text-white shadow-lg' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <div 
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${navActive || isActive ? 'bg-white/20' : 'bg-gray-100'}
              `}
              style={{ 
                backgroundColor: navActive || isActive ? 'rgba(255,255,255,0.2)' : category.color + '20',
                color: navActive || isActive ? 'white' : category.color 
              }}
            >
              <ApperIcon name={category.icon} size={16} />
            </div>
            <span className="font-medium">{category.name}</span>
          </div>
          
          {category.taskCount > 0 && (
            <Badge 
              variant={navActive || isActive ? 'default' : 'primary'}
              className={navActive || isActive ? 'bg-white/20 text-white' : ''}
            >
              {category.taskCount}
            </Badge>
          )}
        </motion.div>
      )}
    </NavLink>
  )
}

export default CategoryItem