import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeleCalling.css";
import api from "../api";

// const API_BASE = "http://localhost:8080/api";

const TeleCalling = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [callLogs, setCallLogs] = useState([]);
  const [notes, setNotes] = useState("");
  const [callStatus, setCallStatus] = useState("idle");
  const [duration, setDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= FETCH CANDIDATES ================= */
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/telecalling/candidates");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers", err);
    }
  };

  /* ================= SELECT CUSTOMER ================= */
  const handleCustomerSelect = async (customer) => {
    setSelectedCustomer(customer);
    setCallStatus("idle");
    setNotes("");
    setDuration(0);

    // Fetch call history
    try {
      const res = await api.get(
        `/logs/${customer.id}`
      );
      setCallLogs(res.data.reverse());
    } catch (err) {
      console.error("Error fetching logs", err);
    }
  };

  /* ================= CALL SIMULATION ================= */
  let timerRef = null;

  const initiateCall = () => {
    setCallStatus("in-progress");
    setDuration(0);

    timerRef = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const endCall = () => {
    setCallStatus("ended");
    clearInterval(timerRef);
  };

  /* ================= SAVE CALL LOG ================= */
//   const saveNotes = async () => {
//     if (!notes.trim()) return;

//     try {
//       const payload = {
//   candidate: {
//     id: selectedCustomer.id
//   },
//   notes: notes,
//   status: "Completed",
//   followUpRequired: false,
//   contactTime: new Date().toISOString(),
//   userName: localStorage.setItem("employeeName", response.data.firstName)
  
// };

//       await api.post("/logs", payload);

//       alert("Call log saved ✅");

//       // Refresh logs
//       const res = await api.get(
//         `/logs/${selectedCustomer.id}`
//       );
//       setCallLogs(res.data.reverse());

//       setNotes("");
//       setCallStatus("idle");
//       setDuration(0);
//     } catch (err) {
//       console.error("Error saving log", err);
//       alert("Failed to save log ❌");
//     }
//   };

const saveNotes = async () => {
  const payload = {
    candidate: {
      id: selectedCustomer.id
    },
    notes: notes,
    status: "Completed",
    followUpRequired: false,
    contactTime: new Date().toISOString(),
    userName: localStorage.getItem("employeeName")
  };

  console.log("SENDING PAYLOAD:", payload);

  try {
    const res = await api.post("/telecalling/logs", payload);
    console.log("SUCCESS:", res.data);
  } catch (err) {
    console.log("FULL ERROR:", err.response?.data);
    console.log("STATUS:", err.response?.status);
  }
};

  /* ================= FILTER ================= */
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobileNumber.includes(searchTerm)
  );

  return (
    <div className="tc-container">
      <div className="tc-header">
        <h2 className="tc-title">Tele Calling CRM</h2>
        <input
          type="text"
          placeholder="Search..."
          className="tc-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="tc-layout">
        {/* LEFT: CUSTOMER LIST */}
        <div className="tc-customer-list">
          <h3>Customers</h3>
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className={`tc-customer-item ${
                selectedCustomer?.id === customer.id ? "active" : ""
              }`}
              onClick={() => handleCustomerSelect(customer)}
            >
              <div>{customer.name}</div>
              <div className="tc-mobile">{customer.mobileNumber}</div>
            </div>
          ))}
        </div>

        {/* CENTER: CALL SECTION */}
        <div className="tc-details">
          {selectedCustomer ? (
            <>
              <h3>{selectedCustomer.name}</h3>
              <p>{selectedCustomer.mobile}</p>

              <div className="tc-call-box">
                <div>Status: {callStatus}</div>
                {callStatus === "in-progress" && (
                  <div>Duration: {duration}s</div>
                )}

                {callStatus === "idle" && (
                  <button onClick={initiateCall}>
                    Call
                  </button>
                )}

                {callStatus === "in-progress" && (
                  <button onClick={endCall}>
                    End Call
                  </button>
                )}
              </div>

              <div className="tc-notes">
                <textarea
                  placeholder="Enter notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <button onClick={saveNotes}>
                  Save Call Log
                </button>
              </div>
            </>
          ) : (
            <div className="tc-select-msg">
              Select customer to start
            </div>
          )}
        </div>

        {/* RIGHT: CALL HISTORY */}
        <div className="tc-logs">
          <h3>Call History</h3>
          {callLogs.length === 0 ? (
            <p>No logs</p>
          ) : (
            callLogs.map((log) => (
              <div key={log.id} className="tc-log-item">
                <div>{log.notes}</div>
                <div>{log.duration}s</div>
                <div>{log.status}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TeleCalling;