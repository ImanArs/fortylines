import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAllProducts, setCategory, toggleFavoritesView, addFavorite, removeFavorite } from '../../store/productsSlice';
import { AppDispatch, RootState } from '../../store/store';
import { Card } from '../Card';
import styles from './styles.module.css';
import { Product } from '../../utils/consts';

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    products,
    categories,
    selectedCategory,
    showFavorites,
    favorites,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.products);
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([])
  const [searchValue, setSearchValue] = useState('')

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((item) => item.category.includes(selectedCategory));

  const displayedProducts = showFavorites
    ? filteredProducts.filter((product) => favorites.some((fav) => fav.id === product.id))
    : filteredProducts;

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  const handleToggleFavorite = (product: Product) => {
    const isFavorite = favorites.some((fav) => fav.id === product.id);
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  useEffect(() => {
    if (searchValue) {
      setSearchedProducts(
        products.filter(prod => prod.name.toLowerCase().includes(searchValue.toLowerCase()))
      )
    } else {
      setSearchedProducts([])
    }
  }, [searchValue])
  
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <input 
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        {searchValue && (searchedProducts.length > 0 ? (
          <div className={styles.result}>
            {searchedProducts.map((product) => (
              <div key={product.id}>{product.name}</div>
            ))}
          </div>
        ) : (
          <div className={styles.result}>
            Ничего не найдено
          </div>
        ))}
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.categories}>
          <h2>Categories</h2>
          <ul>
            {categories.length > 0 && categories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryChange(category)}
                style={{ color: selectedCategory === category ? 'red' : 'black' }}
              >
                {category}
              </li>
            ))}
          </ul>
          <button onClick={() => dispatch(toggleFavoritesView())}>
            {showFavorites ? 'Show All' : 'Show Favorites'}
          </button>
        </div>

        <div className={styles.productsGrid}>
          {displayedProducts.map((product) => (
            <Card
              product={product}
              key={product.id}
              onToggleFavorite={() => handleToggleFavorite(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
