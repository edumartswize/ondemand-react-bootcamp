import React from "react";

const CheckoutItem = ({item}) => {

    return (
        <tr>
            <td>{item.product.data.name}</td>
            <td>${item.product.data.price}</td>
            <td>{item.qty}</td>
            <td>${item.qty * item.product.data.price}</td>
        </tr>
    );
};

export default CheckoutItem;