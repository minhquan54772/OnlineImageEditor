package com.intern.imageEditor.controllers;

import com.intern.imageEditor.models.User;
import com.intern.imageEditor.payload.LoginRequest;
import com.intern.imageEditor.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {
    @Autowired
    private UserService userService;



    @PostMapping("/login")
    public boolean authenticateUser(@RequestBody LoginRequest loginRequest) throws Exception {
        Optional<User> userByEmail = userService.getUserByEmail(loginRequest.getEmail());
        if (userByEmail.isPresent()) {
            if (userByEmail.get().getPassword().equals(loginRequest.getPassword())) {
                return true;
            } else {
                throw new Exception("Incorrect password");
            }
        } else {
            Optional<User> userByUsername = userService.getUserByUsername(loginRequest.getUsername());
            if (userByUsername.isPresent()) {
                if (userByUsername.get().getPassword().equals(loginRequest.getPassword())) {
                    return true;
                } else {
                    throw new Exception("Incorrect password");
                }
            } else {
                throw new Exception("User not found");
            }
        }
    }
}
