import React from 'react'
import CheckoutProduct from '../checkoutproduct/CheckoutProduct';
import { useStateValue } from '../StateProvider';
import Subtotal from '../subtotal/Subtotal'
import "./CheckOut.css"

function CheckOut() {
    const [{ basket, user }] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className="checkout__ad"
                    src="https://i.pinimg.com/originals/9b/0e/39/9b0e3965c35bfb505bb99090128296f6.jpg"
                    alt=""
                />
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout__title">Your shopping basket</h2>
                    {basket.map((item) => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default CheckOut