import React from 'react';

// class component
class CartItem extends React.Component{
    render(){
        return(
            <div className="cart-item">

                <div className="left-block">
                    {/* item images */}
                    <img src="" style={style.Image} />
                </div>

                <div className="right-block">
                    <div style={style.font}>Phone</div>
                    <div>Rs. 999</div>
                    <div>Qty: 1</div>

                    <div className="cart-item-actions">
                        {/* buttons */}
                        <button>+</button>
                        <button>-</button>
                        <button>X</button>
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
        fontSize:25
    }
}
export default CartItem;