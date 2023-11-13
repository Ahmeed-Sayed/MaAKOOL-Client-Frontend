import * as React from "react";
import {
  AddCircleSharp,
  DeleteSharp,
  RemoveCircleSharp,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const OrderItemsComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const order = useSelector((state) => state.order.cartItems);
  const loading = useSelector((state) => state.order.loading);
  const queryClient = useQueryClient();

  return (
    <>
      {loading ? (
        <CircularProgress
          size={40}
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      ) : (
        <>
          {order && order.orderItems.length > 0 ? (
            <>
              <h1 className="mt-5 ms-5">Shopping Cart</h1>

              <div className="d-flex justify-content-evenly align-items-center my-5 shadow shadow-lg rounded mx-5 py-5 position-relative">
                <div className="w-75">
                  {order.orderItems.map((orderItem) => (
                    <div key={orderItem.product.id}>
                      <div className="d-flex justify-content-between mb-4">
                        <img
                          className="rounded"
                          src="https://dummyimage.com/200x200.png/ff4444/ffffff"
                          alt="Pizza"
                        />
                        <div className="d-flex flex-column text-start justify-content-evenly ms-4 w-25">
                          <h3>{orderItem.product.name}</h3>
                          <h5> {orderItem.product.description}</h5>
                        </div>
                        <div className="d-flex align-items-center mx-5">
                          <RemoveCircleSharp
                            sx={{ fontSize: "60px", cursor: "pointer" }}
                            onClick={async () => {
                              try {
                                const response = await axios.post(
                                  "http://localhost:8000/orders/decrease_from_order/",
                                  {
                                    product: orderItem.product.id,
                                    userId: localStorage.id,
                                  }
                                );
                                queryClient.invalidateQueries("order");
                                return response;
                              } catch (error) {
                                console.error(error);
                              }
                            }}
                          />
                          <p className="mx-4 fs-3 pt-3">{orderItem.quantity}</p>
                          <AddCircleSharp
                            sx={{ fontSize: "60px", cursor: "pointer" }}
                            onClick={async () => {
                              try {
                                const response = await axios.post(
                                  "http://localhost:8000/orders/add_to_order/",
                                  {
                                    product: orderItem.product.id,
                                    userId: localStorage.id,
                                  }
                                );
                                queryClient.invalidateQueries("order");
                                return response;
                              } catch (error) {
                                console.error(error);
                              }
                            }}
                          />
                        </div>
                        <div className="d-flex align-items-center pt-3 fs-3 mx-5">
                          <p>{orderItem.product.price}EGP</p>
                        </div>
                        <div className="d-flex align-items-center mx-5">
                          <DeleteSharp
                            sx={{
                              fontSize: "60px",
                              cursor: "pointer",
                              color: red[600],
                            }}
                            onClick={async () => {
                              try {
                                const response = await axios.post(
                                  "http://localhost:8000/orders/remove_from_order/",
                                  {
                                    product: orderItem.product.id,
                                    userId: localStorage.id,
                                  }
                                );
                                queryClient.invalidateQueries("order");
                                return response;
                              } catch (error) {
                                console.error(error);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                  <div className="d-flex justify-content-around">
                    <button className="btn bg-light btn-lg fs-2 px-5 border border-1 border-dark text-dark">
                      Total Cost: {order.total_price}EGP
                    </button>
                    <button
                      className="btn bg-danger btn-lg fs-2 px-5 text-light"
                      onClick={async () => {
                        try {
                          const response = await axios.post(
                            "http://localhost:8000/orders/submit_order",
                            { userId: localStorage.id }
                          );
                          queryClient.invalidateQueries("order");
                          handleClick();
                          return response;
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center mt-5">
              <h1>Your Shopping Cart is Empty</h1>
            </div>
          )}
        </>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", fontSize: "20px" }}
        >
          Ordered successfully submitted!
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrderItemsComponent;
