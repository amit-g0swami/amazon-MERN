import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { db } from "../../firebase";
import Order from "./Order";
import "./Orders.css";

function Orders() {
    const [orders, setOrders] = useState([null]);
    const [{ user, basket }] = useStateValue();

    useEffect(() => {
        if (user) {
            db.collection("users")
                .doc(user?.uid)
                .collection("orders")
                .orderBy("created", "desc")
                .onSnapshot((snapshot) => {
                    setOrders(
                        snapshot.docs.map((item) => ({ id: item.id, data: item.data() }))
                    );
                });
        } else {
            console.log(user);
            setOrders([]);
        }
    }, [user]);

    console.log(user);

    return (
        <div className="orders">
            <h1>Your Orders.</h1>
            <div className="orders__order">
                {user && orders.map((item) => <Order order={item} hidden={true} />)}
            </div>
        </div>
    );
}

export default Orders;