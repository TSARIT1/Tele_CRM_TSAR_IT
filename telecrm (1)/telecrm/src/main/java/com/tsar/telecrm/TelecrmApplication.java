package com.tsar.telecrm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.tsar.telecrm")
public class TelecrmApplication {
	public static void main(String[] args) {
		SpringApplication.run(TelecrmApplication.class, args);
	}
}