import tasksData from '../mockData/tasks.json'

let tasks = [...tasksData]
let nextId = Math.max(...tasks.map(t => t.Id)) + 1

const delay = () => new Promise(resolve => setTimeout(resolve, 250))

export const taskService = {
  async getAll() {
    await delay()
    return [...tasks]
  },

  async getById(id) {
    await delay()
    const task = tasks.find(t => t.Id === parseInt(id))
    return task ? { ...task } : null
  },

  async create(taskData) {
    await delay()
    const newTask = {
      Id: nextId++,
      title: taskData.title,
      description: taskData.description || '',
      categoryId: taskData.categoryId || 'general',
      priority: taskData.priority || 1,
      dueDate: taskData.dueDate || null,
      completed: false,
      archived: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, data) {
    await delay()
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) throw new Error('Task not found')
    
    const updatedTask = {
      ...tasks[index],
      ...data,
      completedAt: data.completed && !tasks[index].completed ? new Date().toISOString() : tasks[index].completedAt
    }
    tasks[index] = updatedTask
    return { ...updatedTask }
  },

  async delete(id) {
    await delay()
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) throw new Error('Task not found')
    
    const deletedTask = tasks.splice(index, 1)[0]
    return { ...deletedTask }
  },

  async getByCategory(categoryId) {
    await delay()
    return tasks.filter(t => t.categoryId === categoryId && !t.archived).map(t => ({ ...t }))
  },

  async search(query) {
    await delay()
    const lowercaseQuery = query.toLowerCase()
    return tasks.filter(t => 
      !t.archived && (
        t.title.toLowerCase().includes(lowercaseQuery) ||
        t.description.toLowerCase().includes(lowercaseQuery)
      )
    ).map(t => ({ ...t }))
  },

  async reorder(taskIds) {
    await delay()
    // Simple reordering by updating a virtual order field
    taskIds.forEach((id, index) => {
      const task = tasks.find(t => t.Id === parseInt(id))
      if (task) {
        task.order = index
      }
    })
    return true
  }
}