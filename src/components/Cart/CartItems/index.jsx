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
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const OrderItemsComponent = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
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
  useEffect(() => {
    if (!localStorage.id || !localStorage.access || !localStorage.refresh) {
      navigate("/signIn");
      return;
    }
  });

  return (
    <>
      <div className="mx-5 ">
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
                <div className="container ">
                  <div className="d-flex  flex-column justify-content-center align-items-center my-5 mx-5 py-5 shadow-lg rounded position-relative px-5">
                    {order.orderItems.map((orderItem) => (
                      <div key={orderItem.product.id} className="w-100 mb-5">
                        <div className="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between mb-4">
                          <div className=" text-lg-start mb-3 mb-lg-0">
                            {console.log(`${orderItem.product.image}`)}
                            <img
                              className="rounded"
                              src={orderItem.product.image}
                              alt="Pizza"
                              width={200}
                              style={{ maxWidth: "100%", height: "150px" }}
                            />
                          </div>
                          <div className="text-center text-lg-start d-flex flex-column justify-content-evenly ">
                            <h3>{orderItem.product.name}</h3>
                            <h5>{orderItem.product.description}</h5>
                          </div>
                          <div className="d-flex align-items-center justify-content-center justify-content-lg-between mx-5 mx-lg-0">
                            <RemoveCircleSharp
                              sx={{
                                fontSize: "60px",
                                cursor: "pointer",
                                color: "blue",
                              }}
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
                            <p className="mx-4 fs-3 pt-3">
                              {orderItem.quantity}
                            </p>
                            <AddCircleSharp
                              sx={{
                                fontSize: "60px",
                                cursor: "pointer",
                                color: "blue",
                              }}
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
                          <div className="d-flex align-items-center justify-content-center justify-content-lg-between pt-3 fs-3 mx-5 mx-lg-0">
                            <p>{orderItem.product.price}EGP</p>
                          </div>
                          <div className="d-flex align-items-center justify-content-center justify-content-lg-between mx-5 mx-lg-0">
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
                    <div className="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between">
                      <div className="btn bg-light btn-lg fs-2 px-5 border border-1 border-dark text-dark mb-3 mb-lg-0 me-5">
                        Total Cost: {order.total_price}EGP
                      </div>
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
                <h3>
                  Your Shopping Cart is Empty,proceed to{" "}
                  <Link to={"/browse"}>Products</Link>
                </h3>
                <img
                  src={`http://localhost:8000/products/products/empty.jpg`}
                  width={800}
                  height={450}
                />
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
      </div>
    </>
  );
};

export default OrderItemsComponent;
