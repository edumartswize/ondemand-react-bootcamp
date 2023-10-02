import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import Product from "./Product";
import { useLocation } from "react-router";
import { useProductSearch } from "../../utils/hooks/useProductSearch";
import Pagination from "../../utils/Pagination";

const Grid = styled.div`
  margin: 16px auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 8px;
  row-gap: 8px;
`;

const ProductSearchResult = () => {
    const pageSize = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const { search } = useLocation();
    const searchParms = new URLSearchParams( search );
    const { data } = useProductSearch(searchParms.get('q'), pageSize, currentPage);
    const [ products, setProducts ] = useState([]);
    
    useEffect(() => {
        setProducts(data.results);
        setCurrentPage(1);
    }, [data]);

    if ( !products ) return null;
    return (
        <>
        <Grid>
            {products.map((prod, index) => {
                return (
                    <Product key={index} prod={prod}></Product>
                );
            })}
        </Grid>
        <Pagination 
            className="pagination-bar"
            currentPage={currentPage}
            totalPageCount={data.total_pages ? data.total_pages : 0}
            pageSize={pageSize}
            onPageChange={page => setCurrentPage(page)}
        />
    </>
    );
};

export default ProductSearchResult;