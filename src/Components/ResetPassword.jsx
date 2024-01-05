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
import "./Login.css"


const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { showPassword ,loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = [];

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
    <div className="main kvnkjabvav">
        <div
          className="login justify-content-center text-center"
          style={{
            width: "350px",
            height: "500px",
            overflow: "hidden",
            borderRadius: "10px",
            boxShadow: "5px 20px 50px #000",
          }}
        >
          <form action="" onSubmit={formik.handleSubmit}>
            <label
              htmlFor="chk"
              aria-hidden="true"
              style={{
                color: "#fff",
                fontSize: "2.3em",
                justifyContent: "center",
                display: "flex",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              className="text-white d-flex"
            >
              Reset Password
            </label>
            <div className="d-flex flex-column">
              <p className="text-center text-white my-2">
                Create a new password
              </p>
            </div>
            <input
              name="password"
              style={{
                width: "60%",
                height: "35px",
                background: "#e0dede",
                justifyContent: "center",
                display: "flex",
                margin: "20px auto",
                padding: "10px",
                border: "none",
                outline: "none",
                borderRadius: "5px",
              }}
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
            <input
              name="confirmPassword"
              style={{
                width: "60%",
                height: "35px",
                background: "#e0dede",
                justifyContent: "center",
                display: "flex",
                margin: "20px auto",
                padding: "10px",
                border: "none",
                outline: "none",
                borderRadius: "5px",
              }}
              placeholder="confirmPassword 🔑"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
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
            {formik.errors.password ? (
              <span className="d-block mx-5 my-2 text-start text-danger small invalid-feedback">
                {formik.errors.password}
              </span>
            ) : null}
            <button className="btn btn-dark btn-user btn-block" type="submit">
            {
                  loading ? <LoadingPage /> : 'Submit'
                   }
            </button>
          </form>
          
          <p className="d-flex justify-content-center text-white">
            <Link className="small a hover" to={"/"}>
              Already have an account? Login!
            </Link>
          </p>
        </div>
      </div>
  );
};

export default ResetPassword;
