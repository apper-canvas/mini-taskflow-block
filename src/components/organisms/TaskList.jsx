import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'
import EmptyState from '@/components/molecules/EmptyState'

function TaskList({ tasks, categories, onEditTask, onCreateTask, title = "Tasks" }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon="CheckSquare"
        title="No tasks found"
        description="Create your first task to get started with TaskFlow"
        actionLabel="Create Task"
        onAction={onCreateTask}
      />
    )
  }
  
  // Sort tasks by priority (high to low) and then by creation date
  const sortedTasks = tasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed - b.completed // Incomplete tasks first
    }
    if (a.priority !== b.priority) {
      return b.priority - a.priority // Higher priority first
    }
    return new Date(b.createdAt) - new Date(a.createdAt) // Newer tasks first
  })
  
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
          {title}
        </h2>
        
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {sortedTasks.map((task) => {
              const category = categories.find(c => c.Id === task.categoryId)
              return (
                <motion.div
                  key={task.Id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskCard
                    task={task}
                    category={category}
                    onEdit={onEditTask}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default TaskList