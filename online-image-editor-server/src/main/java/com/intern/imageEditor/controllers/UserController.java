package com.intern.imageEditor.controllers;

import com.intern.imageEditor.models.User;
import com.intern.imageEditor.payload.response.BaseResponse;
import com.intern.imageEditor.repository.UserRepository;
import com.intern.imageEditor.services.UserService;
import com.intern.imageEditor.utils.Patcher;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private Patcher patcher;

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

    @GetMapping("/find")
    public ResponseEntity<BaseResponse<User>> findUserByEmail(@RequestParam String email) {
        Optional<User> userByEmail = userService.getUserByEmail(email);
        return userByEmail.map(user -> ResponseEntity.ok().body(new BaseResponse<>(user, true))).orElseGet(() -> ResponseEntity.status(HttpStatusCode.valueOf(404)).body(new BaseResponse<>(null, false, "This email is not linked to any account")));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse<User>> patchUserInfo(@PathVariable Long id, @RequestBody User incompleUser) {
        User existingUser = userService.getUserById(id);

        if (existingUser == null) {
            return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(new BaseResponse<>(null, false, "User not found"));
        }

        try {
            Patcher.userPatcher(existingUser, incompleUser);
            // Save updated existing user
            userRepository.save(existingUser);
        } catch (IllegalAccessException e) {

            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().body(new BaseResponse<>(existingUser, true));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }


}
