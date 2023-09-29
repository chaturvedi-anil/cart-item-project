import React from 'react';
import './App.css';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component 
{
  constructor()
  {
    super();
    this.state = 
    {
      products:
      [
        {
            id: 1,
            title: "Mobile Phone",
            price: 999,
            qty: 1,
            img: ''
        },
        {
            id: 2,
            title: "Laptop",
            price: 99900,
            qty: 5,
            img: ''
        },
        {
            id: 3,
            title: "jeans",
            price: 999,
            qty: 26,
            img: ''
        }
      ]
    }
  }

  // increase quantity
  increaseQuantity =(product)=>
  {
      const {products} = this.state;
      const index = products.indexOf(product);

      products[index].qty += 1;

      this.setState({
          products:products
      })
  }

  //decrease qunatity
  decreaseQuantity = (product)=>
  {
      const {products} = this.state;
      const index = products.indexOf(product);
      
      if(products[index].qty === 0)
      {
          return;
      }

      products[index].qty -= 1;

      this.setState({
          products:products
      })
  }
  // delete product

  deleteProduct = (id)=>
  {
      const {products} = this.state;
      
      // filter will return all products except that id product
      const items = products.filter((item)=> item.id !== id);

      this.setState({
          products: items
      })
  }

  getCartCount = ()=>
  {
    const {products} = this.state;
    let count=0;

    products.forEach((product)=>
    {
      count += product.qty; 
    })

    return count;
  }

  render()
  {
    const {products} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        <Cart 
          products={products}
          onIncreaseQuantity={this.increaseQuantity}
          onDecreaseQuantity={this.decreaseQuantity}
          onDeleteProduct = {this.deleteProduct}
        />
      </div>
    );
  }
}

export default App;
