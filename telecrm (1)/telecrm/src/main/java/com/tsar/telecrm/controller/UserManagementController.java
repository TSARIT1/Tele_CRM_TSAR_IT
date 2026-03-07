package com.tsar.telecrm.controller;

import com.tsar.telecrm.entity.User;
import com.tsar.telecrm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("/api/admin/users")
public class UserManagementController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Create user (Admin creates login credentials)
    @PostMapping("/employee/setup")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> body) {

        String employeeId = body.get("employee_id");
        String firstName = body.get("first_name");
        String lastName = body.get("last_name");
        String email = body.get("email");
        String phoneNumber = body.get("phone_number");
        String password = body.get("password");

        if (userRepository.existsById(employeeId)) {
            return ResponseEntity.badRequest().body(Map.of("message", "User already exists"));
        }

        User user = new User();
        user.setEmployeeId(employeeId);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setPassword(password);

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User created successfully"));
    }

    // ✅ View all users
//    @GetMapping("/users")
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}