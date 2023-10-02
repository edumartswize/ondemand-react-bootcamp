import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import ShoppingCartStyle from "./ShoppingCart.styled";

const ShoppingCart = () => {
    const items = useSelector((state) => state.cart.items);
    const total = items.reduce((sum, value) => sum + (Number(value.qty) * Number(value.product.data.price)), 0);

    return (
        <ShoppingCartStyle>
            <table>
                <tbody>
                <tr>
                <th></th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
                </tr>
                {items.map((item, index) => {
                    return (
                        <CartItem key={index}
                            item={item}
                        />
                    );
                })}
                <tr>
                    <td></td><td></td><td></td>
                    <td className="total">Total: </td>
                    <td className="total">${total}</td>
                </tr>
                </tbody>
            </table>
            <Link to='/checkout'>
                <button className="button-chk">Proceed to checkout</button>
            </Link>
        </ShoppingCartStyle>
    );
};

export default ShoppingCart;