import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import type { RootState } from '../../services/store';
import type { TIngredient } from '../../utils/types';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.data
  );

  // Если ингредиенты еще загружаются — показываем лоадер
  if (!ingredients.length) return <Preloader />;

  // Ищем нужный ингредиент
  const ingredientData = ingredients.find(
    (item: TIngredient) => item._id === id
  );

  // Если ингредиента нет
  if (!ingredientData) return <p>Ингредиент не найден</p>;

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
