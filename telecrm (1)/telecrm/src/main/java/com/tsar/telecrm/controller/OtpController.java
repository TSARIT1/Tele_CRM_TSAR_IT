package com.tsar.telecrm.controller;

import com.tsar.telecrm.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> body) {
        otpService.sendOtp(body.get("email"));
        return "OTP Sent";
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> body) {
        boolean ok = otpService.verifyOtp(body.get("email"), body.get("otp"));
        return ok ? "OTP Verified" : "Invalid/Expired OTP";
    }
}
