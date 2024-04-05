package com.intern.imageEditor.services;

import com.intern.imageEditor.models.User;
import com.intern.imageEditor.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updatePassword(Long id, String newPassword) {
        User newUserData = userRepository.findById(id).orElse(null);
        newUserData.setPassword(newPassword);
        return userRepository.save(newUserData);
    }

    public User updateUser(Long id, User newUserData) {
        User userToUpdate = getUserById(id);
        userToUpdate.updateInfo(newUserData);
        return userRepository.save(userToUpdate);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            userRepository.delete(user);
        }
    }
}
