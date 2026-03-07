import React, { useEffect, useState } from "react";
import { 
  FiUsers,
  FiUserPlus,
  FiPhone,
  FiBarChart2
} from "react-icons/fi";
import api from "../api";
import "./Home.css";

const Home = () => {

  const [employees, setEmployees] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const empRes = await api.get("/user");
      const candidateRes = await api.get("/candidates");
      const logRes = await api.get("/logs");

      setEmployees(empRes.data);
      setCandidates(candidateRes.data);
      setLogs(logRes.data);

    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalEmployees = employees.length;

  const recentlyJoined = employees.filter(emp => {
    const joinedDate = new Date(emp.dateJoined);
    const now = new Date();
    const diffDays = (now - joinedDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }).length;

  const candidatesContacted = logs.length;

  const recentLogs = logs.slice(-5).reverse();

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">Dashboard</h2>

      {/* Modern Cards */}
      <div className="dashboard-cards">

  <div className="dashboard-card employees">
    <div className="card-icon">
      <FiUsers />
    </div>
    <div className="card-content">
      <span>Total Employees</span>
      <h2>{totalEmployees}</h2>
    </div>
  </div>

  <div className="dashboard-card joined">
    <div className="card-icon">
      <FiUserPlus />
    </div>
    <div className="card-content">
      <span>Recently Joined</span>
      <h2>{recentlyJoined}</h2>
    </div>
  </div>

  <div className="dashboard-card calls">
    <div className="card-icon">
      <FiPhone />
    </div>
    <div className="card-content">
      <span>Candidates Contacted</span>
      <h2>{candidatesContacted}</h2>
    </div>
  </div>

  <div className="dashboard-card leads">
    <div className="card-icon">
      <FiBarChart2 />
    </div>
    <div className="card-content">
      <span>Total Candidates</span>
      <h2>{candidates.length}</h2>
    </div>
  </div>

</div>

      {/* Recent Activity */}
      <div className="recent-activity">

        <h3>Recent Activity</h3>

        <table className="activity-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Status</th>
              <th>Follow Up</th>
            </tr>
          </thead>

          <tbody>
            {recentLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.candidate?.name}</td>
                <td>{log.status}</td>
                <td>{log.followUpDate || "No follow-up"}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Home;