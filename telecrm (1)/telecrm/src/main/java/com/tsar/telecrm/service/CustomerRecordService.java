package com.tsar.telecrm.service;

import com.tsar.telecrm.entity.CustomerRecord;
import com.tsar.telecrm.repository.CustomerRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerRecordService {

    @Autowired
    private CustomerRecordRepository repository;

    public CustomerRecord save(CustomerRecord record) {
        return repository.save(record);
    }
}