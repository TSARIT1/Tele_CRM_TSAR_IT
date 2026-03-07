import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css";
import api from "../api";
import Navbar from "../components/Navbar";

const AdminLogin = () => {

  const [formData, setFormData] = useState({
    email: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/admin/send-otp", {
        email: formData.email
      });

      setStep(2);

    } catch (err) {
      console.error(err);
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      if (!otp) {
        setError("Please enter OTP");
        setLoading(false);
        return;
      }

      await api.post("/admin/verify-otp", {
        email: formData.email,
        otp: otp
      });

      localStorage.setItem("adminToken", "logged-in");

      navigate("/admin/home");

    } catch (err) {
      console.error(err);
      setError("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-login-page">

        {/* LEFT SIDE */}
        <div className="admin-left">

          <img
            src="/Enter OTP-amico.png"
            alt="admin"
            className="admin-image"
          />

          <div className="admin-info">
            <h2>Admin Control Panel</h2>
            <p>Secure access to TeleCRM administration dashboard.</p>
          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="admin-right">

          <div className="admin-auth-card">

            <h2 className="admin-auth-title">Admin Login</h2>

            <div className="admin-step">
              Step {step} of 2
            </div>

            {error && (
              <div className="admin-auth-error">{error}</div>
            )}

            {/* STEP 1 EMAIL */}
            {step === 1 && (

              <form onSubmit={handleSendOtp} className="admin-auth-form">

                <div className="admin-form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="admin-auth-btn"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>

              </form>

            )}

            {/* STEP 2 OTP */}
            {step === 2 && (

              <form onSubmit={handleSubmit} className="admin-auth-form">

                <div className="admin-form-group">
                  <label>Enter OTP</label>

                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6 digit OTP"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="admin-auth-btn verify"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP & Login"}
                </button>

              </form>

            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default AdminLogin;