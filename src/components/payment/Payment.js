import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckoutProduct from "../checkoutproduct/CheckoutProduct";
import { useStateValue } from "../StateProvider";
import "./Payment.css";
import CurrencyFormat from "react-currency-format";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { getBasketTotal } from "../reducer";
import { db } from "../../firebase";
import axios from "../axios";

function Payment() {
    const [{ user, basket }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [succeded, setSucceded] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
            });
            setClientSecret(response.data.clientSecret);
        };
        getClientSecret();
    }, [basket]);
    const stripe = useStripe();
    const element = useElements();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: element.getElement(CardElement),
                },
            })
            .then(({ paymentIntent }) => {
                setSucceded(true);
                setError(null);
                setProcessing(false);
                dispatch({
                    type: "EMPTY_BASKET",
                });
                db.collection("users")
                    .doc(user?.uid)
                    .collection("orders")
                    .doc(paymentIntent.id)
                    .set({
                        basket: basket,
                        amount: paymentIntent,
                        created: paymentIntent.created,
                    });
                navigate("/orders");
            });
    };
    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout (<Link className="link" to="/checkout">{basket.length} items</Link>)</h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Adress</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Fakestreet 122, Hornstull</p>
                        <p>Stockholm, Sweden</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
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

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => <h3>Order Total: {value}</h3>}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button className="btn" disabled={processing || disabled || succeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;