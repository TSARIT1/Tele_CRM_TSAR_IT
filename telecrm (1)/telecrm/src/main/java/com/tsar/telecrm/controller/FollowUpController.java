//package com.tsar.telecrm.controller;
//
//import com.tsar.telecrm.entity.FollowUpLog;
//import com.tsar.telecrm.repository.FollowUpLogRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/logs")
//@CrossOrigin(origins = "http://localhost:3000")
//public class FollowUpController {
//
//    @Autowired
//    private FollowUpLogRepository followUpLogRepository;
//
//    // ✅ Get all follow-ups (used in FollowUpComponent.jsx)
//    @GetMapping("/")
//    public List<FollowUpLog> getAllLogs() {
//        return followUpLogRepository.findAll();
//    }
//
//    // ✅ Save follow-up (optional: for later use)
//    @PostMapping("/")
//    public FollowUpLog saveFollowUp(@RequestBody FollowUpLog log) {
//        return followUpLogRepository.save(log);
//    }
//}