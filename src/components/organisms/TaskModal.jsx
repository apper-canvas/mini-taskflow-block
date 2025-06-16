import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import TaskForm from '@/components/molecules/TaskForm'
import { createTask, updateTask } from '@/store/slices/tasksSlice'

function TaskModal({ isOpen, onClose, task = null }) {
  const dispatch = useDispatch()
  
  const handleSubmit = async (formData) => {
    try {
      if (task) {
        await dispatch(updateTask({ id: task.Id, data: formData })).unwrap()
        toast.success('Task updated successfully!')
      } else {
        await dispatch(createTask(formData)).unwrap()
        toast.success('Task created successfully!')
      }
      onClose()
    } catch (error) {
      toast.error(task ? 'Failed to update task' : 'Failed to create task')
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative z-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            
            <TaskForm
              task={task}
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default TaskModal