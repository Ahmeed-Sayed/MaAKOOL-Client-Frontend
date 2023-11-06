import "../../Profile/components/ProfileInfo/profile.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const Edit = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      mobile: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name Must be 20 characters or less or 2 characters or more")
        .min(2, "Name Must be 20 characters or less or 2 characters or more")
        .required("Required")
        .matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, "name must alphabetic only"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Please enter a valid email"
        )
        .required("Required"),
      phone: Yup.string()
        .matches(
          /^(010|011|012|015)\d{8}$/,
          "Phone number must start with 010, 011, 012, or 015 and be 11 digits long"
        )
        .required("Required"),
      mobile: Yup.string()
        .matches(
          /^(010|011|012|015)\d{8}$/,
          "Phone number must start with 010, 011, 012, or 015 and be 11 digits long"
        )
        .required("Required"),

      address: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <section style={{ backgroundColor: "#eee" }} className="profileSection">
        <div className="container py-5 fs-5">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <a href="#">User Profile</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Profile Edit
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
                  <h5 className="my-3">John Smith</h5>
                  <p className="text-muted mb-1">emailExample@gmail.com</p>
                  <div className="d-flex justify-content-center mb-2">
                    <input
                      type="file"
                      className="btn mt-3 form-control bg-primary text-light"
                      name="image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row d-flex align-items-baseline">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <input
                        placeholder="Johnatan Smith"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control fs-5"
                        name="name"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <p className="alert alert-danger mt-2 py-1">
                          {formik.errors.name}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <hr />
                  <div className="row d-flex align-items-baseline">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <input
                        placeholder="example@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control fs-5"
                        name="email"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <p className="alert alert-danger mt-2 py-1">
                          {formik.errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <hr />
                  <div className="row d-flex align-items-baseline">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <input
                        placeholder="Valid phone starts with 010, 011, 012, or 015"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control fs-5"
                        name="phone"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <p className="alert alert-danger mt-2 py-1">
                          {formik.errors.phone}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <hr />
                  <div className="row d-flex align-items-baseline">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <input
                        placeholder="(098) 765-4321"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control fs-5"
                        name="mobile"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.mobile && formik.errors.mobile ? (
                        <p className="alert alert-danger mt-2 py-1">
                          {formik.errors.mobile}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <hr />
                  <div className="row d-flex align-items-baseline">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <input
                        placeholder="Bay Area, San Francisco, CA"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control fs-5"
                        name="address"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <p className="alert alert-danger mt-2 py-1">
                          {formik.errors.address}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 me-2 fs-5"
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default Edit;
