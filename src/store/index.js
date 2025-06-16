import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import categoriesReducer from './slices/categoriesSlice'
import statsReducer from './slices/statsSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
    stats: statsReducer,
  },
})