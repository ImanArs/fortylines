import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductsState } from './types';
import { Product } from '../utils/types';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://636a27e5b10125b78fd2189a.mockapi.io/data');
      return response.data;
    } catch (err: unknown | Error) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const initialState: ProductsState = {
  products: [],
  categories: [],
  selectedCategory: 'all',
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  showFavorites: false,
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.showFavorites = false;
    },
    toggleFavoritesView: (state) => {
      state.showFavorites = !state.showFavorites;
    },
    addFavorite: (state, action) => {
      const product = action.payload;
      if (!state.favorites.some((fav) => fav.id === product.id)) {
        state.favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      const productId = action.payload;
      state.favorites = state.favorites.filter((fav) => fav.id !== productId);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.categories = ['all', ...new Set(action.payload.flatMap((item: Product) => item.category) as string)];
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategory, toggleFavoritesView, addFavorite, removeFavorite } = productsSlice.actions;

export default productsSlice.reducer;
