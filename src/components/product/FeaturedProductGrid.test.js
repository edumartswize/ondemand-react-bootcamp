import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FeaturedProducts from './FeaturedProductGrid';
import featuredProducts from '../../data/featured-products.json';
import { useFeaturedProducts } from '../../utils/hooks/useFeaturedProducts';

jest.mock('../../utils/hooks/useFeaturedProducts');

describe('Test Feature Products Grid', () => {
    beforeEach(() => {
        useFeaturedProducts.mockReturnValue({
            data: featuredProducts,
            isLoading: false,
        });
    });

    test('Render Feature Products Data', async () => {
        render(
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<FeaturedProducts />} />
            </Routes>
            </BrowserRouter>
        );
    
        expect(await screen.findAllByRole("img")).toBeDefined();
    });
});
