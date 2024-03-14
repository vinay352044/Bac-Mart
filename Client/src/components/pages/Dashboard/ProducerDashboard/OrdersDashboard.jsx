import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card.component";
import { useDispatch, useSelector } from "react-redux";
import { worker, current_orders } from "../../../../redux/actions/orderActions";
function OrdersDashboard({whichcomponent}) {
  // let sellerId ;
// const [sellerId,setsellerId]= useState();
const roleData = JSON.parse(localStorage.getItem("role"))
let sellerId = parseInt(roleData.seller.id);
let productidArray = roleData.seller.productsToSell || [];
// const Id = parseInt(roleData.seller.id);

// console.log(sellerData);
  const [totalorders, settotalorders] = useState([]);
  const [acceptedorders,setacceptedorders]= useState([]);
  const [inventory, setinventory] = useState([]);
  const [availabeleorders, setavailabeleorders] = useState([]);
  const [cardData, setcardData] = useState([]);
  const [flag,setflag]= useState(false);
  const sellersState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();
 
  function handleflag(){
    setflag(!flag);
  }

  useEffect(() => {
   
// setsellerId(dummysellerid);
    dispatch(
      worker(
        "FETCH",
        "FETCH_SELLERS_DETAILS",
        `http://localhost:3000/sellers/${sellerId}`
      )
    );
   

    dispatch(
      worker("FETCH", "FETCH_TOTAL_ORDERS", "http://localhost:3000/orders")
    );
  }, [dispatch,flag]);

  useEffect(() => {
    console.log("s state");
    console.log(sellersState);
    settotalorders(sellersState.total_orders);
    setavailabeleorders(sellersState.current_orders);
    
    setacceptedorders(sellersState.accptedorders);
    
  }, [sellersState]);


useEffect(()=>{
  console.log(acceptedorders);
},[acceptedorders])


useEffect(()=>{
 
  // console.log(sellersState.acceptedorders);
},[sellersState.accptedorders] )


  useEffect(() => {


    if (
      sellersState.sellers_details.productsToSell !== undefined &&
      sellersState.needed_products.length <
        sellersState.sellers_details.productsToSell.length
    ) {
      
      console.log("if worked");

      const apitosend = productidArray.map(
        (id) => `http://localhost:3000/products/${id}`
      );

      // const api = ["http://localhost:3000/products/1",
      // "http://localhost:3000/products/2",
      // "http://localhost:3000/products/3"]
      dispatch(worker("FETCH_MULTI", "FETCH_NEEDED_PRODUCTS", apitosend));
    } else {
      console.log("else worked");
    }

    setinventory(sellersState.needed_products);
  }, [
    sellersState.sellers_details.productsToSell,
    sellersState.needed_products,
  ]);

  useEffect(() => {
    
    const dummyavailableorders = totalorders.filter((order) => {
      if (order.order_accepted !== true)
        return productidArray.includes(order.product_id);
    });
   
    dispatch(current_orders(dummyavailableorders));
  }, [totalorders]);

  useEffect(() => {
   
    console.log(availabeleorders);
    let dummycardData = [];
    if (availabeleorders.length > 0) {
      dummycardData = availabeleorders.map((order) => {
        return inventory.find((product) => product.id === order.product_id);
      });
    }
    console.log(dummycardData);
    setcardData(dummycardData);
    
  }, [availabeleorders, inventory]);

  return (
    <>
      <div className="grid grid-cols-4">

      {whichcomponent === "pendingorders" ? (
    availabeleorders && availabeleorders.length && cardData && cardData.length !== 0 ? (
      availabeleorders.map((order, index) => (
        <Card
          key={order.order_id}
          card_data={{
            cardData: cardData[index],
            order: order,
            sellerid: sellerId,
            handleflag:handleflag,
          }}
        />
      ))
    ) : (
      <h1>No Pending Orders</h1>
    )
  ) : whichcomponent === "acceptedorders" ? (
    totalorders && totalorders.length ? (
      totalorders.map((order, index) => {
        if (order.order_accepted && productidArray.includes(order.product_id)) {
          return (
            <Card
              key={order.order_id}
              card_data={{
                order: order,
                cardData: inventory.find((product) => product.id === order.product_id),
                sellerid: sellerId,
                handleflag:handleflag,
                
              }}
              hideButtons={true}
            />
          );
        } else {
          return null; // Return null if the condition is not met
        }
      })
    ) : (
      <h1>No Accepted Orders</h1>
    )
  ) : (
    <h1>No Orders</h1>
  )}

      </div>
    </>
    
  );
}

export default OrdersDashboard;
 {/* {availabeleorders &&
          availabeleorders.length &&
          cardData &&
          cardData.length != 0 ? (
            availabeleorders.map((order, index) => (
              <Card
                key={order.order_id}
                card_data={{
                  cardData: cardData[index],
                  order: order,
                  sellerid: sellerId,
                
                }}
              />
              
            ))
          ) : (
            <h1>No Orders</h1>
          )} */}


           {/* {totalorders && totalorders.length ? (
  totalorders.map((order, index) => {
    if (order.order_accepted && productidArray.includes(order.product_id)) {
      return (
        <Card
          key={order.order_id}
          card_data={{
            order: order,
            cardData: inventory.find((product) => product.id === order.product_id),
            sellerid: sellerId
          }}
          hideButtons = {true}
        />
      );
    } 
  })
) : (
  <h1>No Orders</h1>
)} */}