import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { setSearchQuery, searchTasks, clearSearch } from '@/store/slices/tasksSlice'

function SearchBar() {
  const dispatch = useDispatch()
  const { searchQuery } = useSelector(state => state.tasks)
  const [localQuery, setLocalQuery] = useState(searchQuery)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        dispatch(setSearchQuery(localQuery))
        if (localQuery.trim()) {
          dispatch(searchTasks(localQuery))
        } else {
          dispatch(clearSearch())
        }
      }
    }, 300)
    
    return () => clearTimeout(timer)
  }, [localQuery, searchQuery, dispatch])
  
  const handleClear = () => {
    setLocalQuery('')
    dispatch(clearSearch())
  }
  
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <ApperIcon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" size={16} />
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default SearchBar