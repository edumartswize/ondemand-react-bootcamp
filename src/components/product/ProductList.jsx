import React, { useState } from "react";
import CategorySidebar from "../category/CategorySidebar";
import Products from "./ProductGrid";
import styled from "@emotion/styled";

const Div = styled.div`
    padding-left: 200px;
`

const ProductList = props => {
    const [categoriesFilter, setCategoriesFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <>
            <CategorySidebar 
                categoriesFilter={categoriesFilter}
                setCategoriesFilter={setCategoriesFilter}
                setCurrentPage={setCurrentPage}
            />
            <Div>
            <Products
                categoriesFilter={categoriesFilter}
                setCategoriesFilter={setCategoriesFilter}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={12}
            />
            </Div>
        </>
    );
};

export default ProductList;