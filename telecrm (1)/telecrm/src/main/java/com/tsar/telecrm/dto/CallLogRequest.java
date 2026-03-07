package com.tsar.telecrm.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CallLogRequest {

    private Long candidateId;
    private String notes;
    private String callResult;          // 🔥 ADD THIS
    private String status;
    private Boolean followUpRequired;
    private LocalDate followUpDate;
    private String followUpTime;
    private String followUpComments;
    private LocalDateTime contactTime;
//    private String userName;
    private String userId;// If using name
    // OR use private String userId; if using employee_id

    // ===== GETTERS =====

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public String getNotes() {
        return notes;
    }

    public String getCallResult() {
        return callResult;
    }

    public String getStatus() {
        return status;
    }

    public Boolean getFollowUpRequired() {
        return followUpRequired;
    }

    public LocalDate getFollowUpDate() {
        return followUpDate;
    }

    public String getFollowUpTime() {
        return followUpTime;
    }

    public String getFollowUpComments() {
        return followUpComments;
    }

    public LocalDateTime getContactTime() {
        return contactTime;
    }

//    public String getUserName() {
//        return userName;
//    }

    // ===== SETTERS =====

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setCallResult(String callResult) {
        this.callResult = callResult;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setFollowUpRequired(Boolean followUpRequired) {
        this.followUpRequired = followUpRequired;
    }

    public void setFollowUpDate(LocalDate followUpDate) {
        this.followUpDate = followUpDate;
    }

    public void setFollowUpTime(String followUpTime) {
        this.followUpTime = followUpTime;
    }

    public void setFollowUpComments(String followUpComments) {
        this.followUpComments = followUpComments;
    }

    public void setContactTime(LocalDateTime contactTime) {
        this.contactTime = contactTime;
    }

//    public void setUserName(String userName) {
//        this.userName = userName;
//    }

//    public Object getUserId() {
//    }
}