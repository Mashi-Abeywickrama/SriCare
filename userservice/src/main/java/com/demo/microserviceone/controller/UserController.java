package com.demo.microserviceone.controller;


//import net.minidev.json.JSONObject;
import com.demo.microserviceone.model.User;
import com.demo.microserviceone.service.UserService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



public class UserController {

  @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterRequest request) {
        User user = new User(request.getUserName(), request.getPassword(), request.getEmail());
        User savedUser = userService.registerUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    public static class RegisterRequest {
        private String userName;
        private String password;
        private String email;

        public RegisterRequest() {
        }

        public RegisterRequest(String userName, String password, String email) {
            this.userName = userName;
            this.password = password;
            this.email = email;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.authenticateUser(loginRequest.getUserName(), loginRequest.getPassword());

        if(user != null) {
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("userId", user.getUserId());
            jsonResponse.put("userName", user.getUserName());
            return new ResponseEntity<>(jsonResponse.toString(), HttpStatus.OK);

        }else{
            return new ResponseEntity<>("Login Failed", HttpStatus.UNAUTHORIZED);
        }
    }

    static class LoginRequest{
        private String userName;
        private String password;

        public LoginRequest() {
        }

        public LoginRequest(String userName, String password) {
            this.userName = userName;
            this.password = password;
        }

        public String getUserName() {
            return userName;
        }

        public String getPassword() {
            return password;
        }
    }
}
