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
            img: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vYmlsZSUyMHBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 2,
            title: "Laptop",
            price: 99900,
            qty: 5,
            img: 'https://images.unsplash.com/photo-1575024357670-2b5164f470c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 3,
            title: "jeans",
            price: 999,
            qty: 26,
            img: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbnMlMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
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

  // total price
  getCartTotal = ()=>
  {
    const {products} = this.state;

    let cartTotal = 0;

    products.map((product)=>{
      cartTotal = cartTotal + (product.qty * product.price);
    })
    return cartTotal;
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

        <div>Total : {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
