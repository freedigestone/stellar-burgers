/// <reference types="cypress" />

describe('проверяем доступность приложения', () => {
  it('сервис должен быть доступен', () => {
    cy.visit('/');
  });
});

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

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('открывается модальное окно ингредиента', () => {
    cy.contains('Краторная булка').scrollIntoView().click({ force: true });

    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Краторная булка').should('be.visible'); // проверка данных ингредиента
  });

  it('закрывается по клику на крестик', () => {
    cy.contains('Краторная булка').scrollIntoView().click({ force: true });

    cy.contains('Детали ингредиента').should('exist');

    cy.get('svg').last().click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрывается по клику на оверлей', () => {
    cy.contains('Краторная булка').scrollIntoView().click({ force: true });

    cy.contains('Детали ингредиента').should('exist');

    cy.get('div').last().click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрывается по нажатию Escape', () => {
    cy.contains('Краторная булка').scrollIntoView().click({ force: true });

    cy.contains('Детали ингредиента').should('exist');

    cy.get('body').type('{esc}');

    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Stellar Burgers — добавление ингредиентов в конструктор', () => {
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

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('добавляется булка в конструктор', () => {
    cy.contains('Краторная булка')
      .closest('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    cy.contains('Краторная булка').should('exist');
  });

  it('добавляется начинка в конструктор', () => {
    cy.contains('Биокотлета')
      .closest('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    cy.contains('Биокотлета').should('exist');
  });

  it('можно добавить булку и начинку одновременно', () => {
    cy.contains('Краторная булка')
      .closest('li')
      .find('button')
      .click({ force: true });

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

    cy.setCookie('accessToken', 'testAccessToken');
    window.localStorage.setItem('refreshToken', 'testRefreshToken');

    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    });

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    });

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('создание заказа с корректным номером и очисткой конструктора', () => {
    cy.contains('Краторная булка')
      .closest('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    cy.contains('Биокотлета')
      .closest('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    cy.contains('Оформить заказ')
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });

    cy.fixture('order.json').then((data) => {
      const orderNumber = data.order.number;

      cy.contains(orderNumber.toString(), { timeout: 10000 }).should('exist');

      cy.get('body').type('{esc}');
      cy.contains(orderNumber.toString()).should('not.exist');
    });

    cy.contains('Выберите булки').should('exist');
  });
});
