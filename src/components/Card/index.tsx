import React from 'react';
import { useSelector } from 'react-redux';
import { Product } from '../../utils/consts';
import { RootState } from '../../store/store';
import styles from './styles.module.css';

interface Props {
  product: Product;
  onToggleFavorite: () => void;
}

const colors = {
  odd: '#C1F7C6',
  even: '#D1EEF9',
};

export const Card = React.memo(({ product, onToggleFavorite }: Props) => {
  const { id, img, name, price, category } = product;
  const favorites = useSelector((state: RootState) => state.products.favorites);

  const isFavorite = favorites.some((fav) => fav.id === id);

  return (
    <div className={styles.card}>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p>{price} $</p>
      <div className={styles.tags}>
        {category.map((tag, index) => (
          <span
            className={styles.tag}
            style={{
              backgroundColor: index % 2 === 0 ? colors.even : colors.odd,
            }}
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <button onClick={onToggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
});
