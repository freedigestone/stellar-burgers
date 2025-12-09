import { forwardRef, useMemo } from 'react';
import { useAppSelector } from '../../services/hooks';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { RootState } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  // ✅ БЕРЕМ НАСТОЯЩИЙ КОНСТРУКТОР ИЗ REDUX
  const burgerConstructor = useAppSelector(
    (state: RootState) => state.burgerConstructor
  );

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: Record<string, number> = {};

    // считаем основные ингредиенты
    ingredients.forEach((ingredient: TIngredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });

    // булка = 2
    if (bun) counters[bun._id] = 2;

    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
