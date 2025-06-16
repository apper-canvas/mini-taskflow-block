import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { createTask } from '@/store/slices/tasksSlice'

function QuickAddBar() {
  const dispatch = useDispatch()
  const { items: categories } = useSelector(state => state.categories)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(1)
  const [categoryId, setCategoryId] = useState('general')
  const [isExpanded, setIsExpanded] = useState(false)
  
const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      toast.error('Please enter a task title')
      return
    }
    
    console.log('QuickAddBar: Submitting task creation')
    console.log('Task data:', { title: title.trim(), categoryId, priority: parseInt(priority) })
    
    try {
      const resultAction = await dispatch(createTask({
        title: title.trim(),
        categoryId,
        priority: parseInt(priority),
      }))
      
      if (createTask.fulfilled.match(resultAction)) {
        console.log('QuickAddBar: Task creation successful, resetting form')
        setTitle('')
        setPriority(1)
        setCategoryId('general')
        setIsExpanded(false)
        toast.success('Task created successfully!')
      } else {
        console.error('QuickAddBar: Task creation failed', resultAction.error)
        toast.error('Failed to create task: ' + (resultAction.error?.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('QuickAddBar: Unexpected error during task creation', error)
      toast.error('Failed to create task: ' + error.message)
    }
  }
  
  const priorityOptions = [
    { value: 1, label: 'Low', color: '#06D6A0' },
    { value: 2, label: 'Medium', color: '#FFD166' },
    { value: 3, label: 'High', color: '#EF476F' },
  ]
  
  return (
    <motion.div
      className="bg-white border-b border-gray-200 p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onFocus={() => setIsExpanded(true)}
            />
          </div>
          
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2"
          >
            <ApperIcon name={isExpanded ? 'ChevronUp' : 'Settings'} size={18} />
          </Button>
          
          <Button type="submit" disabled={!title.trim()}>
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Task
          </Button>
        </div>
        
        {isExpanded && (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Category:</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {categories.map(category => (
                  <option key={category.Id} value={category.Id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}

export default QuickAddBar