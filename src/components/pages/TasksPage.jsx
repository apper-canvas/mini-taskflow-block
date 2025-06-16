import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import TaskList from '@/components/organisms/TaskList'
import TaskModal from '@/components/organisms/TaskModal'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { fetchTasks } from '@/store/slices/tasksSlice'
import { fetchCategories } from '@/store/slices/categoriesSlice'

function TasksPage() {
  const dispatch = useDispatch()
  const { categoryId } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  
  const { 
    items: tasks, 
    searchResults, 
    searchQuery, 
    loading: tasksLoading 
  } = useSelector(state => state.tasks)
  
  const { 
    items: categories, 
    loading: categoriesLoading 
  } = useSelector(state => state.categories)
  
  useEffect(() => {
    dispatch(fetchTasks())
    dispatch(fetchCategories())
  }, [dispatch])
  
  // Filter tasks based on category or search
  const getFilteredTasks = () => {
    if (searchQuery) {
      return searchResults
    }
    
    if (categoryId && categoryId !== 'all') {
      return tasks.filter(task => task.categoryId === categoryId && !task.archived)
    }
    
    return tasks.filter(task => !task.archived)
  }
  
  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`
    }
    
    if (categoryId && categoryId !== 'all') {
      const category = categories.find(c => c.Id === categoryId)
      return category ? category.name : 'Tasks'
    }
    
    return 'All Tasks'
  }
  
  const handleCreateTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }
  
  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }
  
  const filteredTasks = getFilteredTasks()
  const pageTitle = getPageTitle()
  
  if (tasksLoading || categoriesLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-2xl font-display font-bold text-gray-900">
            {pageTitle}
          </h1>
          <Button onClick={handleCreateTask}>
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Task
          </Button>
        </div>
        <SearchBar />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <TaskList
          tasks={filteredTasks}
          categories={categories}
          onEditTask={handleEditTask}
          onCreateTask={handleCreateTask}
          title={pageTitle}
        />
      </div>
      
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
      />
    </motion.div>
  )
}

export default TasksPage