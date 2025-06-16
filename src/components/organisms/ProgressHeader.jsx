import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { fetchStats } from '@/store/slices/statsSlice'

function ProgressHeader() {
  const dispatch = useDispatch()
  const { data: stats, loading } = useSelector(state => state.stats)
  const { items: tasks } = useSelector(state => state.tasks)
  
  useEffect(() => {
    dispatch(fetchStats())
  }, [dispatch])
  
  // Calculate real-time stats from tasks
  const todayTasks = tasks.filter(task => {
    const today = new Date().toDateString()
    const taskDate = new Date(task.createdAt).toDateString()
    return taskDate === today && !task.archived
  })
  
  const completedToday = todayTasks.filter(task => task.completed).length
  const totalToday = todayTasks.length
  const completionRate = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0
  
  if (loading) {
    return (
      <header className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 w-20 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </header>
    )
  }
  
  const statsItems = [
    {
      label: 'Completed Today',
      value: completedToday,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: 'TrendingUp',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Current Streak',
      value: stats.currentStreak,
      icon: 'Flame',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Total Tasks',
      value: tasks.filter(t => !t.archived).length,
      icon: 'List',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ]
  
  return (
    <motion.header
      className="bg-white border-b border-gray-200 p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Let's make today productive
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {statsItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                <ApperIcon name={item.icon} size={18} className={item.color} />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {item.value}
                </div>
                <div className="text-xs text-gray-500">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.header>
  )
}

export default ProgressHeader