package com.tsar.telecrm.controller;

import com.tsar.telecrm.entity.CallLog;
import com.tsar.telecrm.dto.CallLogRequest;
import com.tsar.telecrm.service.TeleCallingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin("http://localhost:3000")
public class CallLogController {

    private final TeleCallingService service;

    public CallLogController(TeleCallingService service) {
        this.service = service;
    }

    @PostMapping
    public CallLog saveLog(@RequestBody CallLogRequest request) {
        return service.saveCallLog(request);
    }

    @GetMapping("/{candidateId}")
    public List<CallLog> getLogs(@PathVariable Long candidateId) {
        return service.getLogsByCandidate(candidateId);
    }

    @GetMapping
    public List<CallLog> getAllLogs() {
        return service.getAllLogs();
    }
}