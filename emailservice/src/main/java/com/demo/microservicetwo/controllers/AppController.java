package com.demo.microservicetwo.controllers;

import com.demo.microservicetwo.model.EmailDetails;
import com.demo.microservicetwo.service.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
	
	@GetMapping("/get")
	public String home() {
		return "<h2>Microservice two is running</h2>";
	}


	@Autowired
	private EmailService emailService;

	@Autowired
	private ObjectMapper objectMapper;

	// Sending a simple Email
	@PostMapping("/sendMail")
	public String
	sendMail(@RequestBody EmailDetails details)
	{
		String status
				= emailService.sendSimpleMail(details);

		return status;
	}

}
