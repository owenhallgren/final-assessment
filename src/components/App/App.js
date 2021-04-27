import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
    }
  }

  componentDidMount() {
    this.getOrders()
  }

  getNewOrder = (state) => {
    if(!state.name || !state.ingredients.length) {
      console.log('failstate')
    } else {
      this.postOrder(state)
    }
  }

  postOrder = (order) => {
    fetch('http://localhost:3001/api/v1/orders', {
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
    .then(data => this.setState({orders: [data, ...this.state.orders]}))
  }

  getOrders() {
    fetch('http://localhost:3001/api/v1/orders')
    .then(res => res.json())
    .then(data => this.setState({orders: data.orders}))
    .catch(err => console.error('Error fetching:', err));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm getNewOrder={this.getNewOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
