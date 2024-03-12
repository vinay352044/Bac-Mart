import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../../redux/actions/productActions";
import { useEffect } from "react";
import ProductCard from "./ProductCard";



const FetchData = () => {
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

  const products = useSelector((state) => state.productReducer.products);
  useEffect(()=>{
    setProductData(products);
  },[products])
  

  return (
   <ProductCard productData={productData}/>
  );
};

export default FetchData;