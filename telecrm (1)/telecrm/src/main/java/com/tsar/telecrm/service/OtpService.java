package com.tsar.telecrm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    @Autowired
    private EmailService emailService;

//    private Map<String, String> otpStore = new HashMap<>();
//    private Map<String, LocalDateTime> expiryStore = new HashMap<>();
    private Map<String, String> otpStore = new ConcurrentHashMap<>();
    private Map<String, LocalDateTime> expiryStore = new ConcurrentHashMap<>();

    public void sendOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        otpStore.put(email, otp);
        expiryStore.put(email, LocalDateTime.now().plusMinutes(5));

        emailService.sendOtpMail(email, otp);   // ✅ correct
        System.out.println("OTP for " + email + " = " + otp);
    }

    public boolean verifyOtp(String email, String otp) {
        if (!otpStore.containsKey(email)) return false;
        if (expiryStore.get(email).isBefore(LocalDateTime.now())) return false;

        boolean ok = otpStore.get(email).equals(otp);

        if (ok) {  // optional cleanup
            otpStore.remove(email);
            expiryStore.remove(email);
        }
        return ok;
    }
}
