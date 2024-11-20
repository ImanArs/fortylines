import { Product } from "../utils/types";

export interface ProductsState {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  favorites: Product[];
  showFavorites: boolean;
  isLoading: boolean;
  error: null | string;
}