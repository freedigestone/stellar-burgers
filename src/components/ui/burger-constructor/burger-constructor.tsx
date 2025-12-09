import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  onCloseModal
}) => (
  <section className={styles.burger_constructor}>
    {/* Верхняя булка */}
    {constructorItems.bun ? (
      <div className={`${styles.element} mb-4 mr-4`}>
        <ConstructorElement
          type='top'
          isLocked
          text={`${constructorItems.bun.name} (верх)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5`}>
        Выберите булки
      </div>
    )}

    {/* Начинка */}
    <ul className={styles.elements}>
      {constructorItems.ingredients.length > 0 ? (
        constructorItems.ingredients.map(
          (item: TIngredient & { id: string }, index: number) => (
            <BurgerConstructorElement
              ingredient={item}
              index={index}
              totalItems={constructorItems.ingredients.length}
              key={item.id}
            />
          )
        )
      ) : (
        <div className={`${styles.noBuns} ml-8 mb-4 mr-5`}>
          Выберите начинку
        </div>
      )}
    </ul>

    {/* Нижняя булка */}
    {constructorItems.bun ? (
      <div className={`${styles.element} mt-4 mr-4`}>
        <ConstructorElement
          type='bottom'
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5`}>
        Выберите булки
      </div>
    )}

    {/* Цена и кнопка */}
    <div className={`${styles.total} mt-10 mr-4`}>
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>

      <Button
        htmlType='button'
        type='primary'
        size='large'
        onClick={onOrderClick}
      >
        Оформить заказ
      </Button>
    </div>

    {/* Модалка загрузки */}
    {orderRequest && (
      <Modal onClose={onCloseModal} title={'Оформляем заказ...'}>
        <Preloader />
      </Modal>
    )}

    {/* Модалка номера заказа */}
    {orderModalData && !orderRequest && (
      <Modal onClose={onCloseModal} title={''}>
        <OrderDetailsUI orderNumber={orderModalData.number} />
      </Modal>
    )}
  </section>
);
