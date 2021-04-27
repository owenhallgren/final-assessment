export const getOrders = () => {
    return fetch('http://localhost:3001/api/v1/orders')
    .then(res => res.json())
  }

  export const postNewOrder = (order) => {
    return fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        name: order.name,
        ingredients: order.ingredients
      })
    })
    .then(res => res.json())
  }