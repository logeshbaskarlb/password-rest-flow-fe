import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setShowPassword } from "./Reducer/UserReducer";
import LoadingPage from "./LoadingPage";
import { toast } from "react-toastify";
import { isAuthenticated , login } from "./Protect/AuthService";

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
      try {
        dispatch(setLoading(true));
        await login(values);
        navigate("/dashboard");
        toast.success('You are login in successfully')
      } catch (error) {
        formik.setErrors({ general: error.message });
        toast.error('Something went wrong')
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  React.useEffect(()=>{
    if(isAuthenticated()){
      navigate("/dashboard")
    }
  },[navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 kvnkjabvav">
      <div className="col-md-6 p-4 border rounded shadow">
        <h2 className="mt-3 text-center"> Welcome </h2>
        <div className="d-flex flex-column w-full h-full">
          <p className="text-center text-black my-2">Login to your account</p>
        </div>
        <form action="" className="user" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address :
            </label>
            <input
              className={`form-control form-control-user text-black ${
                formik.touched.email && formik.errors.email ? "is-valid" : ""
              }`}
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <span className="d-block ms-3 text-danger small invalid-feedback">
              {formik.errors.email}
            </span>
          )}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password :{" "}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control form-contol-user ${
                formik.touched.password && formik.errors.password
                  ? "is-valid"
                  : ""
              }`}
              name="password"
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
          <div className="text-center">
            <button
              className="btn text-white text-center bg-black btn-user"
              type="submit"
            >
              {loading ? <LoadingPage /> : "Login"}
            </button>
          </div>
        </form>
        <div className="text-center mt-3 hover">
          <Link
            className="text-decoration-none text-dark "
            to={"/forgot-password"}
          >
            Forgot Password?
          </Link>
          <div className="d-flex justify-content-center mt-2 text-white hover">
            <Link className="text-decoration-none text-dark" to={"/register"}>
              Create an Account!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
