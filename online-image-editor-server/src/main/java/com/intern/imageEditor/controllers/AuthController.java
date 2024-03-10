package com.intern.imageEditor.controllers;

import com.intern.imageEditor.models.User;
import com.intern.imageEditor.payload.request.LoginRequest;
import com.intern.imageEditor.payload.response.BaseReponse;
import com.intern.imageEditor.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "http://localhost:4200")
@RequestMapping(path = "/auth")
public class AuthController {
    @Autowired
    private UserService userService;



    @PostMapping("/login")
    public BaseReponse authenticateUser(@RequestBody LoginRequest loginRequest) throws Exception {
        Optional<User> userByEmail = userService.getUserByEmail(loginRequest.getUsernameOrEmail());
        if (userByEmail.isPresent()) {
            if (userByEmail.get().getPassword().equals(loginRequest.getPassword())) {
                return new BaseReponse(true, true);
            } else {
                return new BaseReponse(false, false, "Incorrect password") ;
            }
        } else {
            Optional<User> userByUsername = userService.getUserByUsername(loginRequest.getUsernameOrEmail());
            if (userByUsername.isPresent()) {
                if (userByUsername.get().getPassword().equals(loginRequest.getPassword())) {
                    return new BaseReponse(true, true);
                } else {
                    return new BaseReponse(false, false, "Incorrect password") ;
                }
            } else {
                return new BaseReponse(false, false, "User not found") ;
            }
        }
    }
}
