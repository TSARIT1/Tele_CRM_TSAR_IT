package com.tsar.telecrm.repository;

import com.tsar.telecrm.entity.CustomerRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRecordRepository extends JpaRepository<CustomerRecord, Long> {
}
