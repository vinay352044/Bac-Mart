import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { worker,reject_order } from "../../../../redux/actions/orderActions";

function Card({ card_data,hideButtons }) {
  const sellerState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();
  console.log("card called");
  console.log(card_data);

  const { cardData, order, sellerid,handleflag } = card_data;
  const [productdetails, setProductdetails] = useState(cardData);
  const [orderData, setorderData] = useState(order);

  useEffect(() => {
    setProductdetails(cardData);
    setorderData(order);
  }, [cardData, order]);

  console.log(productdetails);
  console.log(order);
  console.log(sellerid);

  useEffect(() => {
    console.log("order changed");
    console.log(orderData);
  }, [orderData]);

  function handleAccept() {
    console.log("accepted clicked");
    if (orderData && !orderData.order_accepted) {
      const temporder = {
        ...orderData,
        order_accepted: true,
        accepted_by: `${sellerid}`,
      };
      setorderData(temporder);

      dispatch(
        worker(
          "ACCEPT_ORDER",
          "UPDATE_ACCEPT_ORDER",
          `http://localhost:3000/orders/${temporder.id}`,
          temporder
        )
      );
    }

    handleflag();
  }

  function handleReject() {
    const temporder = {
      ...orderData,
      order_accepted: false,
      accepted_by: "",
    };
    setorderData(temporder);
    
    dispatch(reject_order(temporder.id));
    handleflag();
  }

  console.log("product details in card");
  console.log(productdetails);
  return (
    <>
      {productdetails ? (
        <div>
          <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src="https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-base  font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
                  {productdetails.description}
                </h5>
              </a>

              <div className="flex items-center justify-between ">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${productdetails.price}
                </span>

                <div>

                 {hideButtons?(<></>):(<><button
                  
                  onClick={handleAccept}
                  className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mx-1 text-center dark:bg-[#0295db] dark:hover:bg-[#9d9da1] dark:focus:ring-blue-800"
                >
                  Accept
                </button>

                <button
                 
                  onClick={handleReject}
                  className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-[#0295db] dark:hover:bg-[#9d9da1] dark:focus:ring-blue-800"
                >
                  Reject
                </button></>) } 
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default Card;
