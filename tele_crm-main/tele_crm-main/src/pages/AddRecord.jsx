import React, { useState, useEffect } from "react";
import "./AddRecord.css";
import api from "../api";

const AddRecord = () => {

  const [activeTab, setActiveTab] = useState("add");

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    dateJoined: "",
    dateEnding: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (activeTab === "view") {
      fetchRecords();
    }
  }, [activeTab]);

  const fetchRecords = async () => {
    try {
      const response = await api.get("/user");
      setRecords(response.data);
    } catch (error) {
      console.error("Fetch records error:", error);
    }
  };

  const updateStatus = async (employeeId, newStatus) => {
  try {

    await api.put(`/user/status/${employeeId}`, {
      status: newStatus
    });

    setRecords(prev =>
      prev.map(emp =>
        emp.employeeId === employeeId
          ? { ...emp, status: newStatus }
          : emp
      )
    );
    alert("Status Updated Successfully")

  } catch (error) {
    console.error("Status update failed", error);
    alert("Failed to update status");
  }
};
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.employeeId) newErrors.employeeId = "User ID is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.dateJoined) newErrors.dateJoined = "Joining date required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {

      await api.post("/user/employee/setup", formData);

      // show success
      setShowSuccess(true);

      // reset form
      setFormData({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        dateJoined: "",
        dateEnding: ""
      });

      // refresh records if on view tab
      if (activeTab === "view") {
        fetchRecords();
      }

      // hide success after 3 sec
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {

      console.error("Error submitting form:", error);
      alert("Error adding employee");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="nr-container">

      <div className="nr-tabs">

        <button
          className={`nr-tab ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          Add Record
        </button>

        <button
          className={`nr-tab ${activeTab === "view" ? "active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          View Records
        </button>

      </div>

      {activeTab === "add" ? (

        <>
          <h2 className="nr-title">Add New Employee</h2>

          {showSuccess && (
            <div className="nr-success-message">
              Employee added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="nr-form">

            <div className="nr-form-grid">

              <div className="nr-form-group">
                <label>User ID *</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className={`nr-input ${errors.employeeId ? "nr-input-error" : ""}`}
                />
                {errors.employeeId && <span className="nr-error">{errors.employeeId}</span>}
              </div>

              <div className="nr-form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`nr-input ${errors.password ? "nr-input-error" : ""}`}
                />
                {errors.password && <span className="nr-error">{errors.password}</span>}
              </div>

              <div className="nr-form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`nr-input ${errors.firstName ? "nr-input-error" : ""}`}
                />
                {errors.firstName && <span className="nr-error">{errors.firstName}</span>}
              </div>

              <div className="nr-form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`nr-input ${errors.lastName ? "nr-input-error" : ""}`}
                />
                {errors.lastName && <span className="nr-error">{errors.lastName}</span>}
              </div>

              <div className="nr-form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`nr-input ${errors.email ? "nr-input-error" : ""}`}
                />
                {errors.email && <span className="nr-error">{errors.email}</span>}
              </div>

              <div className="nr-form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`nr-input ${errors.phoneNumber ? "nr-input-error" : ""}`}
                />
                {errors.phoneNumber && <span className="nr-error">{errors.phoneNumber}</span>}
              </div>

              <div className="nr-form-group">
                <label>Date of Joining *</label>
                <input
                  type="date"
                  name="dateJoined"
                  value={formData.dateJoined}
                  onChange={handleChange}
                  className={`nr-input ${errors.dateJoined ? "nr-input-error" : ""}`}
                />
                {errors.dateJoined && <span className="nr-error">{errors.dateJoined}</span>}
              </div>

              <div className="nr-form-group">
                <label>Date of Ending</label>
                <input
                  type="date"
                  name="dateEnding"
                  value={formData.dateEnding}
                  onChange={handleChange}
                  className="nr-input"
                />
              </div>

            </div>

            <div className="nr-form-actions">

              <button
                type="submit"
                className="nr-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

            </div>

          </form>
        </>

      ) : (

        <div className="nr-table-container">

          <h2 className="nr-title">Employee Records</h2>

          <table className="nr-table">

            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Date Joined</th>
                <th>Date Ending</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {records.map((record) => (
                <tr key={record.employeeId}>
                  <td>{record.employeeId}</td>
                  <td>{record.firstName}</td>
                  <td>{record.lastName}</td>
                  <td>{record.email}</td>
                  <td>{record.phoneNumber}</td>
                  <td>{record.dateJoined}</td>
                  <td>{record.dateEnding || "-"}</td>
                  <td>
                    <select
                    value={record.status || "active"} 
                    onChange={(e) => updateStatus(record.employeeId, e.target.value)}
                    className="status-dropdown">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default AddRecord;