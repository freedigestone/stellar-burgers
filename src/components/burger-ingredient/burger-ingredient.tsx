import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { setBun, addIngredient } from '../../services/burgerConstructorSlice';
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ backgroundLocation: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
