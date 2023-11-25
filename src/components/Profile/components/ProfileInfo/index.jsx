import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "@mui/system";
import { Pagination } from "@mui/material";

const ProfileInfo = ({ user }) => {
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userOrders, setUserOrders] = useState({
    userOrders: [],
    total_pages: 1,
  });
  const [userInfo, setUserInfo] = useState({});
  const formattedDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  const itemTotalPrice = (item) => {
    return item.quantity * item.product.price;
  };
  const navigate = useNavigate();

  const getUserOrders = async () => {
    console.log(currentPage);
    try {
      const { data } = await axios.get(
        `http://localhost:8000/orders/userOrders/${localStorage.id}`,
        {
          params: {
            order: sortOrder,
            page: currentPage,
          },
          headers: {
            Authorization: `Bearer ${localStorage.access}`,
          },
        }
      );

      setUserOrders(data.userOrders);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/accounts/profile/${localStorage.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access}`,
          },
        }
      );
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!localStorage.id || !localStorage.access || !localStorage.refresh) {
      navigate("/signIn");
      return;
    }
    getUserInfo();
    getUserOrders();
  }, [currentPage]);

  useEffect(() => {
    if (sortOrder !== "") {
      getUserOrders();
    }
  }, [sortOrder, currentPage]);
  return (
    <>
      <section className="profileSection">
        <div className="container py-5 fs-5">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={
                      userInfo.image
                        ? `http://localhost:8000${userInfo.image}`
                        : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    }
                    alt="avatar"
                    className="rounded-circle "
                    height={150}
                    width={150}
                  />

                  <p className="text-muted mb-1">{userInfo.username}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn btn-primary bg-primary mt-3 fs-5"
                      onClick={() => navigate("/profile/edit")}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userInfo.username}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userInfo.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        <p className="text-muted mb-0">{userInfo.phone}</p>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        <p className="text-muted mb-0">{userInfo.address}</p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-body">
                <h4 className="mb-3">Order History</h4>
                <div className="mb-3">
                  {/* Sorting options */}
                  <div className="d-flex justify-content-end flex-column  ">
                    <select
                      id="sortOrder"
                      className="form-select border border-5 border-primary text-dark w-25"
                      value={sortOrder}
                      onChange={(e) => handleSortOrderChange(e.target.value)}
                    >
                      <option value="">Select Order</option>
                      <option value="asc">Date Ascending</option>
                      <option value="desc">Date Descending</option>
                    </select>
                  </div>
                </div>

                {userOrders && userOrders.length > 0 ? (
                  userOrders.map((order, index) => (
                    <div
                      key={index}
                      className="mb-4 shadow shadow-lg rounded p-4"
                    >
                      {/* Order Information */}
                      <div className="row mb-3  ">
                        <div className="col-sm-4">
                          <p className="mb-0">Creation Date</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="text-muted mb-0">
                            {formattedDate(order.creating_date)}
                          </p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-4">
                          <p className="mb-0">Total Price</p>
                        </div>
                        <div className="col-sm-8">
                          <p className=" mb-0 price">{order.total_price} EGP</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-4">
                          <p className="mb-0">Order Status</p>
                        </div>
                        <div className="col-sm-8">
                          <p className=" mb-3 price text-info">
                            {order.status}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <h5>Order Products</h5>
                        </div>

                        <div className="col-sm-12 shadow shadow-lg p-3 rounded mt-2">
                          <div className="mt-3 d-flex flex-row align-items-center justify-content-around">
                            <p className="product-name w-25 text-center">
                              <strong>Name</strong>
                            </p>
                            <p>
                              <strong>Image</strong>
                            </p>
                            <p className="quantity w-25 text-center">
                              <strong>Quantity</strong>
                            </p>
                            <p className="price w-25 text-center">
                              <strong>Price</strong>
                            </p>
                          </div>
                          <div className="">
                            {order.orderItems &&
                              order.orderItems.map((orderItem, i) => (
                                <div
                                  key={i}
                                  className="mt-3 d-flex flex-row align-items-center justify-content-around"
                                >
                                  <p className="product-name w-25 text-center">
                                    {orderItem.product.name}
                                  </p>
                                  <div>
                                    <img
                                      src={`http://127.0.0.1:8000${orderItem.product.image}`}
                                      width={100}
                                      height={50}
                                      className="rounded image"
                                      alt={orderItem.product.name}
                                    />
                                  </div>
                                  <p className="quantity w-25 text-center">
                                    {orderItem.quantity}
                                  </p>
                                  <p className="price w-25 text-center">
                                    {itemTotalPrice(orderItem)} EGP
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Your order history is empty.</p>
                )}

                {/* Pagination */}
                {userOrders && totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProfileInfo;
