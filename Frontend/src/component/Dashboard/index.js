import React from "react";
import useAuth from "../../utils/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const userInfo = JSON.parse(user);

  return (
    <div className="content">
      <div className="container-fluid mt-4">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">User Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <label className="font-weight-bold">First Name:</label>
                <p>{userInfo?.first_name}</p>
              </div>
              <div className="col-md-6">
                <label className="font-weight-bold">Last Name:</label>
                <p>{userInfo?.last_name}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="font-weight-bold">Email:</label>
                <p>{userInfo?.email}</p>
              </div>
              <div className="col-md-6">
                <label className="font-weight-bold">Phone:</label>
                <p>{userInfo?.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;