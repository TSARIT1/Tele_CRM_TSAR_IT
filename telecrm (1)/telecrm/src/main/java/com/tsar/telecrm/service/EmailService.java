package com.tsar.telecrm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Test mail (optional)
    public void sendTestMail(String to){
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Test Mail");
        msg.setText("Hello! Email is Working");

        mailSender.send(msg);
    }

    // ✅ OTP mail (use this)
    public void sendOtpMail(String to, String otp){
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Your Admin Login OTP");
        msg.setText("Your OTP is: " + otp + "\nValid for 5 minutes.");

        mailSender.send(msg);
    }
}
