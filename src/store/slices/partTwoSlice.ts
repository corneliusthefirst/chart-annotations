import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Description, DescriptionsState, Point } from "../../utils/types"
import StockService from "../../services/stockService"

const stockService = new StockService()

const initialState: DescriptionsState = {
  descriptions: [],
  isLoading: false,
  stockData: [],
  error: "",
}

export const fetchStockDataAsync = createAsyncThunk("partTwo/stockData", async () => {
  try {
    const response = await stockService.getStock()
    const data = response.data["Time Series (Daily)"]
    const formattedData: Point[] = Object.keys(data).map((date) => ({
      x: new Date(date).getTime(),
      y: parseFloat(data[date]["1. open"]),
    }))
    return formattedData
  } catch (error) {
    throw new Error('Stock data fetching failed');
  }
})

const partTwoSlice = createSlice({
  name: "partTwo",
  initialState,
  reducers: {
    addDescription(state, action: PayloadAction<Description>) {
      state.descriptions.push(action.payload)
    },
    removeDescription(state, action: PayloadAction<number>) {
      state.descriptions = state.descriptions.filter(
        (description) => description.id !== action.payload
      )
    },
    clearError(state) {
      state.error = ""
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchStockDataAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
       .addCase(
        fetchStockDataAsync.fulfilled,
        (state, action: PayloadAction<Point[] | undefined>) => {
          state.stockData = action.payload || []
          state.isLoading = false
        }
      )
      .addCase(fetchStockDataAsync.rejected, (state, action) => {
        state.error = action.error.message ?? "Stock data fetching failed"
        state.isLoading = false
      })
  },
})

export const { addDescription, removeDescription, clearError } = partTwoSlice.actions

export default partTwoSlice.reducer
