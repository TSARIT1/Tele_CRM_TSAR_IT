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
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/uploads")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UploadController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CandidateRepository candidateRepo;

    // ✅ Employee list (for dropdown)
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    // ✅ Upload file + assign to employee (SAFE VERSION)
    @PostMapping("/data")
    public ResponseEntity<?> uploadAndAssign(
            @RequestParam("file") MultipartFile file,
            @RequestParam("employee_id") String employeeId
    ) {
        try {
            // 1️⃣ Basic validations
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
            }

            String filename = file.getOriginalFilename();
            if (filename == null || !filename.toLowerCase().endsWith(".csv")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Only CSV files are allowed"));
            }

            User user = userRepo.findById(employeeId)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            // 2️⃣ Read CSV safely (UTF-8)
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8)
            );

            String line;
            int saved = 0;

            while ((line = br.readLine()) != null) {

                if (line.trim().isEmpty()) continue;

                String[] arr = line.split(",");

                if (arr.length < 2) continue;

                String name = arr[0].trim();
                String mobile = arr[1].trim();

                // 3️⃣ Skip header row
                if (name.equalsIgnoreCase("name")) continue;

                // 4️⃣ Clean weird binary chars
                name = name.replaceAll("[^\\p{L} .'-]", "");

                // 5️⃣ Prevent DB overflow
                if (name.length() > 255) name = name.substring(0, 255);
                if (mobile.length() > 20) mobile = mobile.substring(0, 20);

                Candidate c = new Candidate();
                c.setName(name);
                c.setMobileNumber(mobile);
                c.setAssignedTo(user.getEmployeeId());
                c.setStatus("Not Connected");

                candidateRepo.save(c);
                saved++;
            }

            return ResponseEntity.ok(Map.of(
                    "message", "Upload & Assignment Successful",
                    "saved", saved
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ Admin view: all candidates
    @GetMapping("/candidates")
    public List<Candidate> getAllCandidates() {
        return candidateRepo.findAll();
    }

    // ✅ Employee dashboard: only assigned leads
    @GetMapping("/candidates/employee/{employeeId}")
    public List<Candidate> getEmployeeLeads(@PathVariable String employeeId) {
        return candidateRepo.findByAssignedTo(employeeId);
    }
}









//package com.tsar.telecrm.controller;
//
//import com.tsar.telecrm.entity.Candidate;
//import com.tsar.telecrm.entity.User;
//import com.tsar.telecrm.repository.CandidateRepository;
//import com.tsar.telecrm.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.BufferedReader;
//import java.io.InputStreamReader;
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:3000")   // ✅ fix CORS
//public class UploadController {
//
//    @Autowired
//    private UserRepository userRepo;
//
//    @Autowired
//    private CandidateRepository candidateRepo;
//
//    // ✅ Employee list (for dropdown)
//    @GetMapping("/users")
//    public List<User> getUsers() {
//        return userRepo.findAll();
//    }
//
//    // ✅ Upload file + assign to employee
//    @PostMapping("/data")
//    public String uploadAndAssign(
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("employee_id") String employeeId
//    ) throws Exception {
//
//        User user = userRepo.findById(employeeId)
//                .orElseThrow(() -> new RuntimeException("Employee not found"));
//
//        BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()));
//        String line;
//
//        while ((line = br.readLine()) != null) {
//
//            if (line.trim().isEmpty()) continue;
//
//            String[] arr = line.split(",");
//
//            if (arr.length < 2) continue;
//
//            Candidate c = new Candidate();
//            c.setName(arr[0].trim());
//            c.setMobileNumber(arr[1].trim());
//            c.setAssignedTo(user.getEmployeeId());  // ✅ FIXED
//            c.setStatus("Not Connected");
//
//            candidateRepo.save(c);
//        }
//
//        return "Upload & Assignment Successful";
//    }
//
//    // ✅ Admin view: all candidates
//    @GetMapping("/candidates")
//    public List<Candidate> getAllCandidates() {
//        return candidateRepo.findAll();
//    }
//
//    // ✅ Employee dashboard: only assigned leads
//    @GetMapping("/candidates/employee/{employeeId}")
//    public List<Candidate> getEmployeeLeads(@PathVariable String employeeId) {
//        return candidateRepo.findByAssignedTo(employeeId);   // ✅ FIXED
//    }
//}