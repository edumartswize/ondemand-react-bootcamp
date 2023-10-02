import React, { useEffect, useState } from "react";
import CategorySidebarList from "./CategorySidebar.styled";
import { useProductCategories } from "../../utils/hooks/useProductCategories";

const CategorySidebar = ({ categoriesFilter, setCategoriesFilter, setCurrentPage}) => {
    const { data } = useProductCategories();
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        setCategories(data.results && data.results);
    }, [data]);

    const handleClick = (event) => {
        const slugs = event.target.value.split(',');
        if (event.target.checked) {
            setCategoriesFilter(categoriesFilter.concat(slugs));
        } else {
            setCategoriesFilter(categoriesFilter.filter((slug) => !slugs.includes(slug)));
        }
        setCurrentPage(1);
    };

    const clearCategoriesFilter = () => {
        setCategoriesFilter([]);
    };

    return (
        <CategorySidebarList>
            <div className='sidebar s-bar-block s-light-gray s-card'>
                <h2>Categories</h2>
                {categories && categories.map((cat, index) => {
                    return (
                        <div 
                            data-filter={cat.slugs} 
                            id={cat.id} key={cat.id} 
                            className={categoriesFilter.includes(cat.slugs[0]) ? "s-bar-item selected" : "s-bar-item"}
                        >
                            <input value={cat.slugs} type="checkbox" onChange={handleClick} checked={categoriesFilter.includes(cat.slugs[0])}/>
                            <span>{cat.data.name}</span>
                        </div>
                    );
                })}
                {categoriesFilter.length>0 &&
                    <button onClick={clearCategoriesFilter}>Clear</button>
                }
            </div>
        </CategorySidebarList>
    );
};

export default CategorySidebar;