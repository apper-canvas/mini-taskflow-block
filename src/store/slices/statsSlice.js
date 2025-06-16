import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userStatsService } from '@/services'

export const fetchStats = createAsyncThunk(
  'stats/fetchStats',
  async () => {
    const response = await userStatsService.getStats()
    return response
  }
)

export const incrementCompletedToday = createAsyncThunk(
  'stats/incrementCompletedToday',
  async () => {
    const response = await userStatsService.incrementCompletedToday()
    return response
  }
)

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    data: {
      totalTasks: 0,
      completedToday: 0,
      currentStreak: 0,
      longestStreak: 0,
      completionRate: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(incrementCompletedToday.fulfilled, (state, action) => {
        state.data = action.payload
      })
  },
})

export default statsSlice.reducer