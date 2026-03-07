//package com.tsar.telecrm.controller;
//
//import com.tsar.telecrm.entity.User;
//import com.tsar.telecrm.repository.UserRepository;
//import com.tsar.telecrm.service.OtpService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/user")
//@CrossOrigin(origins = "http://localhost:5173")
//public class UserForgetPasswordController{
//
//    @Autowired
//    private OtpService otpService;
//
//    @Autowired
//    private UserRepository userRepo;
//
//    // 1️⃣ Send OTP
//    @PostMapping("/forgot-password")
//    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> body) {
//        String email = body.get("email");
//
//        Optional<User> userOpt = userRepo.findByEmail(email);
//        if (userOpt.isEmpty()) {
//            return ResponseEntity.badRequest().body(Map.of("message", "Email not registered"));
//        }
//
//        otpService.sendOtp(email);
//        return ResponseEntity.ok(Map.of("message", "OTP sent"));
//    }
//
//    // 2️⃣ Verify OTP
//    @PostMapping("/verify-otp")
//    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> body) {
//        boolean ok = otpService.verifyOtp(body.get("email"), body.get("otp"));
//
//        if (!ok) {
//            return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired OTP"));
//        }
//
//        return ResponseEntity.ok(Map.of("message", "OTP verified"));
//    }
//
//    // 3️⃣ Reset Password
//    @PostMapping("/reset-password")
//    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
//        String email = body.get("email");
//        String otp = body.get("otp");
//        String newPassword = body.get("newPassword");
//
//        boolean ok = otpService.verifyOtp(email, otp);
//        if (!ok) {
//            return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired OTP"));
//        }
//
//        Optional<User> userOpt = userRepo.findByEmail(email);
//        if (userOpt.isEmpty()) {
//            return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
//        }
//
//        User user = userOpt.get();
//        user.setPassword(newPassword); // ⚠️ plain text for now
//        userRepo.save(user);
//
//        return ResponseEntity.ok(Map.of("message", "Password reset successful"));
//    }
//}





package com.tsar.telecrm.controller;

import com.tsar.telecrm.service.OtpService;
import com.tsar.telecrm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserForgotPasswordController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private UserService userService;

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody Map<String, String> body) {
        otpService.sendOtp(body.get("email"));
        return "OTP Sent";
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> body) {
        boolean ok = otpService.verifyOtp(body.get("email"), body.get("otp"));
        return ok ? "OTP Verified" : "Invalid OTP";
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> body) {
        userService.updatePassword(body.get("email"), body.get("newPassword"));
        return "Password reset successful";
    }
}