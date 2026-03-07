package com.tsar.telecrm.service;

import com.tsar.telecrm.dto.CallLogRequest;
import com.tsar.telecrm.entity.Candidate;
import com.tsar.telecrm.entity.CallLog;
import com.tsar.telecrm.repository.CandidateRepository;
import com.tsar.telecrm.repository.CallLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeleCallingService {

    private final CandidateRepository candidateRepo;
    private final CallLogRepository callLogRepo;

    public TeleCallingService(CandidateRepository candidateRepo,
                              CallLogRepository callLogRepo) {
        this.candidateRepo = candidateRepo;
        this.callLogRepo = callLogRepo;
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepo.findAll();
    }

//    public CallLog saveCallLog(CallLog log) {
//
//        Candidate candidate = log.getCandidate();
//
//        if (candidate != null) {
//
//            Candidate existingCandidate =
//                    candidateRepo.findById(candidate.getId())
//                            .orElseThrow(() -> new RuntimeException("Candidate not found"));
//
//            // 🔥 Auto set username from candidate assignment
//            log.setUserName(existingCandidate.getAssignedTo());
//
//            if (log.getStatus() != null) {
//                existingCandidate.setStatus(log.getStatus());
//            }
//
//            candidateRepo.save(existingCandidate);
//        }
//
//        return callLogRepo.save(log);
//    }

    public CallLog saveCallLog(CallLogRequest request) {

        if (request.getUserId() == null) {
            throw new RuntimeException("UserId is missing!");
        }

        Candidate candidate = null;

        if (request.getCandidateId() != null) {
            candidate = candidateRepo.findById(request.getCandidateId())
                    .orElseThrow(() -> new RuntimeException("Candidate not found"));

            if (request.getStatus() != null) {
                candidate.setStatus(request.getStatus());
                candidateRepo.save(candidate);
            }
        }
        System.out.println("UserId from request: " + request.getUserId());
        // Update candidate status


        CallLog log = new CallLog();

        if(candidate != null){
            log.setCandidate(candidate);
        }
        log.setNotes(request.getNotes());
        log.setCallResult(request.getCallResult());
        log.setStatus(request.getStatus());
        log.setFollowUpRequired(request.getFollowUpRequired());
        log.setFollowUpDate(request.getFollowUpDate());
        log.setFollowUpTime(request.getFollowUpTime());
        log.setFollowUpComments(request.getFollowUpComments());
//        log.setUserId(request.getUserId());
        log.setUserId(request.getUserId());
        System.out.println("UserId from request: " + request.getUserId());
        return callLogRepo.save(log);
    }

    public List<CallLog> getLogsByCandidate(Long candidateId) {
        return callLogRepo.findByCandidate_Id(candidateId);
    }

    public List<CallLog> getAllLogs() {
        return callLogRepo.findAll();
    }
}