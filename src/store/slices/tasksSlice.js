import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { taskService } from '@/services'

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await taskService.getAll()
    return response
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData) => {
    const response = await taskService.create(taskData)
    return response
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, data }) => {
    const response = await taskService.update(id, data)
    return response
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    await taskService.delete(id)
    return id
  }
)

export const searchTasks = createAsyncThunk(
  'tasks/searchTasks',
  async (query) => {
    const response = await taskService.search(query)
    return response
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    searchResults: [],
    loading: false,
    error: null,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    clearSearch: (state) => {
      state.searchQuery = ''
      state.searchResults = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task.Id === action.payload.Id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.Id !== action.payload)
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.searchResults = action.payload
      })
  },
})

export const { setSearchQuery, clearSearch } = tasksSlice.actions
export default tasksSlice.reducer