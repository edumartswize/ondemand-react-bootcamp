import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryCarousel from './CategoryCarousel';
import productCategories from '../../data/product-categories.json';
import { useProductCategories } from '../../utils/hooks/useProductCategories';

jest.mock('../../utils/hooks/useProductCategories');

describe('Test Category Carousel', () => {
    beforeEach(() => {
        useProductCategories.mockReturnValue({
            data: productCategories,
            isLoading: false,
        });
    });

    test('Render Categories Carousel Data', async () => {
        render(
            <BrowserRouter>
                <Routes>
                <Route path='/' element={<CategoryCarousel />} />
                </Routes>
            </BrowserRouter>
        );
    
        expect(await screen.findAllByRole("button")).toBeDefined();
    });
});
