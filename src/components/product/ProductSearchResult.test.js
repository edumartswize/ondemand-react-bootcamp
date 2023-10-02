import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ProductSearchResult from "./ProductSearchResult";
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../layout/Header/Header";

// Can Not mock useProductSearch because filter is applied in GraphQL query

describe('Test Product Search', () => {
    
    test('Filter Products Test', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/' element={<ProductSearchResult />} />
                        <Route path='search' element={<ProductSearchResult />} /> 
                    </Routes>
                </BrowserRouter>
            </Provider>
        );

        const searchText = screen.getByPlaceholderText(/Search./i);
        fireEvent.change(searchText, {target: {value: 'mouse'}});
        const buscar = screen.getByText(/buscar/i);
        fireEvent.click(buscar);
        const itemsOnPage = (await screen.findAllByText(/Add to Car/i));
        const mouseItems = (await screen.findAllByText(/mouse/i));
        
        // Data render according with search
        expect(itemsOnPage.length).toBe(mouseItems.length);

        fireEvent.change(searchText, {target: {value: 'xxxxxxx'}});
        fireEvent.click(buscar);
        // Empty page when no results from search
        expect((screen.queryByText(/Add to Car/i))).not.toBeInTheDocument();
    });
});