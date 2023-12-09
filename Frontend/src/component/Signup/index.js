import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "./style.css";
import Group from "../../assets/Group.png";
import { Col, Form } from "react-bootstrap";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import User from "../../assets/CustomIcon/User";
import Email from "../../assets/CustomIcon/Email";
import Lock from "../../assets/CustomIcon/Lock";
import { useForm } from "react-hook-form";
import { extractNumbers } from "../../utils/helpers";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../utils/useAuth";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const navigate = useNavigate();
  const auth = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      await auth.register({ ...data, phone: extractNumbers(phoneNumber) });
      navigate("/create-moment");
      toast.success("Registered Succssfully!!");
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
        <h1>Signup</h1>
        <Form
          className="d-flex justify-content-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Col lg={8} md={12}>
            <div className="d-flex justify-content-between form-main-section">
              <div className="mb-3 col-lg-6 p-2 submit-form-main">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  First Name
                </label>
                <div className="input-group-prepend d-flex">
                  <span className="input-group-text">
                    <User />
                  </span>
                  <input
                    {...register("first_name", {
                      required: "first name is required",
                    })}
                    type="text"
                    className={`form-control ${
                      errors.first_name ? "is-invalid" : ""
                    }`}
                    id="first_name"
                    placeholder="Robert"
                  />
                </div>
                {errors.first_name && (
                  <div className="invalid-feedback d-block">
                    {errors.first_name.message}
                  </div>
                )}
              </div>
              <div className="mb-3 col-lg-6 p-2 submit-form-main">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  last Name
                </label>
                <div className="input-group-prepend d-flex">
                  <span className="input-group-text">
                    <User />
                  </span>
                  <input
                    {...register("last_name", {
                      required: "last name is required",
                    })}
                    type="text"
                    className={`form-control ${
                      errors.last_name ? "is-invalid" : ""
                    }`}
                    id="last_name"
                    placeholder="Downey Jr."
                  />
                </div>
                {errors.last_name && (
                  <div className="invalid-feedback d-block">
                    {errors.last_name.message}
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between form-main-section">
              <div className="mb-3 p-2 col-lg-6 submit-form-main">
                <div className="input-group-prepend">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Phone Number
                  </label>
                  <PhoneInput
                    country={"us"} // default country
                    value={phoneNumber}
                    name="phone"
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                      placeholder: "9876543210",
                      className: "form-control",
                      ...register("phone", {
                        required: "Phone number is required",
                        onChange: (e) => setPhoneNumber(e?.target?.value),
                      }),
                    }}
                  />
                </div>
                {isSubmitted &&
                  (extractNumbers(phoneNumber)?.length < 12 ||
                    !extractNumbers(phoneNumber)) && (
                    <div className="invalid-feedback d-block">
                      Phone Number is required and please add valid phone number
                    </div>
                  )}
              </div>
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
            </div>
            <div className="d-flex justify-content-between form-main-section">
              <div className="mb-3 p-2 col-lg-6 submit-form-main">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  City
                </label>
                <div className="input-group-prepend d-flex">
                  <input
                    {...register("city", {
                      required: "city is required",
                      maxLength: {
                        value: 100,
                        message: "City cannot exceed 100 characters",
                      },
                    })}
                    type="text"
                    className={`form-control ${
                      errors.city ? "is-invalid" : ""
                    }`}
                    id="city"
                    placeholder="Pune"
                  />
                </div>
                {errors.city && (
                  <div className="invalid-feedback d-block">
                    {errors.city.message}
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
                Already have an account? <Link to="/signin">Sign in here</Link>
              </p>
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
