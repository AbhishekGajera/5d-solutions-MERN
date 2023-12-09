import React, { useState } from "react";
import "./style.css";
import Group from "../../assets/Group.png";
import { Col, Form } from "react-bootstrap";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import Email from "../../assets/CustomIcon/Email";
import Lock from "../../assets/CustomIcon/Lock";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../utils/useAuth";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      await auth.signin(data);
      navigate("/create-moment");
      toast.success("Loggedin Succssfully!!");
    } catch (error) {
      toast.error(
        error?.response?.data?.errors ||
          error?.response?.data?.message ||
          error?.message
      );
    }
  };

  return (
    <div className="signup-main">
      <div className="main-logo">
        <img src={Group} alt="Group" />
      </div>
      <div className="signup-inner align-center">
        <h1>Signin</h1>
        <Form
          className="d-flex justify-content-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Col lg={8} md={12}>
            <div className="d-flex justify-content-between form-main-section">
              <div className="mb-3 p-2 col-lg-6 submit-form-main">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email-ID
                </label>
                <div className="input-group-prepend d-flex">
                  <span className="input-group-text">
                    <Email />
                  </span>
                  <input
                    {...register("email", {
                      required: "email is required",
                    })}
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="rdj@gmail.com"
                  />
                </div>
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="mb-3 p-2 col-lg-6 submit-form-main">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Enter Password
                </label>
                <div className="input-group-prepend d-flex">
                  <span className="input-group-text">
                    <Lock />
                  </span>
                  <input
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                        message:
                          "Password must be at least 8 characters long and include both letters and numbers",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    placeholder="Password"
                  />
                  <span onClick={handleTogglePassword}>
                    {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                  </span>
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>

            <div className="submit-main">
              <button
                type="submit"
                className="btn btn-primary form-button submit-btn"
              >
                Submit
              </button>
            </div>

            <div className="mt-3">
              <p>
                Don't have an account? <Link to="/signup">Sign up here</Link>
              </p>
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
