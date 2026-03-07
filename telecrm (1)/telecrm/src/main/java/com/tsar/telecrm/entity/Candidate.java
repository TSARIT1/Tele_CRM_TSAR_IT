package com.tsar.telecrm.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "candidates")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "mobile_number", nullable = false, length = 20)
    private String mobileNumber;

    @Column(nullable = false)
    private String status = "Not Connected";

    // FK column (employee_id from users table)
    @Column(name = "assigned_to", nullable = false, length = 50)
    private String assignedTo;

    // Relation (read-only mapping to User)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "assigned_to",
            referencedColumnName = "employee_id",
            insertable = false,
            updatable = false
    )
    @JsonIgnoreProperties({"password", "email", "phoneNumber", "dateJoined"})
    private User assignedUser;

    // ===== Getters & Setters =====

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public String getStatus() {
        return status;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public User getAssignedUser() {
        return assignedUser;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public void setAssignedUser(User assignedUser) {
        this.assignedUser = assignedUser;
    }
}