import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import delIcon from "./delete.png";
import { qty, remove } from "../../state/reducers/cartSlice"

const DeleteAction = styled.div`
  float: left;
  width: 4em;
  height: 4em;
  margin: 0;
  cursor: pointer;
  img {
    object-fit: contain;
    width: 2em;
  }
`;

const ErrorMessage = styled.div`
    color: red;
`

const CartItem = ({item}) => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");

    const addQtyHandler = ((e, product) => {
        setErrorMessage("");
        if ( e.target.value > product.data.stock) {
            setErrorMessage("Only " + product.data.stock + " Items in stock");
        } else {
            dispatch(qty({product: product, qty: e.target.value}));
        }
    });

    return (
        <tr>
            <td>
                <img src={item.product.data.mainimage.url} alt="" width={50} />
            </td>
            <td>{item.product.data.name}</td>
            <td>${item.product.data.price}</td>
            <td>
                <input 
                    type="number" 
                    value={item.qty}
                    onChange={(e) => addQtyHandler(e, item.product)}
                    min="1" max="100">
                </input>
                {errorMessage && <ErrorMessage className="error"> {errorMessage} </ErrorMessage>}
            </td>
            <td>${item.qty * item.product.data.price}</td>
            <td>
                <DeleteAction>
                    <img src={delIcon} alt="delete" onClick={(e) => dispatch(remove(item.product))}></img>
                </DeleteAction>
            </td>
        </tr>
    );
};

export default CartItem;