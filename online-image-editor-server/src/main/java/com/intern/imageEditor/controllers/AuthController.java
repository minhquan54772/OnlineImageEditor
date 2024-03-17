package com.intern.imageEditor.controllers;

import com.intern.imageEditor.models.User;
import com.intern.imageEditor.payload.request.LoginRequest;
import com.intern.imageEditor.payload.response.BaseResponse;
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
    public BaseResponse authenticateUser(@RequestBody LoginRequest loginRequest) throws Exception {
        Optional<User> userByEmail = userService.getUserByEmail(loginRequest.getUsernameOrEmail());
        if (userByEmail.isPresent()) {
            if (userByEmail.get().getPassword().equals(loginRequest.getPassword())) {
                return new BaseResponse(true, true);
            } else {
                return new BaseResponse(false, false, "Incorrect password") ;
            }
        } else {
            Optional<User> userByUsername = userService.getUserByUsername(loginRequest.getUsernameOrEmail());
            if (userByUsername.isPresent()) {
                if (userByUsername.get().getPassword().equals(loginRequest.getPassword())) {
                    return new BaseResponse(true, true);
                } else {
                    return new BaseResponse(false, false, "Incorrect password") ;
                }
            } else {
                return new BaseResponse(false, false, "User not found") ;
            }
        }
    }
}
