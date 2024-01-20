import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../Components/Config/Config";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setShowPassword } from "./Reducer/UserReducer";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import LoadingPage from "./LoadingPage";

function Register() {
  const { showPassword, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Name is required.";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        const response = await axios.post(`${config.userApi}/register`, values);
        if (response.status === 201) {
          toast.success(response.data.message, {
            position: "top-center",
          });
        } 
        navigate("/");
        formik.resetForm();
      } catch (error) {
        console.error("Error during registration:", error);
        if (error.response) {
          // The request was made, but the server responded with an error status
          console.error("Server responded with an error:", error.response.data);
           // Display the server error message in the toast
    const errorMessage =
    error.response.data.message || "An error occurred on the server.";
  toast.error(`Server error: ${errorMessage}`, {
    position: "top-center",
  });
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("No response received from the server");
          return toast.error(
            "No response received from the server. Please try again.",
            {
              position: "top-center",
            }
          );
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error setting up the request:", error.message);
          return toast.error(
            "Error setting up the request. Please try again.",
            {
              position: "top-center",
            }
          );
        }
      } finally {
        dispatch(setLoading(false));
      }
    },
  });
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-6 p-4 border rounded shadow">
          <h2 className="text-center">Sing up </h2>
          <div className="d-flex flex-column">
            <p className="text-center text-black my-2">Create a new acccount</p>
          </div>
          <form action="" className="user" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name :
              </label>
              <input
                type="name"
                name="name"
                className={`form-control form-control-user ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <span className="d-block ms-3 text-danger small invalid-feedback">
                {formik.errors.name}
              </span>
            )}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label ">
                Email address :{" "}
              </label>
              <input
                type="email"
                name="email"
                className={`form-control form-control-user ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Emai ✉️"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <span className="d-block ms-3 text-danger small invalid-feedback">
                {formik.errors.email}
              </span>
            )}
            {/*  */}
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password :
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className={`form-control form-control-user ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Password 🔑"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <div className="showPass">
                {showPassword ? (
                  <EyeSlashFill
                    className="showPassIcon"
                    onClick={() => {
                      dispatch(setShowPassword(!showPassword));
                    }}
                  />
                ) : (
                  <EyeFill
                    className="showPassIcon"
                    onClick={() => {
                      dispatch(setShowPassword(!showPassword));
                    }}
                  />
                )}
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <span className="d-block ms-3 text-danger small invalid-feedback">
                {formik.errors.password}
              </span>
            )}
            <button
              className="btn btn-dark btn-user btn-block d-flex justify-content-center"
              type="submit"
            >
              {loading ? <LoadingPage /> : " Register Account"}
            </button>
          </form>
          <div className="text-center mt-3 hover">
            <Link
              className="text-decoration-none text-dark"
              to={"/forgot-password"}
            >
              Forgot Password?
            </Link>
          </div>
          <p className="d-flex justify-content-center mt-2 text-white hover">
            <Link className="text-decoration-none text-dark" to={"/"}>
              Already have an account? Login!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
