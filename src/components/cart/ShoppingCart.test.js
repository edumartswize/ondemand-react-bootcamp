import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShoppingCart from "./ShoppingCart";
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { add, clear } from "../../state/reducers/cartSlice"
import renderWithStore from "../../utils/test/renderWithStore";

const product = {'id': 'YZWdwRIAACkAumb-', 
    'data': {
        'name': 'Disney Mickey Mouse Soap Dispenser', 
        'price': 23,
        'stock': 10,
        'mainimage': {
            'url': 'https://images.prismic.io/wizeline-academy/5b557651-ed8c-46f4-9b4f-c00ef94e4a02_2.webp?auto=compress,format'
        }
    }
};

const product2 = {'id': 'YZWTvxIAACkAujoz', 
    'data': {
        'name': 'Bathrobe Disney Mickey Mouse', 
        'price': 81, 
        'stock': 13,
        'mainimage': {
            'url': 'https://images.prismic.io/wizeline-academy/7cbed35a-d943-44c9-956c-a59cbb81e2ba_1.jpeg?auto=compress,format'
        }
    }
};

describe('Test shopping cart', () => {
    test('Render empty cart', () => {
        renderWithStore(
                <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ShoppingCart />} />
                </Routes>
                </BrowserRouter>
        );

        expect(screen.queryByAltText('delete')).not.toBeInTheDocument();
    });

    test('List of products in cart', () => {
        const { store } = renderWithStore(
                <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ShoppingCart />} />
                </Routes>
                </BrowserRouter>
        );

        store.dispatch(clear());
        store.dispatch(add({product: product, qty: 2}));
        store.dispatch(add({product: product2, qty: 3}));
        // Validate list of items
        expect(screen.getByText('Disney Mickey Mouse Soap Dispenser')).toBeInTheDocument();
        expect(screen.getByText('Bathrobe Disney Mickey Mouse')).toBeInTheDocument();
        expect(screen.getByText(/23/i)).toBeInTheDocument();
        expect(screen.getByText(/81/i)).toBeInTheDocument();
        const qtySels = screen.getAllByRole('spinbutton');
        expect(qtySels[0].value).toBe('2');
        expect(qtySels[1].value).toBe('3');
        expect(screen.getByText(/46/i)).toBeInTheDocument();
        expect(screen.getByText(/243/i)).toBeInTheDocument();
        expect(screen.getAllByAltText('delete').length).toBe(2);
        // Total
        expect(screen.getByText(/289/i).className).toBe('total');
    });

    test('Actions in cart', async () => {
        const { store } = renderWithStore(
                <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ShoppingCart />} />
                </Routes>
                </BrowserRouter>
        );

        store.dispatch(clear());
        store.dispatch(add({product: product, qty: 2}));
        store.dispatch(add({product: product2, qty: 3}));

        // Validate add qty
        expect(screen.getByText(/289/i).className).toBe('total');
        const qtySels = screen.getAllByRole('spinbutton');
        fireEvent.change(qtySels[0], {target: {value: '5'}});
        expect(screen.getByText(/358/i).className).toBe('total');
        // Qty > stock
        fireEvent.change(qtySels[0], {target: {value: '50'}});
        expect(await screen.findByText(/Items in stock/i)).toBeInTheDocument();
        
        // Validate delete item
        const delBtns = screen.getAllByAltText('delete');
        fireEvent.click(delBtns[0]);
        const amt243 = screen.getAllByText(/243/i);
        expect(amt243[1].className).toBe('total');
    });

});
