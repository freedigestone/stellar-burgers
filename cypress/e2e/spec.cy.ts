describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });
});
/// <reference types="cypress" />

describe('Stellar Burgers — модальное окно ингредиента', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);

    cy.setCookie('accessToken', 'testAccessToken');
    window.localStorage.setItem('refreshToken', 'testRefreshToken');

    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    });

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('открывается модальное окно ингредиента', () => {
    cy.contains('Краторная булка').scrollIntoView().click({ force: true });

    cy.contains('Детали ингредиента').should('be.visible');
  });

  it('закрывается по клику на крестик', () => {
    cy.contains('Краторная булка').scrollIntoView().click({ force: true });

    cy.contains('Детали ингредиента').should('exist');

    // 🔴 КЛИКАЕМ ИМЕННО ПО SVG (CloseIcon)
    cy.get('svg').last().click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрывается по клику на оверлей', () => {
    cy.contains('Краторная булка').scrollIntoView().click({ force: true });

    cy.contains('Детали ингредиента').should('exist');

    // 🔴 ModalOverlayUI — это div ПОСЛЕ модалки
    cy.get('div').last().click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });
});
describe('Stellar Burgers — добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);

    // псевдо-авторизация
    cy.setCookie('accessToken', 'testAccessToken');
    window.localStorage.setItem('refreshToken', 'testRefreshToken');

    // мок ингредиентов
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    });

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('добавляется булка в конструктор', () => {
    cy.contains('Краторная булка')
      .closest('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    // булка появляется в конструкторе
    cy.contains('Краторная булка').should('exist');
  });

  it('добавляется начинка в конструктор', () => {
    cy.contains('Биокотлета')
      .closest('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    // начинка появляется в конструкторе
    cy.contains('Биокотлета').should('exist');
  });

  it('можно добавить булку и начинку одновременно', () => {
    // булка
    cy.contains('Краторная булка')
      .closest('li')
      .find('button')
      .click({ force: true });

    // начинка
    cy.contains('Биокотлета')
      .closest('li')
      .find('button')
      .click({ force: true });

    cy.contains('Краторная булка').should('exist');
    cy.contains('Биокотлета').should('exist');
  });
});
describe('Stellar Burgers — создание заказа', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);

    // 🔐 мок авторизации
    cy.setCookie('accessToken', 'testAccessToken');
    window.localStorage.setItem('refreshToken', 'testRefreshToken');

    // 🧪 ингредиенты
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // 👤 пользователь
    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    });

    // 📦 создание заказа
    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    });

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('создание заказа с корректным номером и очисткой конструктора', () => {
    // 🥯 добавляем булку
    cy.contains('Краторная булка')
      .closest('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    // 🥩 добавляем начинку
    cy.contains('Биокотлета')
      .closest('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    // 🛒 оформляем заказ
    cy.contains('Оформить заказ')
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });

    // ✅ проверяем модалку заказа
    cy.fixture('order.json').then((data) => {
      const orderNumber = data.order.number;

      // номер заказа отображается
      cy.contains(orderNumber.toString(), { timeout: 10000 }).should('exist');

      // закрываем модалку
      cy.get('body').type('{esc}');
      cy.contains(orderNumber.toString()).should('not.exist');
    });

    // 🧹 конструктор очищен
    cy.contains('Выберите булки').should('exist');
  });
});
