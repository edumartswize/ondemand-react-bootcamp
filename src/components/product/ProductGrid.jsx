import React, {useEffect, useMemo, useState} from "react";
import styled from "@emotion/styled";
import Product from "./Product";
import { useProducts } from "../../utils/hooks/useProducts";
import { useLocation } from "react-router";
import Pagination from "../../utils/Pagination";

const Grid = styled.div`
  margin: 16px auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 8px;
  row-gap: 8px;
`;

const Products = ({ categoriesFilter, setCategoriesFilter, currentPage, setCurrentPage, pageSize }) => {
    const { search } = useLocation();
    const { data } = useProducts(currentPage);
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const searchParms = new URLSearchParams( search );
        const category = searchParms.get('category');
        if (category){
            setCategoriesFilter(category.split(','));
        }
    }, [search, setCategoriesFilter]);
    
    useEffect(() => {
        if (categoriesFilter && categoriesFilter.length > 0) {
            setProducts(data.results && data.results.filter(product => categoriesFilter.includes( product.data.category.slug)));
        } else {
            setProducts(data.results);
        }
    }, [data, categoriesFilter]);

    const currentPageProds = useMemo(() => {
        if(!products) return null;
        const firstIndex = (currentPage - 1) * pageSize;
        const lastIndex = firstIndex + pageSize;
        return products.slice(firstIndex, lastIndex);
    }, [currentPage, products, pageSize]);
    
    if ( !currentPageProds ) return null;
    
    return (
        <>
        <Grid>
            {currentPageProds.map((prod, index) => {
                return (
                    <Product key={index} prod={prod}></Product>
                );
            })}
        </Grid>
        <Pagination 
            className="pagination-bar"
            currentPage={currentPage}
            totalPageCount={Math.ceil(products.length / pageSize)}
            pageSize={pageSize}
            onPageChange={page => setCurrentPage(page)}
        />
    </>
    );
};

export default Products;