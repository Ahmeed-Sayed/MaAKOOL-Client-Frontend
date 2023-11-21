import axios from "axios";
import "./contactus.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
export default function ContactUs() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      feedback: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
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
      feedback: Yup.string()
        .required("Please enter a your feedback")
        .max(200, "Max length of feedback is 200 characters"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8000/api/accounts/contact_us/", values)
        .then((response) => {
          console.log("Form submission successful:", response.data);
          Swal.fire({
            icon: "success",
            title: "Thank you for your feedback.",
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => navigate("/"), 2500);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to send feedback, please try again later.",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => navigate("/contactUs"), 2500);
        });
    },
  });
  return (
    <>
      <div className="bodyContainer">
        <div className="row gridBody  text-light ">
          <div className="col-4 leftGrid text-center d-flex flex-column justify-content-center">
            <p className="text-danger fw-bold ">Contact Us</p>
            <p className="text-dark fw-bold ">
              Have a problem? feel free to tell us about it.
            </p>
          </div>
          <div className="col-8 rightGrid shadow shadow-lg rounded pt-5">
            <form
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column "
            >
              <div className="row d-flex align-items-baseline text-dark py-4">
                <div className="col-3 text-center">
                  <h5>Name</h5>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control py-2 fs-5"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="name"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="alert alert-danger mt-2 py-1">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex align-items-baseline text-dark py-4">
                <div className="col-3 text-center">
                  <h5>Email</h5>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control py-2 fs-5"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="alert alert-danger mt-2 py-1">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex align-items-baseline text-dark py-4">
                <div className="col-3 text-center">
                  <h5>Phone</h5>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control py-2 fs-5"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="phone"
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <p className="alert alert-danger mt-2 py-1">
                      {formik.errors.phone}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex align-items-baseline text-dark py-4">
                <div className="col-3 text-center">
                  <h5>How can we help?</h5>
                </div>
                <div className="col-9 ">
                  <textarea
                    type="text"
                    className="form-control py-2 fs-5"
                    value={formik.values.feedback}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="feedback"
                    rows={4}
                  />
                  {formik.touched.feedback && formik.errors.feedback ? (
                    <p className="alert alert-danger mt-2 py-1">
                      {formik.errors.feedback}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-end pe-3 mb-3">
                <button
                  className="btn btn-lg btn-danger px-4 py-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
