import React, { useEffect, useState } from "react";
import api from "../api";
import "./UserStatus.css";
import { FiUsers, FiPhone, FiClock, FiUserCheck } from "react-icons/fi";

const UserStatus = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user");
      setUsers(res.data);
    } catch (error) {
      console.error("Error loading users", error);
    } finally {
      setLoading(false);
    }
  };

  const activeUsers = users.filter(u => u.status === "Active").length;
const inactiveUsers = users.filter(u => u.status === "Inactive").length;

  if (loading) {
    return <div className="userstatus-loading">Loading user status...</div>;
  }

  return (
    <div className="userstatus-container">

      <h2 className="userstatus-title">User Status Dashboard</h2>

      {/* STATUS CARDS */}

      <div className="status-cards">

        <div className="status-card online">
          <FiUserCheck />
          <div>
            <span>Active Users</span>
            <h2>{activeUsers}</h2>
          </div>
        </div>

        <div className="status-card call">
          <FiPhone />
          <div>
            <span>Inactive Users</span>
            <h2>{inactiveUsers}</h2>
          </div>
        </div>

        {/* <div className="status-card idle">
          <FiClock />
          <div>
            <span>Idle</span>
            <h2>{idleUsers}</h2>
          </div>
        </div> */}

        <div className="status-card total">
          <FiUsers />
          <div>
            <span>Total Users</span>
            <h2>{users.length}</h2>
          </div>
        </div>

      </div>


      {/* USER TABLE */}

      <div className="userstatus-table-wrapper">

        <h3>Employee Status</h3>

        <table className="userstatus-table">

          <thead>
            <tr>
              <th>Employee</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user,index) => (

              <tr key={index}>

                <td>{user.firstName} {user.lastName}</td>

                <td>{user.email}</td>

                <td>{user.phoneNumber}</td>

                <td>
                  <span className={`status-badge ${(user.status || "Inactive").toLowerCase()}`}>
                    {user.status || "Inactive"}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default UserStatus;