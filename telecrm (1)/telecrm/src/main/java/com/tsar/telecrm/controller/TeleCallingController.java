package com.tsar.telecrm.controller;

import com.tsar.telecrm.entity.Candidate;
import com.tsar.telecrm.entity.CallLog;
import com.tsar.telecrm.service.TeleCallingService;
import org.springframework.web.bind.annotation.*;
import com.tsar.telecrm.dto.CallLogRequest;
import java.util.List;

@RestController
@RequestMapping("/api/telecalling")
@CrossOrigin("http://localhost:3000")
public class TeleCallingController {

    private final TeleCallingService service;

    public TeleCallingController(TeleCallingService service) {
        this.service = service;
    }

    @GetMapping("/candidates")
    public List<Candidate> getCandidates() {
        return service.getAllCandidates();
    }



//    @PostMapping("/logs")
//    public CallLog saveLog(@RequestBody CallLogRequest request) {
//        return service.saveCallLog(request);
//    }

    @GetMapping("/logs/{candidateId}")
    public List<CallLog> getLogs(@PathVariable Long candidateId) {
        return service.getLogsByCandidate(candidateId);
    }
}