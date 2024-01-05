import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
// import { isAuthenticated } from "./Protect/AuthService";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import "../App.css";
import { setLoading, setShowPassword } from "./Reducer/UserReducer";
// import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import axios from "axios";
import { config } from "./Config/Config";
// import axios from "axios";
// import { config } from "./Config/Config";


function Login() {
  const { showPassword, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log("Even")
      try {
        dispatch(setLoading(true));
        const response = await axios.post
        (`${config.userApi}/login`,values)
        console.log(response);
        if(response.status === 200){
          localStorage.setItem("token",response.data.token);
          navigate("/dashboard");
          console.log("LOGIN")
        }else{
          console.log("Not")
        }
       console.error()
        // await login(values);
      } catch (error) {
        formik.setErrors({ general: error.message });
      } finally {
        dispatch(setLoading(false));
      }
    },
  });
 
  return (
  <div className="container kvnkjabvav" 
  >
    <div
      className="main"
    >
      <input type="checkbox" id="chk" aria-hidden="false" />
      <div className="signup m-0">
        <form action="" onSubmit={formik.handleSubmit}>
        {
              formik.errors.general && (
                <section className="alert alert-danger" role="alert">
                  {formik.errors.general.message}
                </section>
              )
            }
          <label
            htmlFor="chk"
            aria-hidden="true"
            className="d-flex justify-content-center text-center my-3 mb-1 text-white"
          >
            <h2 className="mt-3"> Welcome </h2>
            
          </label>
          <div className="d-flex flex-column  w-full h-full">
            <p className="text-center text-white my-2">
              Login to your account
            </p>
          </div>
          <input
            className={`form-control form-control-user text-black ${
              formik.touched.email && formik.errors.email
                ? "is-valid"
                : ""
            }`}
            type="email"
            name="email"
            style={{
              width: "60%",
              height: "25px",
              background: "#e0dede",
              justifyContent: "center",
              display: "flex",
              margin: "20px auto",
              padding: "10px",
              border: "none",
              outline: "none",
              borderRadius: "5px",
            }}
            placeholder="Email✉️"
            required=""
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.email && formik.errors.email && 
            (<span className="d-block ms-3 text-danger small invalid-feedback">
              {formik.errors.email}
            </span>)
          }
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control form-contol-user ${
              formik.touched.password && formik.errors.password
                ? "is-valid"
                : ""
            }`}
            name="password"
            style={{
              width: "60%",
              height: "25px",
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
            required=""
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
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
            <span className="d-block mx-5 text-start text-danger small invalid-feedback">
              {formik.errors.password}
            </span>
          ) : null}
          <button
            className="btn text-white btn-user"
            type="submit"
            style={{
              width: "60%",
              height: "40px",
              margin: "10px auto",
              justifyContent: "center",
              display: "block",
              color: "white",
              background: "#573b8a",
              fontSize: "1em",
              fontWeight: "bold",
              marginTop: "20px",
              outline: "none",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? <LoadingPage /> : "Login"}
          </button>
        </form>
        <div className="d-flex justify-content-end text-white p-3">
          <Link className="a hover" to={"/forgot-password"}>Forgot Password?</Link>
        </div>
        <div className="d-flex justify-content-center bg-dark rounded  mb-5 mx-3 text-white p-3">
          <Link className="a hover" to={"/register"}>Create an Account!</Link>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;
