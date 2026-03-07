import React, { useState } from 'react';
import { FiUser, FiPhone, FiMail, FiCalendar, FiMapPin } from 'react-icons/fi';
import './AddNewRecord.css';
import api from '../../api';




const AddNewRecord = () => {
  const [name, setName] = useState('');
  const[phone,setPhone] = useState('');
  const[email,setEmail] = useState('');
  const[followUpDate, setFollowUpDate] = useState('');
  const [location,setLocation] = useState('');
  const [notes,setNotes] = useState('');

  const [saved,setSaved] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleSave = async () => {

  if (!name || !phone) {
    alert("Name and Phone are required");
    return;
  }

  setLoading(true);

  try {

    const token = localStorage.getItem("userToken");
    const employeeId = localStorage.getItem("employeeId");

    // STEP 1: create candidate
    const candidateRes = await api.post(
      "/candidates",
      {
        name: name,
        mobileNumber: phone,
        status: "Not Connected",
        assignedTo: employeeId
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const candidateId = candidateRes.data.id;

    // STEP 2: create call log
    await api.post(
      "/logs",
      {
        candidateId: candidateId,
        userId: employeeId,
        notes: notes,
        callResult: "new_call",
        status: "Not Connected",
        followUpRequired: !!followUpDate,
        followUpDate: followUpDate || null,
        followUpTime: null,
        followUpComments: location
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    alert("Customer saved successfully");

    setName("");
    setPhone("");
    setEmail("");
    setLocation("");
    setFollowUpDate("");
    setNotes("");

  } catch (err) {
    console.error("Save error:", err.response?.data || err.message);
    alert(err.response?.data || "Failed to save candidate");
  }

  setLoading(false);
};


  return (
    <div className="anr-container">
      <h2 className="anr-title">Add New Customer Record</h2>
      
      <div className="anr-form">
        <div className="anr-form-group">
          <label className="anr-label">
            <FiUser className="anr-icon" />
            Customer Name
          </label>
          <input type="text" className="anr-input" placeholder="Enter full name" value={name} onChange={(e) => {
            setName(e.target.value); setSaved(false);
          }}/>
        </div>

        <div className="anr-form-group">
          <label className="anr-label">
            <FiPhone className="anr-icon" />
            Phone Number
          </label>
          <input type="tel" className="anr-input" placeholder="Enter phone number" value={phone} onChange={(e) => {
            setPhone(e.target.value);
            setSaved(false);
          }}/>
        </div>

        <div className="anr-form-group">
          <label className="anr-label">
            <FiMail className="anr-icon" />
            Email Address
          </label>
          <input type="email" className="anr-input" placeholder="Enter email" value={email} onChange={(e)=>{
            setEmail(e.target.value);
            setSaved(false);
          }}/>
        </div>

        <div className="anr-form-group">
          <label className="anr-label">
            <FiCalendar className="anr-icon" />
            Follow-up Date
          </label>
          <input type="date" className="anr-input" value={followUpDate} onChange={(e)=>{
            setFollowUpDate(e.target.value);
            setSaved(false);
          }}/>
        </div>

        <div className="anr-form-group">
          <label className="anr-label">
            <FiMapPin className="anr-icon" />
            Location
          </label>
          <input type="text" className="anr-input" placeholder="Enter location" value={location} onChange={(e)=>{
            setLocation(e.target.value); setSaved(false);
          }}/>
        </div>

        <div className="anr-form-group">
          <label className="anr-label">Notes</label>
          <textarea className="anr-textarea" placeholder="Additional notes" value={notes} onChange={(e)=>{
            setNotes(e.target.value);
            setSaved(false);
          }}></textarea>
        </div>

        <button className="anr-submit-btn" onClick={handleSave} disabled={loading || saved}>{loading ? 'Saving...' : saved ? 'Record Saved' : 'Save Record'}</button>
      </div>
    </div>
  );
};

export default AddNewRecord;