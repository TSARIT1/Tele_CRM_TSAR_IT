import React, { useState, useEffect } from "react";
import api from "../api";
import "./FollowUpComponent.css";

const FollowUpComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await api.get("/logs");
      
      // Only follow-ups
      const followUps = response.data.filter(
        (log) => log.followUpRequired === true
      );

      setData(followUps);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData = data.filter((item) =>
    item.candidate?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fp-container">
      <div className="fp-controls">
        <input
          type="text"
          placeholder="Search by name..."
          className="fp-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="fp-data-table">
        <thead>
          <tr>
            <th>SR</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Follow Up Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Assigned User</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.candidate?.name}</td>
              <td>{item.candidate?.mobileNumber}</td>
              <td>{item.followUpDate}</td>
              <td>{item.followUpTime}</td>
              <td>{item.status}</td>
              {/* <td>{item.userName}</td> */}
              {/* <td>{item.candidate?.assignedUser?.firstName}</td> */}
              <td>{item.candidate?.assignedTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FollowUpComponent;
















// import React, { useState, useEffect } from 'react';
// import api from '../api';
// import './Follow.css';

// const FollowUpComponent = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [dateFilter, setDateFilter] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/logs');
//         setData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load follow-ups');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ Filter and search logic (fixed field names)
//   const filteredData = data.filter(item => {
//     const name = item.candidateName || '';
//     const mobile = item.mobileNumber || '';
//     const status = item.status || '';
//     const schedule = item.followUpTime || item.schedule || '';

//     const matchesSearch =
//       name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       mobile.includes(searchTerm);

//     const matchesStatus = statusFilter === 'all' || status === statusFilter;
//     const matchesDate = !dateFilter || schedule.includes(dateFilter);

//     return matchesSearch && matchesStatus && matchesDate;
//   });

//   const handleRowClick = (item) => {
//     setSelectedRow(item);
//   };

//   const handleBackClick = () => {
//     setSelectedRow(null);
//   };

//   if (loading) return <div className="fp-loading">Loading...</div>;
//   if (error) return <div className="fp-error">{error}</div>;

//   return (
//     <div className="fp-container">
//       {!selectedRow ? (
//         <>
//           <div className="fp-controls">
//             <div className="fp-search-filter">
//               <input
//                 type="text"
//                 placeholder="Search by name or mobile"
//                 className="fp-search-input"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />

//               <select
//                 className="fp-status-filter"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="all">All Statuses</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Confirmed">Confirmed</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>

//               <input
//                 type="date"
//                 className="fp-date-filter"
//                 value={dateFilter}
//                 onChange={(e) => setDateFilter(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="fp-table-responsive">
//             <table className="fp-data-table">
//               <thead>
//                 <tr>
//                   <th className="fp-th">Serial No</th>
//                   <th className="fp-th">Name</th>
//                   <th className="fp-th">Mobile</th>
//                   <th className="fp-th">Schedule</th>
//                   {/* <th className="fp-th">Status</th> */}
//                   <th className="fp-th">Assigned To</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.length > 0 ? (
//                   filteredData.map((item, index) => (
//                     <tr
//                       key={item.id}
//                       className="fp-tr"
//                       onClick={() => handleRowClick(item)}
//                     >
//                       {/* ✅ SR No */}
//                       <td className="fp-td">{index + 1}</td>

//                       {/* ✅ Correct field names */}
//                       <td className="fp-td">{item.candidateName}</td>
//                       <td className="fp-td">{item.mobileNumber}</td>
//                       <td className="fp-td">{item.followUpTime || item.schedule}</td>
//                       {/* <td className="fp-td fp-status">{item.status}</td> */}
//                       <td className="fp-td">
//                         {item.userName} {item.assignedToLastName}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr className="fp-tr">
//                     <td className="fp-td fp-no-data" colSpan="6">
//                       No records found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </>
//       ) : (
//         <div className="fp-detail-view">
//           <button className="fp-back-button" onClick={handleBackClick}>
//             &larr; Back to List
//           </button>

//           <div className="fp-detail-card">
//             <h2 className="fp-detail-title">{selectedRow.candidateName}</h2>

//             <div className="fp-detail-grid">
//               <div className="fp-detail-item">
//                 <span className="fp-detail-label">Mobile:</span>
//                 <span className="fp-detail-value">{selectedRow.mobileNumber}</span>
//               </div>

//               <div className="fp-detail-item">
//                 <span className="fp-detail-label">Schedule:</span>
//                 <span className="fp-detail-value">
//                   {selectedRow.followUpTime || selectedRow.schedule}
//                 </span>
//               </div>

//               {/* <div className="fp-detail-item">
//                 <span className="fp-detail-label">Status:</span>
//                 <span className={`fp-detail-value fp-status-${selectedRow.status?.toLowerCase()}`}>
//                   {selectedRow.status}
//                 </span>
//               </div> */}

//               <div className="fp-detail-item">
//                 <span className="fp-detail-label">Assigned To:</span>
//                 <span className="fp-detail-value">
//                   {selectedRow.userName} {selectedRow.assignedToLastName}
//                 </span>
//               </div>

//               <div className="fp-detail-item">
//                 <span className="fp-detail-label">Assigned Email:</span>
//                 <span className="fp-detail-value">{selectedRow.assignedToEmail}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FollowUpComponent;