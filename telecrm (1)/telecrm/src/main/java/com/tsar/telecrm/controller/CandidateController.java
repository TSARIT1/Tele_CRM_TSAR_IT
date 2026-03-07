package com.tsar.telecrm.controller;

import com.tsar.telecrm.entity.Candidate;
import com.tsar.telecrm.entity.User;
import com.tsar.telecrm.repository.CandidateRepository;
import com.tsar.telecrm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")   // ✅ FIX CORS
public class CandidateController {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ 1. Get all candidates (Admin table)
    @GetMapping("/candidates")
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    // ✅ 2. Upload file & assign to employee
    @PostMapping("/data")
    public ResponseEntity<?> uploadAndAssign(
            @RequestParam("file") MultipartFile file,
            @RequestParam("employee_id") String employeeId
    ) {
        try {
            User user = userRepository.findById(employeeId)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            List<Candidate> savedList = new ArrayList<>();

            BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()));
            String line;

            while ((line = br.readLine()) != null) {

                // Skip empty lines
                if (line.trim().isEmpty()) continue;

                String[] arr = line.split(",");

                if (arr.length < 2) continue;

                Candidate c = new Candidate();
                c.setName(arr[0].trim());
                c.setMobileNumber(arr[1].trim());
                c.setStatus("Not Connected");
                c.setAssignedTo(user.getEmployeeId());  // ✅ assign employeeId

                savedList.add(candidateRepository.save(c));
            }

            return ResponseEntity.ok(savedList);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("File upload failed");
        }
    }

    // ✅ 3. Employee Dashboard – fetch assigned leads
    @GetMapping("/candidates/assigned/{employeeId}")
    public List<Candidate> getAssignedCandidates(@PathVariable String employeeId) {
        return candidateRepository.findByAssignedTo(employeeId);
    }
    // ✅ 4. Add candidate manually (AddNewRecord form)
    @PostMapping("/candidates")
    public ResponseEntity<?> createCandidate(@RequestBody Candidate candidate) {
        try {

            if (candidate.getName() == null || candidate.getMobileNumber() == null) {
                return ResponseEntity.badRequest().body("Name and mobile number required");
            }

            if (candidate.getStatus() == null) {
                candidate.setStatus("Not Connected");
            }

            Candidate saved = candidateRepository.save(candidate);

            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to save candidate");
        }
    }
}