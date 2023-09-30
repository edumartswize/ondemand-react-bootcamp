import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useProductDetail } from "../../utils/hooks/useProductDetail";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";
//import "swiper/navigation.css"
import { useDispatch } from "react-redux";
import { add } from "../../state/reducers/cartSlice"

const ImageContainer = styled.div`
    .mySwiper {
        width:30%;
    }

    img {
        display: block;
        width: 100%;
        height: auto;
    }
`
const ProductContainer = styled.div`
    border: solid 1px #DDD;
    background-color: #DDD;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);

    .product-grid {
        &-title {
            display: block;
            background-color: cyan;
            padding: 8px 16px;
            text-transform: uppercase;
        }
        &-info {
            font-size: 12px;
            padding: 12px;
        }
        &-type {
            text-transform: uppercase;

        }
        &-bold {
            font-weight: bold;
        }
        &-action {
            padding: 12px;
            column-gap: 5px;
        }
    }
`

const ErrorMessage = styled.div`
    color: red;
`

const ProductDetail = parms => {
    const items = useSelector((state) => state.cart.items);
    const { productId } = useParams();
    const { data } = useProductDetail(productId);
    const [ product, setProduct ] = useState([]);
    const [ qty, setQty ] = useState(1);
    const [errorMessage, setErrorMessage] = React.useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.results_size > 0) {
            setProduct(data.results[0]);
        }
    }, [data]);

    const addHandler = (() => {
        setErrorMessage("");
        let qtyToOrder = qty;
        const item = items.find((item) => item.product.id === product.id);
        if (item) {
             qtyToOrder += item.qty;
        }
        if ( qtyToOrder > product.data.stock) {
            setErrorMessage("Only " + product.data.stock + " Items in stock");
        } else {
            dispatch(add({product: product, qty: qty}));
        }
    });
 
    if ( !product.data ){
        return null;
    }

    return (
        <>
        <ImageContainer>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                { product.data.images.map((image, index) => {
                    return (
                        <SwiperSlide key={index}><img src={image.image.url} alt=""/></SwiperSlide>
                    );
                })}
            </Swiper>
        </ImageContainer>
        <ProductContainer>
            <span className="product-grid-title">{product.data.name}</span>
            <div className="product-grid-info">
            <span className="product-grid-bold">${product.data.price}</span>
            <div className="product-grid-bold">{product.data.sku}</div>
            <div>{product.data.category.slug}</div>
            { product.tags.map((tag, index) => {
                return (
                    <span key={index}>{tag}-</span>
                );
            })}
            <p>
            { product.data.description.map((des, index) => {
                return (
                    <span key={index}>{des.text}</span>
                );
            })}
            </p>
            { product.data.specs.map((spec, index) => {
                return (
                    <div key={index}>
                    <span className="product-grid-bold">{spec.spec_name}</span>: <span className="product-grid-type">{spec.spec_value}</span>
                    </div>
                );
            })}
            </div>
            <div className="product-grid-action">
                <label>  Qty: </label>
                <input 
                    type="number" 
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    min="1" max="100">
                </input>
                <button onClick={addHandler} disabled={!product.data.stock > 0}>Add to car</button>
                {errorMessage && <ErrorMessage className="error"> {errorMessage} </ErrorMessage>}
            </div>
        </ProductContainer>
        </>
    );
};

export default ProductDetail;