package com.intern.imageEditor.controllers;

import com.intern.imageEditor.models.User;
import com.intern.imageEditor.payload.request.LoginRequest;
import com.intern.imageEditor.payload.response.BaseResponse;
import com.intern.imageEditor.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "http://localhost:4200")
@RequestMapping(path = "/auth")
public class AuthController {
    @Autowired
    private UserService userService;


    @PostMapping("/login")
    public ResponseEntity authenticateUser(@RequestBody LoginRequest loginRequest) throws Exception {
        Optional<User> userByEmail = userService.getUserByEmail(loginRequest.getEmail());
        if (userByEmail.isPresent()) {
            String encodedPassword = Base64.getEncoder().encodeToString(loginRequest.getPassword().getBytes(StandardCharsets.UTF_8));
            if (userByEmail.get().getPassword().equals(encodedPassword)) {
                return ResponseEntity.ok().body(new BaseResponse(true, true));
            } else {
                return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(new BaseResponse(false, false, "Incorrect password"));
            }
        } else {
            return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(new BaseResponse(false, false, "User not found"));
        }
    }

}
