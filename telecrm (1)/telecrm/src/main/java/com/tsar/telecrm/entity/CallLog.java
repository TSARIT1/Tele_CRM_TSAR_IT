package com.tsar.telecrm.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "call_logs")
public class CallLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private Candidate candidate;

    private String notes;

    @Column(name = "call_result")
    private String callResult;

    private String status;

    @Column(name = "follow_up_required")
    private Boolean followUpRequired;

    @Column(name = "follow_up_date")
    private LocalDate followUpDate;

    @Column(name = "follow_up_time")
    private String followUpTime;

    @Column(name = "follow_up_comments")
    private String followUpComments;

    @Column(name = "contact_time")
    private LocalDateTime contactTime;

    @Column(name = "user_id",nullable = false)
    private String userId;

    @PrePersist
    protected void onCreate() {
        contactTime = LocalDateTime.now();
    }

    // ===== Getters & Setters =====

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Candidate getCandidate() { return candidate; }
    public void setCandidate(Candidate candidate) { this.candidate = candidate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getCallResult() { return callResult; }
    public void setCallResult(String callResult) { this.callResult = callResult; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getFollowUpRequired() { return followUpRequired; }
    public void setFollowUpRequired(Boolean followUpRequired) { this.followUpRequired = followUpRequired; }

    public LocalDate getFollowUpDate() { return followUpDate; }
    public void setFollowUpDate(LocalDate followUpDate) { this.followUpDate = followUpDate; }

    public String getFollowUpTime() { return followUpTime; }
    public void setFollowUpTime(String followUpTime) { this.followUpTime = followUpTime; }

    public String getFollowUpComments() { return followUpComments; }
    public void setFollowUpComments(String followUpComments) { this.followUpComments = followUpComments; }

    public LocalDateTime getContactTime() { return contactTime; }
    public void setContactTime(LocalDateTime contactTime) { this.contactTime = contactTime; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}