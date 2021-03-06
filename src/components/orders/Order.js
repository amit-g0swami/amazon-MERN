import React from "react";
import "./Order.css";
import CurrencyFormat from "react-currency-format";
import CheckoutProductWrapper from "../checkoutproduct/CheckoutProduct";
import moment from "moment";

function Order({ order }) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {order.data.basket.map((item) => (
                <CheckoutProductWrapper
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    image={item.image}
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <p>
                        Order Total: <strong>{`${value}`}</strong>
                    </p>
                )}
                decimalScale={2}
                value={order.data.amount.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    );
}

export default Order;