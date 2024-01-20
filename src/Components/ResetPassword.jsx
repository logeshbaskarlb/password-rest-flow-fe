import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../Components/Config/Config";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setShowPassword } from "../Components/Reducer/UserReducer";
import { toast } from "react-toastify";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import LoadingPage from "./LoadingPage";
import "./Login.css";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { showPassword, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.password) {
        errors.password = "Password is required";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      return errors;
    },
    onSubmit: async (values) => {
      // Submit logic
      try {
        dispatch(setLoading(true));
        const response = await axios.post(
          `${config.userApi}/reset-password/${params.token}`,
          values
        );
        console.log(response);
        navigate("/");
        toast.success("Your password was successfully changed");
        formik.resetForm();
      } catch (error) {
        console.error("Error during password reset:", error);
        formik.setErrors({ general: error });
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 p-4 border rounded shadow">
        <h2 className="text-center">Reset Password </h2>
        <div className="d-flex flex-column">
          <p className="text-center text-black my-2">Create a new password</p>
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          {formik.errors.general && (
            <section className="alert alert-danger" role="alert">
              {formik.errors.general.message}
            </section>
          )}
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
            required
          />{" "}
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
          <input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            className={`form-control form-control-user ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "is-invalid"
                : ""
            }`}
            placeholder="confirmPassword 🔑"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
          />{" "}
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
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="d-block ms-3 text-danger small invalid-feedback">
              {formik.errors.confirmPassword}
            </span>
          )}
          <div className=" text-center m-3"> 
          <button className="btn btn-dark btn-user btn-block text-center" type="submit">
            {loading ? <LoadingPage /> : "Submit"}
          </button>
          </div>
        </form>

        <p className="d-flex justify-content-center p-3 text-white">
          <Link className="text-decoration-none text-dark" to={"/"}>
            Already have an account? Login!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
