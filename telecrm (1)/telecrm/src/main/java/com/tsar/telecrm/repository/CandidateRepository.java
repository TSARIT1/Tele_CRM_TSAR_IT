package com.tsar.telecrm.repository;

import com.tsar.telecrm.entity.CallLog;
import com.tsar.telecrm.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByAssignedTo(String employeeId);

}







//package com.tsar.telecrm.repository;
//
//import com.tsar.telecrm.entity.Candidate;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;
//
//public interface CandidateRepository extends JpaRepository<Candidate, Long> {
//
//    List<Candidate> findByAssignedToEmployeeId(String employeeId);  // ✅ for employee dashboard
//
//    List<Candidate> findByAssignedTo(String employeeId);
//}