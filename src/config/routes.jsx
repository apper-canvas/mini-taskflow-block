import { Routes, Route } from 'react-router-dom'
import TasksPage from '@/components/pages/TasksPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
      <Route path="/category/:categoryId" element={<TasksPage />} />
    </Routes>
  )
}