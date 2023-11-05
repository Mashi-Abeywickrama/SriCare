package com.demo.microservicetwo.service;


import com.demo.microservicetwo.model.EmailDetails;
import org.springframework.web.multipart.MultipartFile;

public interface EmailService {

    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);

    // Method

}

