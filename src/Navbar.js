import React from 'react';


// functional component
const Navbar= (props)=> 
{
    return(
        <div style={styles.nav}>
            <div style={styles.cartIconContainer}>
                <img style={styles.cartIcon} src="https://cdn-icons-png.flaticon.com/128/2838/2838895.png" alt="shopping_cart" />
                <span style={styles.cartCount}>
                    {props.count}
                </span>
            </div>
        </div>
    );
}
const styles={
    nav:
    {
        height: 70,
        background: '#4267b2',
        display: "flex",
        justifyContent: 'flex-end',
        alignItems: 'center'  
    },
    cartIconContainer:
    {
        posiiton: 'relative',
        marginRight: 30
    },
    cartIcon:
    {
        height: 32,
        // marginRight: 20
    },
    cartCount: 
    {
        background: 'yellow',
        borderRadius: '50%',
        padding: '4px 8px',
        position: 'absolute',
        right: 10,
        top: 5
    }
}

     
export default Navbar;





