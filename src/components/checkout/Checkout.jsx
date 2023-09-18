import { useSelector } from "react-redux";
import { CheckoutList, CheckoutForm } from "./Checkout.styled";
import CheckoutItem from "./CheckoutItem";
import { Link } from "react-router-dom";

const Checkout = props => {
    const items = useSelector((state) => state.cart.items);
    const total = items.reduce((sum, value) => sum + (Number(value.qty) * Number(value.product.data.price)), 0);

    return (
        <>
            <CheckoutForm>
                <label>Name</label>
                <input type="text"></input>
                <br/>
                <label>Email</label>
                <input type="text"></input>
                <br/>
                <label>Zip Code</label>
                <input type="text"></input>
                <br/>
                <label>Notes</label>
                <textarea></textarea>
            </CheckoutForm>
            <br/><br/>
            <CheckoutList>
            <table>
                <tbody>
                <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
                </tr>
                {items.map((item, index) => {
                    return (
                        <CheckoutItem key={index}
                            item={item}
                        />
                    );
                })}
                <tr>
                    <td></td><td></td>
                    <td className="total">Total: </td>
                    <td className="total">${total}</td>
                </tr>
                </tbody>
            </table>
            <button className="button-chk">Place Order</button>
            <Link to='/cart'>
                <button className="button-chk">Go back to cart</button>
            </Link>
            </CheckoutList>
        </>
    );
};

export default Checkout;