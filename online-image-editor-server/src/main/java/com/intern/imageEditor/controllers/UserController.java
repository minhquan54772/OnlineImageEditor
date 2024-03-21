package com.intern.imageEditor.controllers;

import com.intern.imageEditor.models.User;
import com.intern.imageEditor.payload.response.BaseResponse;
import com.intern.imageEditor.repository.UserRepository;
import com.intern.imageEditor.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "http://localhost:4200")
@RequestMapping(path = "users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "all", method = RequestMethod.GET)
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/new")
    public ResponseEntity<BaseResponse<User>> createNewUser(@RequestBody User newUser) {
        Optional<User> userByEmail = userService.getUserByEmail(newUser.getEmail());
        if (userByEmail.isPresent()) {
            // user da ton tai
            return ResponseEntity.status(HttpStatusCode.valueOf(400)).body(new BaseResponse<>(null, false, "This email is linked to an existed account already"));
        } else {
            User user = userService.createUser(newUser);
            return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(new BaseResponse<>(user, true));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserInfo(@PathVariable Long id, @RequestBody User user) throws Exception {
        User userToUpdate = userService.getUserById(id);
        if (userToUpdate == null) {
            throw new Exception("User not found");
        }
        userToUpdate.setDisplayName(user.getDisplayName());
        userToUpdate.setEmail(user.getEmail());

        return ResponseEntity.ok(userRepository.save(userToUpdate));
    }

    @GetMapping("/find")
    public ResponseEntity<BaseResponse<User>> findUserByEmail(@RequestParam String email) {
        Optional<User> userByEmail = userService.getUserByEmail(email);
        return userByEmail.map(user -> ResponseEntity.ok().body(new BaseResponse<>(user, true))).orElseGet(() -> ResponseEntity.status(HttpStatusCode.valueOf(404)).body(new BaseResponse<>(null, false, "This email is not linked to any account")));
    }


}
