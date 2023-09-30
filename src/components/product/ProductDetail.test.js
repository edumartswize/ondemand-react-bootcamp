import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import productDetail from '../../data/product-detail.json';
import productDetailNoStock from '../../data/product-detail-no-stock.json';
import { useProductDetail } from '../../utils/hooks/useProductDetail';
import ProductDetail from './ProductDetail';
import Header from '../layout/Header/Header';
import { Provider } from 'react-redux';
import { store } from '../../state/store';

jest.mock('../../utils/hooks/useProductDetail');

describe('Test Product Detail', () => {
    test('Render Product Detail', async () => {
        useProductDetail.mockReturnValue({
            data: productDetail,
            isLoading: false,
        });

        render(
            <Provider store={store}>
                <ProductDetail />
            </Provider>        
        );

        // Fetch data for a specific product
        expect((screen.queryAllByRole('img')).length).toBe(2);
        // Name Label
        expect(screen.getByText(/Disney Mickey Mouse Soap Dispenser/i)).toBeInTheDocument();
        // Product price
        expect(screen.getByText(/23/i)).toBeInTheDocument();
        // Product SKU
        expect(screen.getByText(/1107981469/i)).toBeInTheDocument();
        // Category name
        expect(screen.getByText(/bed--bath/i)).toBeInTheDocument();
        // Product tags
        expect(screen.getByText(/Bathroom/i)).toBeInTheDocument();
        expect(screen.getByText(/Featured/i)).toBeInTheDocument();
        // Product description
        expect(screen.getByText(/Brighten up your space with the all-magic/i)).toBeInTheDocument();
        // Quantity selector
        expect(screen.getByRole('spinbutton')).toBeInTheDocument();
        // Add to Car button
        expect(screen.getByRole('button').innerHTML).toBe('Add to car');
    });

    test('Add product to car', async () => {
        useProductDetail.mockReturnValue({
            data: productDetail,
            isLoading: false,
        });

        render (
            <Provider store={store}>
                <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<ProductDetail />} />
                </Routes>
                </BrowserRouter>
            </Provider>        
        );

        const addToCarBtn = screen.getByText(/Add to Car/i);
        fireEvent.click(addToCarBtn);
        fireEvent.click(addToCarBtn);
        expect(screen.getByRole('cartTotal').innerHTML).toBe('2');        
    });

    test('Add button disabled', async () => {
        useProductDetail.mockReturnValue({
            data: productDetailNoStock,
            isLoading: false,
        });

        render(
            <Provider store={store}>
                <ProductDetail />
            </Provider>        
        );

        expect(screen.getByRole('button')).toBeDisabled();
    });
});