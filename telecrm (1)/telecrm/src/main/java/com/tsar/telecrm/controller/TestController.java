package com.tsar.telecrm.controller;

import com.tsar.telecrm.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private EmailService emailService;

    @GetMapping("/mail")
    public String sendMail(){
        emailService.sendTestMail("adityadharpure0712@gmail.com");
        return "Mail sent";
    }
}
