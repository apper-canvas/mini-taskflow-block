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
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false
        state.items = [...state.items, action.payload]
        state.error = null
        console.log('Task created and added to Redux store:', action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        console.error('Task creation failed:', action.error.message)
      })
      .addCase(updateTask.pending, (state) => {
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task.Id === action.payload.Id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        state.error = null
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(deleteTask.pending, (state) => {
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.Id !== action.payload)
        state.error = null
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.searchResults = action.payload
      })
      .addCase(searchTasks.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export const { setSearchQuery, clearSearch } = tasksSlice.actions
export default tasksSlice.reducer