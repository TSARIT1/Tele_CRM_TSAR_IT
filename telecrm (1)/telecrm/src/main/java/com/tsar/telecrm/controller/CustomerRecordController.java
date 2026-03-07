package com.tsar.telecrm.controller;

import com.tsar.telecrm.entity.CustomerRecord;
import com.tsar.telecrm.service.CustomerRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerRecordController {

    @Autowired
    private CustomerRecordService service;

    @PostMapping("/add")
    public CustomerRecord addCustomer(@RequestBody CustomerRecord record) {
        return service.save(record);
    }
}