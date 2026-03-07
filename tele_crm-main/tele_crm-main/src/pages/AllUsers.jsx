import React, { useState, useEffect } from 'react';
import { FiEdit, FiSave, FiX, FiSearch, FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import './AllUsers.css';
import api from '../api';

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [statusValue, setStatusValue] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const recordsPerPage = 10;

  // Fetch users
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/user');
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update status
  const handleStatusUpdate = async (employeeId) => {
    try {
      await api.put(`/user/${employeeId}/status`, { status: statusValue });

      setData(prev =>
        prev.map(u =>
          u.employeeId === employeeId ? { ...u, status: statusValue } : u
        )
      );

      setEditingId(null);
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      setError('Failed to update status');
    }
  };

  // Filter
  const filteredData = data.filter(item =>
    item.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.phoneNumber?.includes(searchTerm)
  );

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
    <div className="ds-home-container">
      {selectedUser ? (
        <div className="ds-user-details">
          <button className="ds-back-btn" onClick={() => setSelectedUser(null)}>
            <FiArrowLeft /> Back
          </button>

          <div className="ds-user-card">
            <h3>User Details</h3>

            <p><b>Employee ID:</b> {selectedUser.employeeId}</p>
            <p><b>Name:</b> {selectedUser.firstName} {selectedUser.lastName}</p>
            <p><b>Mobile:</b> {selectedUser.phoneNumber}</p>
            <p><b>Date Joined:</b> {new Date(selectedUser.dateJoined).toLocaleDateString()}</p>

            <select value={statusValue} onChange={e => setStatusValue(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="In Progress">In Progress</option>
            </select>

            <button onClick={() => handleStatusUpdate(selectedUser.employeeId)}>
              <FiSave /> Update Status
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="ds-home-header">
            <h2>Employee Records</h2>
            <input
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="ds-records-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Date Joined</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, index) => (
                  <tr key={item.employeeId}>
                    <td>{indexOfFirstRecord + index + 1}</td>
                    <td>{new Date(item.dateJoined).toLocaleDateString()}</td>
                    <td>{item.employeeId}</td>
                    <td>{item.firstName} {item.lastName}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.status}</td>
                    <td>
                      <button onClick={() => {
                        setSelectedUser(item);
                        setStatusValue(item.status);
                      }}>
                        <FiEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filteredData.length > recordsPerPage && (
            <div className="ds-pagination">
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllUsers;