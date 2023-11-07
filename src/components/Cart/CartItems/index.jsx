import {
  AddCircleSharp,
  DeleteSharp,
  RemoveCircleSharp,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../../../store/slices/cartItems";

const CartItems = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Calculate the total cost based on the cart items
    const newTotalCost = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    );

    setTotalCost(newTotalCost);
  }, [cartItems]);

  const incrementQuantity = (cartItem) => {
    // Dispatch an action to increment the quantity of the item by 1
    console.log(cartItem.id, cartItem.quantity);
    dispatch(
      updateQuantity({ id: cartItem.id, quantity: cartItem.quantity + 1 })
    );
  };

  const decrementQuantity = (cartItem) => {
    console.log(cartItem.id, cartItem.quantity);
    // Dispatch an action to decrement the quantity of the item by 1
    if (cartItem.quantity > 1) {
      dispatch(
        updateQuantity({ id: cartItem.id, quantity: cartItem.quantity - 1 })
      );
    }
  };

  return (
    <>
      <h1 className="mt-5 ms-5"> Shopping Cart </h1>
      <div className="d-flex justify-content-evenly align-items-center my-5 shadow shadow-lg rounded mx-5 py-5">
        <div className="w-75">
          {cartItems.map((cartItem) => (
            <div
              className="d-flex justify-content-between mb-4"
              key={cartItem.id}
            >
              <img
                className="rounded"
                src="https://dummyimage.com/200x200.png/ff4444/ffffff"
                alt="Pizza"
              />
              <div className="d-flex flex-column text-start justify-content-evenly ms-4 w-25">
                <h3>{cartItem.itemName}</h3>
                <h5> {cartItem.description}</h5>
              </div>
              <div className="d-flex align-items-center mx-5">
                <RemoveCircleSharp
                  sx={{ fontSize: "60px", cursor: "pointer" }}
                  onClick={() => decrementQuantity(cartItem)}
                />
                <p className="mx-4 fs-3 pt-3">{cartItem.quantity}</p>
                <AddCircleSharp
                  sx={{ fontSize: "60px", cursor: "pointer" }}
                  onClick={() => incrementQuantity(cartItem)}
                />
              </div>
              <div className="d-flex align-items-center pt-3 fs-3 mx-5">
                <p>{cartItem.price}EGP</p>
              </div>
              <div className="d-flex align-items-center mx-5">
                <DeleteSharp
                  sx={{
                    fontSize: "60px",
                    cursor: "pointer",
                    color: red[600],
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeItem(cartItem));
                  }}
                />
              </div>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-around">
            <button className="btn bg-light btn-lg fs-2 px-5 border border-1 border-dark text-dark">
              Total Cost: {totalCost.toFixed(2)}EGP
            </button>
            <button className="btn bg-danger btn-lg fs-2 px-5 text-light">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
