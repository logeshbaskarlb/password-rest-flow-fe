import axios from "axios";
import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "./Reducer/UserReducer";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import { config } from "./Config/Config";
import "./Login.css"
function ForgetPassword() {
  
  const { loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
      dispatch(setLoading(true))
        const response = await axios.post(
          `${config.userApi}/forgot-password`, values);
        console.log(response)
        if (response.status === 200) {
          toast.success(response.data.message + "Kindly check your mail");
          navigate("/");
          formik.resetForm();
        }
      } catch (error) {
        const message = error.response.data.message;
        console.error("Error during registration:", message);
        formik.setErrors({ general: message }); // Use setErrors to display the error message
      } finally {
        dispatch(setLoading(false));
      }
    },
    
  });
  return (
    <div
      className="container  d-block justify-content-center"
      style={{
        width: "350px",
        height: "500px",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "5px 20px 50px #000",
      }}
    >
      <main className="d-flex justify-content-center">
        <form action="" onSubmit={formik.handleSubmit}>
          {
            formik.errors.general && (<section className="alert alert-danger" 
            role="alert">
            {formik.errors.general}
            </section>
         )}
          <label
            htmlFor="chk"
            aria-hidden="true"
            className="p-3 d-flex justify-content-center text-center"
            style={{
              color: "#fff",
              fontSize: "2.4em",
              justifyContent: "center",
              display: "flex",
              fontWeight: "bold",
              cursor: "pointer",
              transition: ".5s ease-in-out",
            }}
          >
            Forgot password
          </label>
          <div className="d-flex flex-column  w-full h-full">
            <p className="text-center text-white my-2">
              Here you can reset your password
            </p>
            <p className="text-center text-white my-2">
              Please enter your mail Id
            </p>
          </div>
          <input
            type="email"
            name="email"
            style={{
              width: "100%",
              height: "35px",
              background: "#e0dede",
              justifyContent: "center",
              display: "flex",
              margin: "5px auto",
              padding: "10px",
              border: "none",
              outline: "none",
              borderRadius: "5px",
            }}
            placeholder="Email"
            required=""
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.errors.email && 
          (<span className="d-block ms-3 text-danger small invalid-feedback">
            {formik.errors.email}
          </span>)}
          <button
            className="btn btn-primary btn-user btn-block mx-5 mt-3 d-flex justify-content-center"
            type="submit"
          >
            {loading ? <LoadingPage /> : "Reset Password"}
          </button>
        </form>
      </main>
      <hr />
      <div className="">
        <Link
          to="/"
          className="btn btn-primary m-2 d-flex justify-content-end btn-user btn-block"
        >
          Back To Login
        </Link>
      </div>
    </div>
  );
}

export default ForgetPassword;
