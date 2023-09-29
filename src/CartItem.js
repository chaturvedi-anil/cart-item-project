import React from 'react';

// class component
class CartItem extends React.Component
{
    render()
    {
        // console.log("this.props : ", this.props);
        const {title, price, qty} = this.props.product;
        const {
                product, 
                onDecreaseQuantity, 
                onIncreaseQuantity, 
                onDeleteProduct
            } = this.props;

        return(
            <div className="cart-item">

                <div className="left-block">
                    {/* item images */}
                    <img src="" style={style.Image} />
                </div>

                <div className="right-block">
                    <div style={style.font}>{title}</div>
                    <div style={style.fontColor}>Rs. {price}</div>
                    <div id="item-qty" style={style.fontColor}>Qty: {qty}</div>

                    <div className="cart-item-actions">
                        {/* buttons */}
                        <img 
                            src="https://cdn-icons-png.flaticon.com/128/992/992651.png" 
                            alt="increase" 
                            className="action-icons" 
                            onClick={()=> onIncreaseQuantity(product)} 
                        />
                        <img 
                            src="https://cdn-icons-png.flaticon.com/128/992/992683.png" 
                            alt="decrease" 
                            className="action-icons" 
                            onClick={()=> onDecreaseQuantity(product)} 
                        />
                        <img 
                            src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" 
                            alt="delete" 
                            className="action-icons"
                            onClick={()=> onDeleteProduct(product.id)}  
                        />
                    </div>
                </div>
            </div>
        )
    }
}

// styling component using object

const style = {
    Image:{
        height: 130,
        width: 130,
        borderRadius: 4,
        background: "#ccc"
    },
    font:
    {
        fontSize:25,
    },
    fontColor:
    {
        color: "#777"
    }
     
}
export default CartItem;