import React from 'react';
import './App.css';
import Cart from './Cart';
import Navbar from './Navbar';
import {app} from './index';
import { getFirestore, collection, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';


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
    this.db=getFirestore(app);
    this.productsCol =collection(this.db, 'products');
  }

  // componetdidMount

  componentDidMount()
  {
    const unsubscribe=onSnapshot(this.productsCol, (snapshot)=>
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
        unsubscribe
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
      // Get the index of the product to update
      const index = products.findIndex((item) => item.id === product.id);
      if (index === -1) {
        console.error('Product not found in the state');
        return;
      }
      let productToUpdate = products[index];

      let docRef = doc(this.productsCol, productToUpdate.id);
      
      updateDoc(docRef, {qty: productToUpdate.qty + 1})
      .then(()=>
      {
        console.log("qty updated");
      })
      .catch((err)=>
      {
        console.log('error in updating qty : ', err);
      })
  }

  //decrease qunatity
  decreaseQuantity = (product)=>
  {
    const {products} = this.state;
    // Get the index of the product to update
    const index = products.findIndex((item) => item.id === product.id);
    if (index === -1) {
      console.error('Product not found in the state');
      return;
    }
    let productToUpdate = products[index];

    let docRef = doc(this.productsCol, productToUpdate.id);
    
    updateDoc(docRef, {qty: productToUpdate.qty - 1})
    .then(()=>
    {
      console.log("qty updated");
    })
    .catch((err)=>
    {
      console.log('error in updating qty : ', err);
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

  // add product in firebase
  addProduct=  ()=>
  {
    addDoc(this.productsCol, {
      title: 'fan',
      qty: 2,
      price: 4000,
      img: ''
    })
    .then((docRef)=>
    {
      console.log(`new product added : ${docRef}`);
    })
    .catch((err)=>
    {
      console.log("err : ",err);
    })
  }

  render()
  {
    const {products} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        {/* <button onClick={this.addProduct} style={{padding: 20, fontSize:25}}>Add Product</button> */}
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
