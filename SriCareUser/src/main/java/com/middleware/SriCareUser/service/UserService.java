package com.middleware.SriCareUser.service;

import com.middleware.SriCareUser.model.User;
import com.middleware.SriCareUser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public User authenticateUser(String userName, String password){
        User user = userRepository.findByUserName(userName);
        if(user != null){
            if(passwordEncoder.matches(password, user.getPassword())){
                return user;
            }
        }
        return null;
    }
}
