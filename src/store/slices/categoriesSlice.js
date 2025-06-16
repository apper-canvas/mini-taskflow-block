import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { categoryService } from '@/services'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await categoryService.getAll()
    return response
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
    activeCategory: null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setActiveCategory } = categoriesSlice.actions
export default categoriesSlice.reducer