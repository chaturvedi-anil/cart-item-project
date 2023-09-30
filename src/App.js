import React from 'react';
import './App.css';
import Cart from './Cart';
import Navbar from './Navbar';
import {app} from './index';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';


class App extends React.Component 
{
  constructor()
  {
    super();
    this.state = 
    {
      products:[],
      // loading:true
    }
  }

  // componetdidMount

  async componentDidMount()
  {
    const db=getFirestore(app);
    const productsCol = await collection(db, 'products');
    const unsubscribe=onSnapshot(productsCol, (snapshot)=>
    {
      // it will return array of products
      const productList = snapshot.docs.map((doc) =>
      {
        const data=doc.data();
        data['id']= doc.id;
        
        return data;
      });
      
      this.setState(
      {
        products:productList,
        // loading:false
      });
    })
  }
  componentWillUnmount() 
  {
    // Unsubscribe from the Firestore listener to prevent memory leaks
    if (this.state.unsubscribe) 
    {
      this.state.unsubscribe();
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
        {/* {loading && <h1>Loading Products...</h1> } */}
        <div style={{fontSize:30, padding:10}}>Total : {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
