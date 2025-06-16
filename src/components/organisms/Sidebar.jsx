import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import CategoryItem from '@/components/molecules/CategoryItem'
import { fetchCategories } from '@/store/slices/categoriesSlice'

function Sidebar() {
  const dispatch = useDispatch()
  const { categoryId } = useParams()
  const { items: categories, loading } = useSelector(state => state.categories)
  const { items: tasks } = useSelector(state => state.tasks)
  
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  
  // Calculate task counts for each category
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    taskCount: tasks.filter(task => 
      task.categoryId === category.Id && !task.completed && !task.archived
    ).length
  }))
  
  // Add "All Tasks" option
  const allTasksCount = tasks.filter(task => !task.completed && !task.archived).length
  const allCategories = [
    {
      Id: 'all',
      name: 'All Tasks',
      icon: 'List',
      color: '#5B4CFF',
      taskCount: allTasksCount
    },
    ...categoriesWithCounts
  ]
  
  if (loading) {
    return (
      <aside className="w-80 bg-surface border-r border-gray-200 p-6">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </aside>
    )
  }
  
  return (
    <motion.aside
      className="w-80 bg-surface border-r border-gray-200 p-6 overflow-y-auto"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2 className="text-xl font-display font-semibold text-gradient mb-2">
          TaskFlow
        </h2>
        <p className="text-sm text-gray-600">
          Organize your day efficiently
        </p>
      </div>
      
      <nav className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          Categories
        </h3>
        {allCategories.map((category, index) => (
          <motion.div
            key={category.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CategoryItem
              category={category}
              isActive={categoryId === category.Id || (!categoryId && category.Id === 'all')}
            />
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  )
}

export default Sidebar