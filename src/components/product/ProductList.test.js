import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategorySidebar from '../category/CategorySidebar';
import Products from '../product/ProductGrid';
import productCategories from '../../data/product-categories.json';
import { useProductCategories } from '../../utils/hooks/useProductCategories';
import products from '../../data/products.json';
import { useProducts } from '../../utils/hooks/useProducts';

jest.mock('../../utils/hooks/useProductCategories');
jest.mock('../../utils/hooks/useProducts');

describe('Test Category Sidebar', () => {
    beforeEach(() => {
        useProductCategories.mockReturnValue({
            data: productCategories,
            isLoading: false,
        });
        useProducts.mockReturnValue({
            data: products,
            isLoading: false,
        });
    });

    test('Render Category Sidebar Data', async () => {
        let categoriesFilter = [];
    
        const setCategoriesFilter = filter => {
            categoriesFilter = filter;
        };
    
        render(
            <CategorySidebar 
                categoriesFilter={categoriesFilter}
                setCategoriesFilter={setCategoriesFilter}
            />
        );
    
        expect(await screen.findAllByRole('checkbox')).toBeDefined();
    });
    
    test('Filtering Products and Pagination', async () => {
        const Wrap = () => {
            const [categoriesFilter, setCategoriesFilter] = useState([]);
            const [currentPage, setCurrentPage] = useState(1);
            
            return (
                <>
                <CategorySidebar 
                    categoriesFilter={categoriesFilter}
                    setCategoriesFilter={setCategoriesFilter}
                    setCurrentPage={setCurrentPage}
                />
                <div>
                <Products
                    categoriesFilter={categoriesFilter}
                    setCategoriesFilter={setCategoriesFilter}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageSize={12}
                />
                </div>
            </>
            );
        };
    
        render(
            <BrowserRouter>
                <Routes>
                <Route path='/' element={<Wrap />} />
                </Routes>
            </BrowserRouter>
        );
    
        expect((screen.queryAllByRole('listitem')).length).toBe(5);
        const prevPage = (await screen.findAllByRole('listitem'))[0];
        // previous page desabled when in first page
        expect(prevPage.className.includes('disabled')).toBe(true);
        const lastPage = (await screen.findAllByRole('listitem'))[3];
        fireEvent.click(lastPage);
        const nextPage = (await screen.findAllByRole('listitem'))[4];
        // next page desabled when in first page
        expect(nextPage.className.includes('disabled')).toBe(true);
        const checkbox = (await screen.findAllByRole('checkbox'))[0];
        // click on first filter (Bed & Bath)
        fireEvent.click(checkbox);
        // must load 8 products
        expect((await screen.findAllByRole('img')).length).toBe(8);
        // no pagination controls (all products can be included in one page)
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
});
