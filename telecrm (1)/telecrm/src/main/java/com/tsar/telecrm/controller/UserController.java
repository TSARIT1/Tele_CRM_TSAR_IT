package com.tsar.telecrm.controller;

import com.tsar.telecrm.dto.LoginRequest;
import com.tsar.telecrm.entity.User;
import com.tsar.telecrm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        Optional<User> userOpt = userRepository.findById(req.getEmployee_id());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid user ID"));
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(req.getPassword())) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid password"));
        }

        return ResponseEntity.ok(Map.of(
                "access", "dummy-token",
                "employeeId", user.getEmployeeId(),
                "first_name", user.getFirstName(),
                "last_name", user.getLastName(),
                "email", user.getEmail()
        ));
    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // ✅ Get logged in user (TEMP)
    @GetMapping("/me")
    public ResponseEntity<?> getMe() {

        Optional<User> userOpt = userRepository.findAll().stream().findFirst();

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "No user found"));
        }

        User user = userOpt.get();

        return ResponseEntity.ok(Map.of(
                "employeeId", user.getEmployeeId(),
                "first_name", user.getFirstName(),
                "last_name", user.getLastName(),
                "email", user.getEmail(),
                "phone_number", user.getPhoneNumber()
        ));
    }

    @PostMapping("/employee/setup")
    public ResponseEntity<?> createEmployee(@RequestBody User user) {
        try {

            // set default status
            if(user.getStatus() == null){
                user.setStatus("Active");
            }

            // set joining date if not provided
            if(user.getDateJoined() == null){
                user.setDateJoined(java.time.LocalDate.now());
            }

            userRepository.save(user);

            return ResponseEntity.ok("Employee created successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error creating employee");
        }
    }
}