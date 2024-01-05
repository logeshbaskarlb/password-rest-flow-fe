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
  const { showPassword ,loading } = useSelector((state) => state.users);
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
        const response = await axios.post(
        `${config.userApi}/register`, values);
        if (response.status === 201) {
          toast.success(response.data.message, {
            position: "top-center",
          });
        }
        navigate("/");
        formik.resetForm();
      } catch (error) {
        console.error(
          "Error during registration:",//response.data.message
        );
        toast.error("Error during registration. Please try again.", {
          position: "top-center",
        });
      } finally {
        dispatch(setLoading(false));
      }
    },
  });
  return (
    <>
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
              Sign Up
            </label>
            <div className="d-flex flex-column">
              <p className="text-center text-white my-2">
                Create a new acccount
              </p>
            </div>
            <input
              type="name"
              name="name"
              style={{
                width: "60%",
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
              placeholder="Name"
              required=""
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name ? (
              <span className="d-block mx-5 my-2 text-start text-danger small invalid-feedback">
                {formik.errors.name}
              </span>
            ) : null}
            <input
              type="email"
              name="email"
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
              placeholder="Emai ✉️"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              required
            />
            {formik.errors.email ? (
              <span className="d-block mx-5 my-2 text-start text-danger small invalid-feedback">
                {formik.errors.email}
              </span>
            ) : null}
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
            {formik.errors.password ? (
              <span className="d-block mx-5 my-2 text-start text-danger small invalid-feedback">
                {formik.errors.password}
              </span>
            ) : null}
            <button className="btn btn-dark btn-user btn-block" type="submit">
            {
                    loading ? <LoadingPage /> : ' Register Account'
                   }
            </button>
          </form>
          <div className="text-center mt-3 hover">
            <Link className="a " to={"/forgot-password"}>
              Forgot Password?
            </Link>
          </div>
          <p className="d-flex justify-content-center mt-2 text-white hover">
            <Link className="a" to={"/"}>
              Already have an account? Login!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
