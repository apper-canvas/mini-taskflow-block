import categoryData from '../mockData/categories.json'

let categories = [...categoryData]
let nextId = Math.max(...categories.map(c => c.Id)) + 1

const delay = () => new Promise(resolve => setTimeout(resolve, 200))

export const categoryService = {
  async getAll() {
    await delay()
    return [...categories]
  },

  async getById(id) {
    await delay()
    const category = categories.find(c => c.Id === id)
    return category ? { ...category } : null
  },

  async create(categoryData) {
    await delay()
    const newCategory = {
      Id: nextId++,
      name: categoryData.name,
      color: categoryData.color,
      icon: categoryData.icon,
      taskCount: 0
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, data) {
    await delay()
    const index = categories.findIndex(c => c.Id === id)
    if (index === -1) throw new Error('Category not found')
    
    categories[index] = { ...categories[index], ...data }
    return { ...categories[index] }
  },

  async delete(id) {
    await delay()
    const index = categories.findIndex(c => c.Id === id)
    if (index === -1) throw new Error('Category not found')
    
    const deletedCategory = categories.splice(index, 1)[0]
    return { ...deletedCategory }
  },

  async updateTaskCount(categoryId, count) {
    await delay()
    const category = categories.find(c => c.Id === categoryId)
    if (category) {
      category.taskCount = count
    }
    return category ? { ...category } : null
  }
}