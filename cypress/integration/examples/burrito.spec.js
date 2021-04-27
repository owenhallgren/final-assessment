describe('Home Page', () => {

  beforeEach(() => {
     cy.intercept("http://localhost:3001/api/v1/orders", {fixture: 'mock-orders.json'})
     cy.visit("http://localhost:3000")
  })

  it('should show basic layout on page load', () => {
    cy.get('h1')
    .contains('Burrito Builder')
    .get('button')
    .contains('beans')
    .get('p')
    .contains('Order: Nothing selected')
    .get('button')
    .contains('Submit Order')
  })

  it('should update order text', () => {
    cy.get('button[name="beans"]').click()
    .get('button[name="steak"]').click()
    .get('button[name="hot sauce"]').click()
    .get('p')
    .contains('hot sauce, steak, beans')
  })

  it('should fetch and show current orders on page load', () => {   
    cy.get('.order')
    .contains('Pat')
  })
})

describe('Posting new order', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/orders'
    },
      {
      statusCode: 200,
      body:
        {
          "name": "Owen",
          "ingredients": [
              "beans",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
          ]
        }
      });

    cy.fixture('mock-orders.json')
    .then(order => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/orders', order)
    })
    cy.visit('http://localhost:3000/') 
})

it('should show new order', () => {
  cy.get('input').type('Owen')
    .get('button[name="beans"]').click()
    cy.get('button[name="submit"]').click()
    .get('.order')
    .contains('Owen')
})
})
