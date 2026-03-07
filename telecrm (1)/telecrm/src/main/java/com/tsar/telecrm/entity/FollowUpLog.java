//package com.tsar.telecrm.entity;
//
//import jakarta.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "followup_logs")
//public class FollowUpLog {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "serial_no")
//    private Integer serialNo;
//
//    @Column(name = "candidate_name")
//    private String candidateName;
//
//    @Column(name = "mobile_number")
//    private String mobileNumber;
//
//    @Column(name = "schedule")
//    private String schedule;   // or LocalDateTime if you want
//
//    @Column(name = "follow_up_time")
//    private String followUpTime;
//
//    private String status;
//
//    @Column(name = "user_name")
//    private String userName;
//
//    @Column(name = "assigned_to_last_name")
//    private String assignedToLastName;
//
//    @Column(name = "assigned_to_email")
//    private String assignedToEmail;
//
//    // ===== Getters & Setters =====
//
//    public Long getId() { return id; }
//    public void setId(Long id) { this.id = id; }
//
//    public Integer getSerialNo() { return serialNo; }
//    public void setSerialNo(Integer serialNo) { this.serialNo = serialNo; }
//
//    public String getCandidateName() { return candidateName; }
//    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }
//
//    public String getMobileNumber() { return mobileNumber; }
//    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
//
//    public String getSchedule() { return schedule; }
//    public void setSchedule(String schedule) { this.schedule = schedule; }
//
//    public String getFollowUpTime() { return followUpTime; }
//    public void setFollowUpTime(String followUpTime) { this.followUpTime = followUpTime; }
//
//    public String getStatus() { return status; }
//    public void setStatus(String status) { this.status = status; }
//
//    public String getUserName() { return userName; }
//    public void setUserName(String userName) { this.userName = userName; }
//
//    public String getAssignedToLastName() { return assignedToLastName; }
//    public void setAssignedToLastName(String assignedToLastName) { this.assignedToLastName = assignedToLastName; }
//
//    public String getAssignedToEmail() { return assignedToEmail; }
//    public void setAssignedToEmail(String assignedToEmail) { this.assignedToEmail = assignedToEmail; }
//}