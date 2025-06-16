import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '@/components/organisms/Sidebar'
import QuickAddBar from '@/components/organisms/QuickAddBar'
import ProgressHeader from '@/components/organisms/ProgressHeader'

function Layout() {
  return (
    <div className="h-full flex flex-col bg-white">
      <ProgressHeader />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <QuickAddBar />
          <motion.div 
            className="flex-1 overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Layout