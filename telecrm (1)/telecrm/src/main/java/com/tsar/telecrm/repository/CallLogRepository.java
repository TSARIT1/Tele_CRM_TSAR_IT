package com.tsar.telecrm.repository;

import com.tsar.telecrm.entity.CallLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CallLogRepository extends JpaRepository<CallLog, Long> {
    List<CallLog> findByCandidate_Id(Long candidateId);
}