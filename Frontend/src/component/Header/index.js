import React, { useState } from "react";
import "./style.css";
import user from "../../assets/user.jpg";
import { Image, Dropdown, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../utils/useAuth";
import HumBurger from "../../assets/CustomIcon/HumBurger";

const Header = ({ openSidebar, setOpenSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onClickHandler = (redirect) => {
    navigate(redirect);
  };

  return (
    <div className="container-fluid">
      <div className="navbarStyle">
        <div className="row navbarStyle-main">
          <Col className="search-input  col-lg-4 col-md-6 col-sm-6">
            <div
              className="close-icon pointer"
              onClick={() => {
                setOpenSidebar(!openSidebar);
              }}
            >
              <HumBurger />
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-end col-lg-8 col-md-6 col-sm-6">
            <div className="notification me-4"></div>
            <div className="myprofile">
              <Dropdown show={showDropdown} onToggle={toggleDropdown}>
                <Dropdown.Toggle id="user-dropdown">
                  <Image
                    src={user}
                    roundedCircle
                    style={{ width: "40px", height: "40px" }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={() => onClickHandler("/")}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Header;
