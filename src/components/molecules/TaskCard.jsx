import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import Checkbox from '@/components/atoms/Checkbox'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { updateTask, deleteTask } from '@/store/slices/tasksSlice'
import { incrementCompletedToday } from '@/store/slices/statsSlice'

function TaskCard({ task, category, onEdit }) {
  const dispatch = useDispatch()
  
  const handleToggleComplete = async () => {
    try {
      await dispatch(updateTask({ 
        id: task.Id, 
        data: { completed: !task.completed } 
      })).unwrap()
      
      if (!task.completed) {
        dispatch(incrementCompletedToday())
        toast.success('Task completed! 🎉')
      } else {
        toast.info('Task marked as incomplete')
      }
    } catch (error) {
      toast.error('Failed to update task')
    }
  }
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(task.Id)).unwrap()
        toast.success('Task deleted')
      } catch (error) {
        toast.error('Failed to delete task')
      }
    }
  }
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 3: return '#EF476F'
      case 2: return '#FFD166'
      case 1: return '#06D6A0'
      default: return '#9CA3AF'
    }
  }
  
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 3: return 'High'
      case 2: return 'Medium'
      case 1: return 'Low'
      default: return 'None'
    }
  }
  
  return (
    <motion.div
      className={`
        bg-white rounded-lg shadow-card hover:shadow-card-hover p-4 border-l-4 transition-all duration-200
        ${task.completed ? 'opacity-60' : ''}
      `}
      style={{ borderLeftColor: getPriorityColor(task.priority) }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      layout
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`
              font-medium text-gray-900 ${task.completed ? 'line-through' : ''}
            `}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="p-1 h-auto"
              >
                <ApperIcon name="Edit2" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-1 h-auto text-error hover:text-red-700"
              >
                <ApperIcon name="Trash2" size={14} />
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className={`
              text-sm text-gray-600 mb-3 ${task.completed ? 'line-through' : ''}
            `}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {category && (
                <Badge color={category.color} size="sm">
                  <ApperIcon name={category.icon} size={12} className="mr-1" />
                  {category.name}
                </Badge>
              )}
              
              <Badge 
                color={getPriorityColor(task.priority)}
                size="sm"
              >
                {getPriorityLabel(task.priority)}
              </Badge>
            </div>
            
            {task.dueDate && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <ApperIcon name="Calendar" size={14} />
                <span>{format(new Date(task.dueDate), 'MMM d')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard