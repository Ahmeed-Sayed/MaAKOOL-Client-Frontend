import {
  AddCircleSharp,
  DeleteSharp,
  RemoveCircleSharp,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";

const CartItems = () => {
  return (
    <>
      <h1 className="mt-5 ms-5"> Shopping Cart </h1>
      <div className="d-flex justify-content-evenly align-items-center my-5 shadow shadow-lg rounded mx-5 py-5">
        <div className="w-75">
          <div className="d-flex justify-content-between mb-4">
            <img
              className="rounded"
              src="https://dummyimage.com/200x200.png/ff4444/ffffff"
              alt="Pizza"
            />
            <div className="d-flex flex-column text-start justify-content-center ms-4 w-25">
              <h3>Italy Pizza</h3>
              <h5>Extra Cheese and Topping</h5>
            </div>
            <div className="d-flex align-items-center mx-5">
              <RemoveCircleSharp sx={{ fontSize: "60px", cursor: "pointer" }} />
              <p className="mx-4 fs-3 pt-3">5</p>
              <AddCircleSharp sx={{ fontSize: "60px", cursor: "pointer" }} />
            </div>
            <div className="d-flex align-items-center pt-3 fs-3 mx-5">
              <p>500$</p>
            </div>
            <div className="d-flex align-items-center mx-5">
              <DeleteSharp
                sx={{
                  fontSize: "60px",
                  cursor: "pointer",
                  color: red[600],
                }}
              />
            </div>
          </div>

          {/* Repeat this block for each cart item */}
          <div className="d-flex justify-content-between mb-4">
            <img
              className="rounded"
              src="https://dummyimage.com/200x200.png/ff4444/ffffff"
              alt="Pizza"
            />
            <div className="d-flex flex-column text-start justify-content-center ms-4 w-25">
              <h3>Italy Pizza</h3>
              <h5>Extra Cheese and Topping</h5>
            </div>
            <div className="d-flex align-items-center mx-5">
              <RemoveCircleSharp sx={{ fontSize: "60px", cursor: "pointer" }} />
              <p className="mx-4 fs-3 pt-3">5</p>
              <AddCircleSharp sx={{ fontSize: "60px", cursor: "pointer" }} />
            </div>
            <div className="d-flex align-items-center pt-3 fs-3 mx-5">
              <p>500$</p>
            </div>
            <div className="d-flex align-items-center mx-5">
              <DeleteSharp
                sx={{
                  fontSize: "60px",
                  cursor: "pointer",
                  color: red[600],
                }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <img
              className="rounded"
              src="https://dummyimage.com/200x200.png/ff4444/ffffff"
              alt="Pizza"
            />
            <div className="d-flex flex-column text-start justify-content-center ms-4 w-25">
              <h3>Italy Pizza</h3>
              <h5>Extra Cheese and Topping</h5>
            </div>
            <div className="d-flex align-items-center mx-5">
              <RemoveCircleSharp sx={{ fontSize: "60px", cursor: "pointer" }} />
              <p className="mx-4 fs-3 pt-3">5</p>
              <AddCircleSharp sx={{ fontSize: "60px", cursor: "pointer" }} />
            </div>
            <div className="d-flex align-items-center pt-3 fs-3 mx-5">
              <p>500$</p>
            </div>
            <div className="d-flex align-items-center mx-5">
              <DeleteSharp
                sx={{
                  fontSize: "60px",
                  cursor: "pointer",
                  color: red[600],
                }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <img
              className="rounded"
              src="https://dummyimage.com/200x200.png/ff4444/ffffff"
              alt="Pizza"
            />
            <div className="d-flex flex-column text-start justify-content-center ms-4 w-25">
              <h3>Italy Pizza</h3>
              <h5>Extra Cheese and Topping</h5>
            </div>
            <div className="d-flex align-items-center mx-5">
              <RemoveCircleSharp sx={{ fontSize: "60px", cursor: "pointer" }} />
              <p className="mx-4 fs-3 pt-3">5</p>
              <AddCircleSharp sx={{ fontSize: "60px", cursor: "pointer" }} />
            </div>
            <div className="d-flex align-items-center pt-3 fs-3 mx-5">
              <p>500$</p>
            </div>
            <div className="d-flex align-items-center mx-5">
              <DeleteSharp
                sx={{
                  fontSize: "60px",
                  cursor: "pointer",
                  color: red[600],
                }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <img
              className="rounded"
              src="https://dummyimage.com/200x200.png/ff4444/ffffff"
              alt="Pizza"
            />
            <div className="d-flex flex-column text-start justify-content-center ms-4 w-25">
              <h3>Italy Pizza</h3>
              <h5>Extra Cheese and Topping</h5>
            </div>
            <div className="d-flex align-items-center mx-5">
              <RemoveCircleSharp sx={{ fontSize: "60px", cursor: "pointer" }} />
              <p className="mx-4 fs-3 pt-3">5</p>
              <AddCircleSharp sx={{ fontSize: "60px", cursor: "pointer" }} />
            </div>
            <div className="d-flex align-items-center pt-3 fs-3 mx-5">
              <p>500$</p>
            </div>
            <div className="d-flex align-items-center mx-5">
              <DeleteSharp
                sx={{
                  fontSize: "60px",
                  cursor: "pointer",
                  color: red[600],
                }}
              />
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-around mt-5">
            <button className="btn bg-light btn-lg fs-2 px-5 border border-1 border-dark text-dark">
              Total Cost: $2000
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
