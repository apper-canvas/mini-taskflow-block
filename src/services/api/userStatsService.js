import { userStatsData } from '../mockData/userStats.json'

let stats = { ...userStatsData }

const delay = () => new Promise(resolve => setTimeout(resolve, 150))

export const userStatsService = {
  async getStats() {
    await delay()
    return { ...stats }
  },

  async updateStats(newStats) {
    await delay()
    stats = { ...stats, ...newStats }
    return { ...stats }
  },

  async incrementCompletedToday() {
    await delay()
    stats.completedToday += 1
    stats.totalTasks += 1
    
    // Update streak logic
    const today = new Date().toDateString()
    const lastUpdate = stats.lastCompletionDate
    
    if (lastUpdate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      
      if (lastUpdate === yesterday.toDateString()) {
        stats.currentStreak += 1
      } else {
        stats.currentStreak = 1
      }
      
      if (stats.currentStreak > stats.longestStreak) {
        stats.longestStreak = stats.currentStreak
      }
      
      stats.lastCompletionDate = today
    }
    
    // Update completion rate
    stats.completionRate = Math.round((stats.completedToday / Math.max(stats.totalTasks, 1)) * 100)
    
    return { ...stats }
  }
}