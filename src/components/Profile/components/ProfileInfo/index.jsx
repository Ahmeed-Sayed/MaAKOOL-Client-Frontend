import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfileInfo = () => {
  const [userOrders, setUserOrders] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();
  const getUserOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/orders/userOrders/${localStorage.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access}`, // Replace with your actual authentication token
          },
        }
      );
      console.log(data, "here");
      setUserOrders(data.userOrders);
      console.log(userOrders);
    } catch (error) {
      console.log(localStorage.access);
      console.log(localStorage.refresh);
      console.error("Error fetching user orders:", error);
      return null;
    }
  };
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/accounts/profile/${localStorage.id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access}`, // Replace with your actual authentication token
          },
        }
      );
      console.log(data);
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return null;
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserOrders();
  }, []);
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
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: 150 }}
                  />
                  <h5 className="my-3"></h5>
                  <p className="text-muted mb-1">{userInfo.username}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn btn-primary mt-3 fs-5"
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
                {userOrders && userOrders.length > 0 ? (
                  userOrders.map((order, index) => (
                    <div key={index}>
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="mb-0">Order Created Date</p>
                        </div>
                        <div className="col-sm-8  ">
                          <p className="text-muted mb-0">
                            {formattedDate(order.creating_date)}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="mb-0">Total Price</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="text-muted mb-0">
                            {order.total_price} EGP
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="mb-0">Products</p>
                        </div>
                        <div className="col-sm-8">
                          {order.orderItems &&
                            order.orderItems.map((orderItem, i) => (
                              <p key={i} className="text-muted mb-0">
                                {orderItem.product.name}
                              </p>
                            ))}
                        </div>
                      </div>
                      {index !== userOrders.length - 1 && <hr />}
                    </div>
                  ))
                ) : (
                  <p>Your order history is empty.</p>
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
